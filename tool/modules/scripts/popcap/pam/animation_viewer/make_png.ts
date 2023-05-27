"use strict";
import { createCanvas } from "@napi-rs/canvas";
import mix_image from "./mix_image.js";
import { encode } from "lib-upng";
import * as gif_maker from "modern-gif";
import fs_js from "../../../../library/fs/implement.js";
import { SingleBar } from "cli-progress";
import * as color from "../../../../library/color/color.js";
import localization from "../../../../callback/localization.js";
export default async function make_png(
    frame_composite_mapping: any,
    image_list: any,
    max_position: any,
    max_square: any,
    DOM_main_sprite: any,
    apng_folder_path: string,
    frame_rate: number,
    setting: any
) {
    let animation_delay = new Array();
    let apng_image_list: any = new Array();
    let DOM_frame_index = 0;
    const apng_main_sprite: Array<any> = new Array();
    let image_gif_list: Array<{ imageData: Buffer; delay: number }> = new Array();
    const image_main_gif_list: Array<{ imageData: Buffer; delay: number }> = new Array();
    if (!fs_js.js_exists(apng_folder_path)) {
        fs_js.create_directory(apng_folder_path);
    }
    const bar = new SingleBar({
        format: fs_js.create_toolkit_view("progress_bar")
            ? color.fgcyan_string("◉ " + localization("execution_status") + " |") +
              color.fggreen_string("{bar}") +
              color.fgcyan_string(`| {percentage}% || {value}/{total}`)
            : color.fgcyan_string("◉ " + localization("execution_actual_size") + ": ") + color.fgcyan_string(`{percentage}% || {value}/{total}`),
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    const delay: number = setting.frame_rate !== -1 ? 1000 / setting.frame_rate : 1000 / frame_rate;
    const bar_length: number = Object.keys(frame_composite_mapping).length;
    fs_js.execution_information(
        `${localization("animation_width")}: ${max_square.max_width}, ${localization("animation_height")}: ${max_square.max_height}, ${localization(
            "number_of_frames"
        )}: ${bar_length}, ${localization("frame_rate")}: ${frame_rate}`
    );
    fs_js.execution_information(
        `${localization("method")}: ${setting.generate_apng ? `| ${localization("generate_apng")} ` : ""}${
            setting.generate_gif ? `| ${localization("generate_gif")} ` : ""
        }${DOM_main_sprite.length > 0 ? `| ${localization("split_labels")} ` : ""}${
            setting.generate_image_frames > 0 ? `| ${localization("generate_image_frames")} ` : ""
        } |`
    );
    bar.start(bar_length, 0, {
        speed: "N/A",
    });

    const bar_increment_process: number = DOM_main_sprite.length > 0 ? (setting.generate_apng && setting.generate_gif ? 0.2 : 0.33) : (setting.generate_apng && setting.generate_gif ? 0.33 : 0.5);
    const bar_process: [number, number] = [0, bar_increment_process];
    for (const layer_index in frame_composite_mapping) {
        const image_frame_canvas: any = createCanvas(max_square.max_width, max_square.max_height);
        const image_ctx: any = image_frame_canvas.getContext("2d");
        if (setting.background_color.length != 9 || setting.background_color.slice(0, 1) != "#") {
            throw new Error(localization("invaid_background_color_hex"));
        }
        if (setting.background_color !== "#00000000" && setting.background_color.slice(7) != "00") {
            image_ctx.fillStyle = setting.background_color;
            await image_ctx.fillRect(0, 0, max_square.max_width, max_square.max_height);
        }
        for (let layer_sprite of frame_composite_mapping[layer_index]) {
            await mix_image(image_ctx, layer_sprite, image_list[1][layer_sprite.image_resource].image_canvas, max_position);
        }
        const image_data: any = image_ctx.getImageData(0, 0, max_square.max_width, max_square.max_height).data.buffer;
        animation_delay.push(delay);
        if (DOM_main_sprite.length > 0) {
            if (Number(layer_index) === DOM_main_sprite[DOM_frame_index].frame_index) {
                if (setting.generate_apng) {
                    apng_image_list = new Array();
                    apng_image_list.push(image_data);
                }
                if (setting.generate_gif) {
                    image_gif_list = new Array();
                    image_gif_list.push({ imageData: image_data, delay });
                }
            } else if (Number(layer_index) === DOM_main_sprite[DOM_frame_index + 1].frame_index - 1) {
                if (setting.generate_apng) {
                    apng_image_list.push(image_data);
                    const apng_image_split = new Uint8Array(
                        encode(apng_image_list, max_square.max_width, max_square.max_height, 0, animation_delay, null, null, bar, bar_process)
                    );
                    fs_js.write_stream(`${apng_folder_path}/${DOM_main_sprite[DOM_frame_index].label}.png`, apng_image_split);
                    apng_main_sprite.push(...apng_image_list);
                }
                if (setting.generate_gif) {
                    image_gif_list.push({ imageData: image_data, delay });
                    const gif_image: any = await gif_maker.encode({
                        width: max_square.max_width,
                        height: max_square.max_height,
                        frames: image_gif_list,
                        maxColors: 255,
                        bar,
                        bar_process,
                    });
                    fs_js.write_stream(`${apng_folder_path}/${DOM_main_sprite[DOM_frame_index].label}.gif`, Buffer.from(gif_image));
                    image_main_gif_list.push(...image_gif_list);
                }
                DOM_frame_index++;
            } else {
                if (setting.generate_apng) {
                    apng_image_list.push(image_data);
                }
                if (setting.generate_gif) {
                    image_gif_list.push({ imageData: image_data, delay });
                }
            }
        } else {
            apng_main_sprite.push(image_data);
            image_main_gif_list.push({ imageData: image_data, delay });
        }
        const image_frame: Buffer = image_frame_canvas.toBuffer("image/png");
        if (setting.generate_image_frames) {
            if (!fs_js.js_exists(`${apng_folder_path}/frames/`)) {
                fs_js.create_directory(`${apng_folder_path}/frames`);
            }
            fs_js.write_stream(`${apng_folder_path}/frames/${setting.frame_default_name}${Number(layer_index) + 1}.png`, image_frame);
        }
        bar_process[0] += bar_increment_process;
        bar.update(Math.round(bar_process[0]));
    }
    if (setting.generate_apng) {
        const apng_image: any = new Uint8Array(
            encode(apng_main_sprite, max_square.max_width, max_square.max_height, 0, animation_delay, null, null, bar, bar_process)
        );
        fs_js.write_stream(`${apng_folder_path}/main_sprite.png`, apng_image);
    }
    if (setting.generate_gif) {
        const gif_image: any = await gif_maker.encode({
            width: max_square.max_width,
            height: max_square.max_height,
            frames: image_main_gif_list,
            maxColors: 255,
            bar,
            bar_process,
        });
        fs_js.write_stream(`${apng_folder_path}/main_sprite.gif`, Buffer.from(gif_image));
    }
    bar.update(bar_length);
    bar.stop();
    return;
}
