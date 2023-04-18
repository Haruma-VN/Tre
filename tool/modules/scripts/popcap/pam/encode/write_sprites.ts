"use strict";
import { SmartBuffer } from "smart-buffer";
import writeFrameInfo from "./write_frameinfo.js";
export default function (pam_sprite: any, version: number) {
    const spritesInfo = new SmartBuffer();
    if (version >= 4) {
        const name = pam_sprite.name;
        spritesInfo.writeUInt16LE(name.length);
        spritesInfo.writeString(name);
        if (version >= 6 || version <= 0) {
            let description = pam_sprite.description;
            let description_length = 0;
            if (
                description === null ||
                description === undefined ||
                description === void 0
            ) {
                description = "";
            } else {
                description_length = description.length;
            }
            spritesInfo.writeUInt16LE(description_length);
            spritesInfo.writeString(description);
        }
        spritesInfo.writeInt32LE(pam_sprite.frame_rate * 65536);
    }
    if (version >= 5) {
        if (pam_sprite.work_area === null || pam_sprite.work_area.Length < 2) {
            spritesInfo.writeUInt16LE(1);
            spritesInfo.writeUInt16LE(0);
            spritesInfo.writeUInt16LE(0);
        } else {
            spritesInfo.writeUInt16LE(pam_sprite.work_area[1]);
            spritesInfo.writeUInt16LE(pam_sprite.work_area[0]);
            spritesInfo.writeUInt16LE(
                pam_sprite.work_area[0] + pam_sprite.work_area[1] - 1
            );
        }
    } else {
        if (pam_sprite.work_area === null || pam_sprite.work_area.Length < 2) {
            spritesInfo.writeUInt16LE(1);
        } else {
            spritesInfo.writeUInt16LE(pam_sprite.work_area[1]);
        }
    }
    const frames = pam_sprite.frame;
    for (let i = 0; i < frames.length; i++) {
        spritesInfo.writeBuffer(writeFrameInfo(frames[i], version));
    }
    return spritesInfo.toBuffer();
}
