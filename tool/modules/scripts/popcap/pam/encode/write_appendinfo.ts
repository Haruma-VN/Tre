"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (animation_append: any, version: number): Buffer {
    const appendInfo = new SmartBuffer();
    let flags: number = 0;
    if (animation_append.index >= 2047 || animation_append.index < 0) {
        flags += 2047;
        appendInfo.writeUInt32LE(animation_append.index);
    }
    else {
        flags += animation_append.index;
    }
    flags += animation_append.sprite ? 32768 : 0;
    flags += animation_append.additive ? 16384 : 0;
    if (version >= 6) {
        if (animation_append.resource >= 255 || animation_append.resource < 0) {
            appendInfo.writeUInt8(255);
            appendInfo.writeUInt16LE(animation_append.resource);
        }
        else {
            appendInfo.writeUInt8(animation_append.resource);
        }
    }
    else {
        appendInfo.writeUInt8(animation_append.resource);
    }
    if (animation_append.preload_frame != 0) {
        flags += 8192;
        appendInfo.writeUInt16LE(animation_append.preload_frame);
    }
    if (animation_append.name != null) {
        flags += 4096;
        appendInfo.writeUInt16LE(animation_append.name.length);
        appendInfo.writeString(animation_append.name);
    }
    if (animation_append.time_scale != 1) {
        flags += 2048;
        appendInfo.writeUInt32LE(animation_append.time_scale * 65536);
    }
    appendInfo.writeUInt16LE(flags);
    const writeOffset = appendInfo.writeOffset - 2;
    const appendInfo_b = Buffer.concat([appendInfo.toBuffer().slice(writeOffset), appendInfo.toBuffer().slice(0, writeOffset)]);
    return appendInfo_b;
}