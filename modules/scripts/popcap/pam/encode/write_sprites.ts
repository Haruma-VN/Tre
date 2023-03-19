"use strict";
import { SmartBuffer } from "smart-buffer";
import writeFrameInfo from './write_frameinfo.js';
export default function (pam_sprite: any, version: number) {
    const spritesInfo = new SmartBuffer();
    if (version >= 4) {
        const name = pam_sprite.name;
        spritesInfo.writeInt16LE(name.length);
        spritesInfo.writeString(name);
        if (version >= 6) {
            const description = pam_sprite.description;
            spritesInfo.writeInt16LE(description.length);
            spritesInfo.writeString(description);
        }
        spritesInfo.writeInt32LE(pam_sprite.frame_rate * 65536);
    }
    if (version >= 5) {
        if (pam_sprite.work_area == null || pam_sprite.work_area.Length < 2) {
            spritesInfo.writeInt16LE(1);
            spritesInfo.writeInt16LE(0);
            spritesInfo.writeInt16LE(0);
        }
        else {
            spritesInfo.writeInt16LE(pam_sprite.work_area[1]);
            spritesInfo.writeInt16LE(pam_sprite.work_area[0]);
            spritesInfo.writeInt16LE(pam_sprite.work_area[0] + pam_sprite.work_area[1] - 1);
        }
    }
    else {
        if (pam_sprite.work_area == null || pam_sprite.work_area.Length < 2) {
            spritesInfo.writeInt16LE(1);
        }
        else {
            spritesInfo.writeInt16LE(pam_sprite.work_area[1]);
        }
    }
    const frames = pam_sprite.frame;
    for (let i = 0; i < frames.length; i++) {
        spritesInfo.writeBuffer(writeFrameInfo(frames[i], version));
    }
    return spritesInfo.toBuffer();
}