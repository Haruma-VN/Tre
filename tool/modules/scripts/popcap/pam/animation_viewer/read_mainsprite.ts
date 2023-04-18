"use strict";
import { createCanvas, loadImage } from "canvas";
import writeSpriteXfl from "../json_to_flash/write_spritexfl.js";
import parse_transform from "../flash_to_json/parse_transform.js";
import parse_color from "../flash_to_json/parse_color.js";
import fs_js from "../../../../library/fs/implement.js";
import { parse } from "node:path";
import mixTransform from "./mix_transform.js";
import { SingleBar } from "cli-progress";
import * as color from "../../../../library/color/color.js";
import localization from "../../../../callback/localization.js";
import GIFEncoder from "gif-encoder-2";
export default async function (
    main_sprite: any,
    pam_sprite: any,
    image_list: string[],
    sprite_list: string[],
    max_position: any,
    pam_path: string,
    frame_rate: number,
    sprite_could_disable: any,
    setting: any
) {
    const gif_folder = `${parse(pam_path).dir}/${parse(pam_path).name}.gif`;
    let frame_composite_mapping: any = new Object();
    const canvas = createCanvas(1, 1);
    const hex_1x1_transparent_image = new Uint8Array(canvas.toBuffer());
    const maxWidthArray = new Array();
    const maxHeightArray = new Array();
    const DOM_main_sprite = new Array();
    let DOM_frame_index = 0;
    for (let k = 0; k < main_sprite.frame.length; k++) {
        if (main_sprite.frame[k].label !== null) {
            DOM_main_sprite.push({
                label: main_sprite.frame[k].label,
                frame_index: k,
            });
        }
        if (k === main_sprite.frame.length - 1) {
            DOM_main_sprite.push({
                label: null,
                frame_index: k,
            });
        }
    }
    const frame_node_list = writeSpriteXfl(main_sprite, pam_sprite, -1, true);
    const bar = new SingleBar({
        format: fs_js.create_toolkit_view("progress_bar")
            ? color.fgcyan_string(
                  "◉ " + localization("execution_status") + " |"
              ) +
              color.fggreen_string("{bar}") +
              color.fgcyan_string(`| {percentage}% || {value}/{total}`)
            : color.fgcyan_string(
                  "◉ " + localization("execution_actual_size") + ": "
              ) + color.fgcyan_string(`{percentage}% || {value}/{total}`),
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    function applyTransformMatrix(
        ctx: any,
        transform: number[],
        image_matrix: [number, number, number, number, number, number],
        image_gif: string[],
        imgWidth: number,
        imgHeight: number
    ) {
        for (let i = 0; i < transform.length; i++) {
            image_matrix = mixTransform(image_matrix, transform[i] as any);
        }
        image_matrix[4] += max_position[0] / 2 + setting.x_position_append;
        image_matrix[5] += max_position[1] / 2 + setting.y_position_append;
        ctx.setTransform.apply(ctx, image_matrix);
        ctx.drawImage(image_gif, 0, 0, imgWidth, imgHeight);
    }
    for (const layer_index in frame_node_list) {
        const DOMLayer = structuredClone(frame_node_list[layer_index]);
        for (const frame_object of DOMLayer) {
            const duration = frame_object.duration;
            const frame_index = frame_object.index;
            for (let k = 0; k < duration; k++) {
                const DOMSymbolInstance =
                    frame_object.elements.DOMSymbolInstance;
                if (DOMSymbolInstance !== undefined) {
                    const frame_index_duration = frame_index + k;
                    const name_match = DOMSymbolInstance.libraryItemName.match(
                        /(image|sprite)\/(image|sprite)_([0-9]+)/
                    );
                    const resource = Number(name_match[3]) - 1;
                    const sprite_type = name_match[2] === "sprite";
                    const transform = parse_transform(
                        DOMSymbolInstance.matrix.Matrix
                    );
                    const color = parse_color(
                        DOMSymbolInstance.color.Color
                    ).map((color_channel) => color_channel * 255);
                    const frame_sprite_list = sprite_type
                        ? structuredClone(sprite_list[resource])
                        : structuredClone(image_list[resource]);
                    if (
                        frame_composite_mapping[frame_index_duration] ===
                        undefined
                    ) {
                        frame_composite_mapping[frame_index_duration] =
                            new Array();
                    }
                    for (let i = 0; i < frame_sprite_list.length; i++) {
                        const frame_sprite: any = frame_sprite_list[i];
                        if (
                            sprite_type &&
                            sprite_could_disable.includes(resource + 1)
                        ) {
                            frame_sprite.data = hex_1x1_transparent_image;
                        }
                        if (frame_sprite.transform === undefined) {
                            frame_sprite.transform = new Array();
                        }
                        if (frame_sprite.color === undefined) {
                            frame_sprite.color = new Array();
                        }
                        maxWidthArray.push(
                            frame_sprite.imgWidth + transform[4]
                        );
                        maxHeightArray.push(
                            frame_sprite.imgHeight + transform[5]
                        );
                        frame_sprite.transform.push(transform);
                        frame_sprite.color.push(color);
                        frame_composite_mapping[frame_index_duration].push(
                            frame_sprite
                        );
                    }
                }
            }
        }
    }
    function getMax(arr: number[]) {
        return arr.reduce(
            (max: number, v: number) => (max >= v ? max : v),
            -Infinity
        );
    }
    const maxWidth = Math.ceil(
        getMax(maxWidthArray) + max_position[0] + setting.width_append
    );
    const maxHeight = Math.ceil(
        getMax(maxHeightArray) + max_position[1] + setting.height_append
    );
    let split_encoder;
    const encoder = new GIFEncoder(maxWidth, maxHeight, setting.algorithm);
    if (setting.frame_rate !== -1) {
        frame_rate = setting.frame_rate;
    }
    encoder.start();
    encoder.setRepeat(setting.gif_loop);
    encoder.setFrameRate(frame_rate);
    encoder.setQuality(setting.gif_quality);
    encoder.setTransparent("#00000000");
    fs_js.execution_information(
        `GIF Width: ${maxWidth}, GIF Height: ${maxHeight}, Number of frames: ${
            Object.keys(frame_composite_mapping).length
        }`
    );
    fs_js.execution_out(gif_folder);
    bar.start(Object.keys(frame_composite_mapping).length, 0, {
        speed: "N/A",
    });
    for (const layer_index in frame_composite_mapping) {
        bar.increment();
        bar.update(Number(layer_index) + 1);
        const gif_frame = createCanvas(maxWidth, maxHeight);
        const ctx = gif_frame.getContext("2d");
        ctx.fillStyle = setting.background_color;
        ctx.fillRect(0, 0, maxWidth, maxHeight);
        for (let layer_sprite of frame_composite_mapping[layer_index]) {
            const frame_image = await loadImage(Buffer.from(layer_sprite.data));
            const imgWidth = frame_image.width;
            const imgHeight = frame_image.height;
            ctx.setTransform.apply(ctx, layer_sprite.matrix);
            const layer_color = [0, 0, 0, 0];
            for (let color of layer_sprite.color) {
                layer_color[0] += color[0];
                layer_color[1] += color[1];
                layer_color[2] += color[2];
                layer_color[3] += color[3];
            }
            const color = [
                layer_color[0] / layer_sprite.color.length,
                layer_color[1] / layer_sprite.color.length,
                layer_color[2] / layer_sprite.color.length,
                layer_color[3] / layer_sprite.color.length,
            ];
            if ((layer_index as any) > 1) {
            }
            if (
                color[0] === 255 ||
                color[1] !== 255 ||
                color[2] !== 255 ||
                color[3] !== 255
            ) {
                const sprite_color = createCanvas(imgWidth, imgHeight);
                const image_ctx = sprite_color.getContext("2d");
                image_ctx.drawImage(frame_image, 0, 0, imgWidth, imgHeight);
                const imageData = image_ctx.getImageData(
                    0,
                    0,
                    imgWidth,
                    imgHeight
                );
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] = imageData.data[i] + color[0] - 255;
                    imageData.data[i + 1] =
                        imageData.data[i + 1] + color[1] - 255;
                    imageData.data[i + 2] =
                        imageData.data[i + 2] + color[2] - 255;
                    imageData.data[i + 3] =
                        imageData.data[i + 3] + color[3] - 255;
                }
                image_ctx.putImageData(imageData, 0, 0);
                await applyTransformMatrix(
                    ctx,
                    layer_sprite.transform,
                    layer_sprite.matrix,
                    sprite_color as any,
                    imgWidth,
                    imgHeight
                );
            } else {
                await applyTransformMatrix(
                    ctx,
                    layer_sprite.transform,
                    layer_sprite.matrix,
                    frame_image as any,
                    imgWidth,
                    imgHeight
                );
            }
        }
        if (setting.generate_image_frames) {
            const frame_buffer = gif_frame.toBuffer();
            fs_js.outfile_fs(
                `${gif_folder}/frames/${setting.frame_default_name}${layer_index}.png`,
                frame_buffer
            );
        }
        encoder.addFrame(ctx);
        if (setting.split_label && setting.create_gif) {
            if (layer_index === DOM_main_sprite[DOM_frame_index].frame_index) {
                split_encoder = new GIFEncoder(
                    maxWidth,
                    maxHeight,
                    setting.algorithm
                );
                split_encoder.start();
                split_encoder.setRepeat(setting.gif_loop);
                split_encoder.setFrameRate(frame_rate);
                split_encoder.setQuality(setting.gif_quality);
                split_encoder.setTransparent("#00000000");
            } else if (
                (layer_index as any) ===
                DOM_main_sprite[DOM_frame_index + 1].frame_index - 1
            ) {
                split_encoder.finish();
                const clone_buffer = split_encoder.out.getData();
                fs_js.outfile_fs(
                    `${gif_folder}/${DOM_main_sprite[DOM_frame_index].label}.gif`,
                    clone_buffer
                );
                DOM_frame_index++;
            } else {
                split_encoder.addFrame(ctx);
            }
        }
    }
    encoder.finish();
    if (setting.create_gif) {
        const buffer = encoder.out.getData();
        fs_js.outfile_fs(`${gif_folder}/main_sprite.gif`, buffer);
    }
    bar.stop();
    return;
}
