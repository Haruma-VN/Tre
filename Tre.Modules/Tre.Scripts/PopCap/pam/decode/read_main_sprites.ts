"use strict";
import readSprites from './read_sprites.js';
export default function(pam_data: any, version: number, frame_rate: number) {
    if (version <= 3 || pam_data.readInt8() == 1) {
        let main_sprite = readSprites(pam_data, version);
        if (version < 4) {
            main_sprite.frame_rate = frame_rate;
        }
        return main_sprite;
    }
}