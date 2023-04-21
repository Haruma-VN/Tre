"use strict";
import { SmartBuffer } from "smart-buffer";
import write_image from './write_image.js';
import write_sprite from './write_sprite.js';
export default function (animation_json: any) {
    const animation_data = new SmartBuffer();
    animation_data.writeString('5419F0BA', 'hex');
    const version: number = animation_json.version;
    if (version < 1 || version > 6 || version === undefined) {
        throw new Error('version_out_of_range');
    };
    animation_data.writeUInt32LE(version);
    animation_data.writeUInt8(animation_json.frame_rate);
    if (animation_json.position == null || animation_json.position.length < 2) {
        animation_data.writeInt16LE(0);
        animation_data.writeInt16LE(0);
    }
    else {
        animation_data.writeInt16LE(animation_json.position[0] * 20);
        animation_data.writeInt16LE(animation_json.position[1] * 20);
    }
    if (animation_json.size == null || animation_json.size.length < 2) {
        animation_data.writeInt16LE(-1);
        animation_data.writeInt16LE(-1);
    }
    else {
        animation_data.writeInt16LE(animation_json.size[0] * 20);
        animation_data.writeInt16LE(animation_json.size[1] * 20);
    }
    if (animation_json.image == null || animation_json.image.length == 0) {
        animation_data.writeUInt16LE(0);
    }
    else {
        const image_count: number = animation_json.image.length;
        animation_data.writeUInt16LE(image_count);
        animation_data.writeBuffer(write_image(animation_json.image, image_count, version))
    }
    if (animation_json.sprite == null || animation_json.sprite.length == 0) {
        animation_data.writeUInt16LE(0);
    }
    else {
        const sprite_count: number = animation_json.sprite.length;
        animation_data.writeUInt16LE(sprite_count);
        for (let i = 0; i < sprite_count; i++) {
            animation_data.writeBuffer(write_sprite(animation_json.sprite[i], version));
        }
    }
    if (version <= 3) {
        animation_data.writeBuffer(write_sprite(animation_json.main_sprite, version));
    }
    else {
        if (animation_json.main_sprite == null) {
            animation_data.writeUInt8(0);
        }
        else {
            animation_data.writeUInt8(1);
            animation_data.writeBuffer(write_sprite(animation_json.main_sprite, version));
        }
    }
    return animation_data.toBuffer();
}