"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (pam_append: any, version: number): Buffer {
    const appendInfo = new SmartBuffer();
    let flags = 0;
    if (pam_append.index >= 2047 || pam_append.index < 0) {
        flags += 2047;
        appendInfo.writeUInt32LE(pam_append.index);
    } else {
        flags += pam_append.index;
    }
    flags += pam_append.sprite ? 32768 : 0;
    flags += pam_append.additive ? 16384 : 0;
    if (version >= 6) {
        if (pam_append.resource >= 255 || pam_append.resource < 0) {
            appendInfo.writeUInt8(255);
            appendInfo.writeUInt16LE(pam_append.resource);
        } else {
            appendInfo.writeUInt8(pam_append.resource);
        }
    } else {
        appendInfo.writeUInt8(pam_append.resource);
    }
    if (pam_append.preload_frames !== 0) {
        flags += 8192;
        appendInfo.writeUInt16LE(pam_append.preload_frames);
    }
    if (pam_append.name !== null) {
        flags += 4096;
        appendInfo.writeUInt16LE(pam_append.name.length);
        appendInfo.writeString(pam_append.name);
    }
    if (pam_append.timescale !== 1) {
        flags += 2048;
        appendInfo.writeInt32LE(pam_append.timescale * 65536);
    }
    appendInfo.writeUInt16LE(flags);
    const writeOffset = appendInfo.writeOffset - 2;
    const appendInfo_b = Buffer.concat([
        appendInfo.toBuffer().slice(writeOffset),
        appendInfo.toBuffer().slice(0, writeOffset),
    ]);
    return appendInfo_b;
}
