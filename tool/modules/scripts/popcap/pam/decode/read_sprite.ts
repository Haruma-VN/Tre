"use strict";
import parse_frame_info from './read_frameinfo.js';
export default function (animation_data: any, version: number) {
    let name: string | null = null;
    let description: string | null = null;
    let frame_rate: number = -1;
    if (version >= 4) {
        name = animation_data.readString(animation_data.readUInt16LE());
        if (version >= 6) {
            description = animation_data.readString(animation_data.readUInt16LE());
        }
        frame_rate = animation_data.readUInt32LE() / 65536;
    }
    const framesCount = animation_data.readUInt16LE();
    let work_area = new Array();
    if (version >= 5) {
        work_area = [animation_data.readUInt16LE(), animation_data.readUInt16LE()];
    }
    else {
        work_area = [0, framesCount - 1];
    }
    work_area[1] = framesCount;
    let framesInfo = new Array();
    for (let i = 0; i < framesCount; i++) {
        framesInfo.push(parse_frame_info(animation_data, version));
    }
    return {
        name, description, frame_rate, work_area, frame: framesInfo
    }
}