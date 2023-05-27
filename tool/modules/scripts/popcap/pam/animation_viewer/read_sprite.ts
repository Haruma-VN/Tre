"use strict";
import make_png from "./make_png.js";
import write_sprite_xlf from "../json_to_flash/write_spritexfl.js";
import parse_transform from "../json_from_flash/parse_transform.js";
import parse_color from "../json_from_flash/parse_color.js";

export default async function read_sprite(
    sprite: any,
    animation_sprite: any,
    image_list: any,
    sprite_list: any,
    max_position: any,
    index: number,
    sprite_could_disable: any,
    frame_rate: number,
    setting: any,
    apng_folder_path: string
) {
    const frame_node_list: any = write_sprite_xlf(
        sprite,
        animation_sprite,
        index,
        true
    );
    let frame_composite_mapping: any = new Object();
    const sprite_image_list: any = new Array();
    const maxWidthArray: Array<number> = new Array();
    const maxHeightArray: Array<number> = new Array();
    for (const layer_index in frame_node_list) {
        const DOMLayer: any = structuredClone(frame_node_list[layer_index]);
        for (const frame_object of DOMLayer) {
            const duration = frame_object.duration;
            const frame_index = frame_object.index;
            for (let k = 0; k < duration; k++) {
                const DOMSymbolInstance: any =
                    frame_object.elements.DOMSymbolInstance;
                if (DOMSymbolInstance != undefined) {
                    const frame_index_duration: number = frame_index + k;
                    const name_match: string =
                        DOMSymbolInstance.libraryItemName.match(
                            /(image|sprite)\/(image|sprite)_([0-9]+)/
                        );
                    const resource = Number(name_match[3]) - 1;
                    const sprite_type: boolean = name_match[2] == "sprite";
                    const transform: Array<number> = parse_transform(
                        DOMSymbolInstance.matrix.Matrix
                    );
                    const color: Array<number> = parse_color(
                        DOMSymbolInstance.color.Color
                    ).map((color_channel) => color_channel * 255);
                    const frame_sprite_list = sprite_type
                        ? structuredClone(sprite_list[resource])
                        : structuredClone(image_list[0][resource]);
                    if (
                        frame_composite_mapping[frame_index_duration] ==
                        undefined
                    ) {
                        frame_composite_mapping[frame_index_duration] =
                            new Array();
                    }
                    for (let i = 0; i < frame_sprite_list.length; i++) {
                        const frame_sprite: any = frame_sprite_list[i];
                        if (
                            sprite_type &&
                            sprite_could_disable.includes(resource + 1) &&
                            sprite_could_disable.length > 0
                        ) {
                            frame_sprite.sprite_disable = true;
                        }
                        frame_sprite.transform =
                            frame_sprite.transform ?? new Array();
                        frame_sprite.color = frame_sprite.color ?? new Array();
                        frame_sprite.transform.push(transform);
                        frame_sprite.color.push(color);
                        if (index !== -1) {
                            sprite_image_list.push(frame_sprite);
                        } else {
                            maxWidthArray.push(
                                frame_sprite.image_width + transform[4]
                            );
                            maxHeightArray.push(
                                frame_sprite.image_height + transform[5]
                            );
                            frame_composite_mapping[frame_index_duration].push(
                                frame_sprite
                            );
                        }
                    }
                }
            }
        }
    }
    if (index !== -1) {
        return sprite_image_list;
    } else {
        function getMax(arr: any) {
            return arr.reduce(
                (max: number, v: number) => (max >= v ? max : v),
                -Infinity
            );
        }
        const max_square: any = {
            max_width: Math.round(
                getMax(maxWidthArray) + max_position[0] + setting.width_append
            ),
            max_height: Math.round(
                getMax(maxHeightArray) + max_position[1] + setting.height_append
            ),
        };
        const DOM_main_sprite: any = new Array();
        if (setting.generate_apng && setting.split_labels || setting.generate_gif && setting.split_labels) {
            for (let k = 0; k < sprite.frame.length; k++) {
                if (sprite.frame[k].label != null) {
                    DOM_main_sprite.push({
                        label: sprite.frame[k].label,
                        frame_index: k,
                    });
                }
                if (k == sprite.frame.length - 1) {
                    DOM_main_sprite.push({
                        label: null,
                        frame_index: k,
                    });
                }
            }
        }
        {
            max_position[0] = max_position[0] + setting.width_append;
            max_position[1] = max_position[1] + setting.height_append;
        }
        await make_png(
            frame_composite_mapping,
            image_list,
            max_position,
            max_square,
            DOM_main_sprite,
            apng_folder_path,
            frame_rate,
            setting
        );
    }
}
