"use strict";
export default function (pam_data: any, version: number) {
    const number = pam_data.readUInt16LE();
    let index = number & 2047;
    if (index === 2047) {
        index = pam_data.readUInt32LE();
    }
    let sprite = (number & 32768) !== 0;
    let additive = (number & 16384) !== 0;
    let resource = pam_data.readUInt8();
    if (version >= 6 && resource === 255) {
        resource = pam_data.readUInt16LE();
    }
    let preload_frames = 0;
    if ((number & 8192) !== 0) {
        preload_frames = pam_data.readUInt16LE();
    }
    let name = null;
    if ((number & 4096) !== 0) {
        name = pam_data.readString(pam_data.readUInt16LE());
    }
    let timescale = 1;
    if ((number & 2048) !== 0) {
        timescale = pam_data.readInt32LE() / 65536;
    }
    return {
        index,
        name,
        resource,
        sprite,
        additive,
        preload_frames,
        timescale,
    };
}
