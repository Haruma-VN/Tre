"use strict";
import { SmartBuffer } from "smart-buffer";
import parse_header from "./read_header.js";
import parse_image from "./read_image.js";
import parse_sprite from "./read_sprite.js";
import parse_main_sprite from "./read_main_sprite.js";
export default function (data: any, file_path: string): Buffer {
    const animation_data = SmartBuffer.fromBuffer(data);
    const animation_info: any = parse_header(animation_data, file_path);
    const animation_version: number = animation_info.version;
    const animation_frame_rate: number = animation_info.frame_rate;
    const image: any = parse_image(animation_data, animation_version);
    const sprite_count = animation_data.readUInt16LE();
    const sprite = new Array();
    for (let i = 0; i < sprite_count; i++) {
        let sprite_info: any = parse_sprite(animation_data, animation_version);
        if (animation_version < 4) {
            sprite_info.frame_rate = animation_frame_rate;
        }
        sprite.push(sprite_info);
    }
    const main_sprite = parse_main_sprite(animation_data, animation_version, animation_version);
    const animation_json = { ...animation_info, image, sprite, main_sprite };
    return animation_json;
}
