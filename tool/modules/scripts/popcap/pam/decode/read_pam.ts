"use strict";
import { SmartBuffer } from "smart-buffer";
import readHead from './read_head.js';
import readImages from './read_images.js';
import readSprites from './read_sprites.js';
import readMainSprites from './read_main_sprites.js';
export default function (buffer: Buffer) {
    const pam_data = SmartBuffer.fromBuffer(buffer);
    let pamAnimInfo: any = readHead(pam_data);
    const version = pamAnimInfo.version;
    const frame_rate = pamAnimInfo.frame_rate;
    pamAnimInfo.image = readImages(pam_data, version);
    const spritesCount = pam_data.readUInt16LE();
    const spritesInfo = new Array();
    for (let i = 0; i < spritesCount; i++) {
        let spriteInfo = readSprites(pam_data, version);
        if (version < 4) {
            spriteInfo.frame_rate = frame_rate;
        }
        spritesInfo.push(spriteInfo);
    }
    pamAnimInfo.sprite = spritesInfo;
    pamAnimInfo.main_sprite = readMainSprites(pam_data, version, frame_rate);
    return pamAnimInfo;
}
