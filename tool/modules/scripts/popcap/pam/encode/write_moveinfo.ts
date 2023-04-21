"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (animation_change: any, version: number) {
    const changeInfo: any = new SmartBuffer();
    const MoveFlags = {
        SrcRect: 32768,
        Rotate: 16384,
        Color: 8192,
        Matrix: 4096,
        LongCoords: 2048,
        AnimFrameNum: 1024
    }
    let flags = 0;
    if (animation_change.index >= 1023 || animation_change.index < 0) {
        flags += 1023;
        changeInfo.writeUInt32LE(animation_change.index);
    }
    else {
        flags += animation_change.index;
    }
    if (animation_change.transform.length == 6) {
        flags += MoveFlags.Matrix;
        changeInfo.writeInt32LE(animation_change.transform[0] * 65536);
        changeInfo.writeInt32LE(animation_change.transform[2] * 65536);
        changeInfo.writeInt32LE(animation_change.transform[1] * 65536);
        changeInfo.writeInt32LE(animation_change.transform[3] * 65536);
    }
    if (animation_change.transform.length == 3) {
        flags += MoveFlags.Rotate;
        changeInfo.writeInt16LE(animation_change.transform[0] * 1000);
    }
    if (version >= 5) {
        changeInfo.writeInt32LE(animation_change.transform[animation_change.transform.length - 2] * 20);
        changeInfo.writeInt32LE(animation_change.transform[animation_change.transform.length - 1] * 20);
        flags += MoveFlags.LongCoords;
    }
    else {
        changeInfo.writeInt16LE(animation_change.transform[animation_change.transform.length - 2] * 20);
        changeInfo.writeInt16LE(animation_change.transform[animation_change.transform.length - 1] * 20);
    }
    if (animation_change.sprite_frame_number != null && animation_change.sprite_frame_number.length >= 4) {
        flags += MoveFlags.SrcRect;
        changeInfo.writeInt16LE(animation_change.sprite_frame_number[0] * 20);
        changeInfo.writeInt16LE(animation_change.sprite_frame_number[1] * 20);
        changeInfo.writeInt16LE(animation_change.sprite_frame_number[2] * 20);
        changeInfo.writeInt16LE(animation_change.sprite_frame_number[3] * 20);
    }
    if (animation_change.color != null && animation_change.color.length >= 4) {
        flags += MoveFlags.Color;
        changeInfo.writeUInt8(animation_change.color[0] * 255);
        changeInfo.writeUInt8(animation_change.color[1] * 255);
        changeInfo.writeUInt8(animation_change.color[2] * 255);
        changeInfo.writeUInt8(animation_change.color[3] * 255);
    }
    if (animation_change.source_rectangle != null) {
        flags += MoveFlags.AnimFrameNum;
        changeInfo.writeUInt16LE(animation_change.source_rectangle);
    }
    changeInfo.writeUInt16LE(flags);
    const writeOffset = changeInfo.writeOffset - 2;
    const changeInfo_b = Buffer.concat([changeInfo.toBuffer().slice(writeOffset), changeInfo.toBuffer().slice(0, writeOffset)]);
    return changeInfo_b;
}