"use strict";
export default function (animation_data: any, version: number) {
    const number = animation_data.readUInt16LE();
    let index = (number & 2047);
    if (index == 2047) {
        index =  animation_data.readUInt32LE();
    }
    let sprite = (number & 32768) != 0;
    let additive = (number & 16384) != 0;
    let resource = animation_data.readUInt8();
    if (version >= 6 && resource == 255) {
        resource = animation_data.readUInt16LE();
    }
    let preload_frame = 0;
    if ((number & 8192) != 0) {
        preload_frame = animation_data.readUInt16LE();
    }
    let name = null;
    if ((number & 4096) != 0) {
        name = animation_data.readString(animation_data.readUInt16LE());
    }
    let time_scale = 1;
    if ((number & 2048) != 0) {
        time_scale = animation_data.readUInt32LE() / 65536;
    };
    return {
        index, name, resource, sprite, additive, preload_frame, time_scale
    }
}