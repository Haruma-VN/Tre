"use strict";
import { SmartBuffer } from "smart-buffer";
import writeImages from "./write_images.js";
import writeSprites from "./write_sprites.js";
export default function (pam_json: any) {
    const pam_data = new SmartBuffer();
    pam_data.writeString("5419f0ba", "hex");
    const version = pam_json.version;
    if (version > 6) {
        throw new Error("version_out_of_range");
    }
    pam_data.writeInt32LE(version);
    pam_data.writeInt8(pam_json.frame_rate);
    if (pam_json.position === null || pam_json.position.length < 2) {
        pam_data.writeInt16LE(0);
        pam_data.writeInt16LE(0);
    } else {
        pam_data.writeInt16LE(pam_json.position[0] * 20);
        pam_data.writeInt16LE(pam_json.position[1] * 20);
    }
    if (pam_json.size === null || pam_json.size.length < 2) {
        pam_data.writeInt16LE(-1);
        pam_data.writeInt16LE(-1);
    } else {
        pam_data.writeInt16LE(pam_json.size[0] * 20);
        pam_data.writeInt16LE(pam_json.size[1] * 20);
    }
    if (pam_json.image === null || pam_json.image.length === 0) {
        pam_data.writeUInt16LE(0);
    } else {
        const imagesCount = pam_json.image.length;
        pam_data.writeUInt16LE(imagesCount);
        pam_data.writeBuffer(writeImages(pam_json.image, imagesCount, version));
    }
    if (pam_json.sprite === null || pam_json.sprite.length === 0) {
        pam_data.writeUInt16LE(0);
    } else {
        const spritesCount = pam_json.sprite.length;
        pam_data.writeUInt16LE(spritesCount);
        for (let i = 0; i < spritesCount; i++) {
            pam_data.writeBuffer(writeSprites(pam_json.sprite[i], version));
        }
    }
    if (version <= 3) {
        pam_data.writeBuffer(writeSprites(pam_json.main_sprite, version));
    } else {
        if (pam_json.main_sprite === null) {
            pam_data.writeUInt8(0);
        } else {
            pam_data.writeUInt8(1);
            pam_data.writeBuffer(writeSprites(pam_json.main_sprite, version));
        }
    }
    return pam_data.toBuffer();
}
