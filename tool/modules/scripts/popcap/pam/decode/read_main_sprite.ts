"use strict";
import parse_sprite from './read_sprite.js';
export default function(animation_data: any, version: number, frame_rate: number) {
    if (version <= 3 || animation_data.readUInt8() == 1) {
        let main_sprite = parse_sprite(animation_data, version);
        if (version < 4) {
            main_sprite.frame_rate = frame_rate;
        }
        return main_sprite;
    }
}