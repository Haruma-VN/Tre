"use strict";
export default function (animation_data: any) {
    let index = animation_data.readUInt16LE();
    if (index >= 2047) {
        index = animation_data.readUInt32LE();
    }
    return { index };
}