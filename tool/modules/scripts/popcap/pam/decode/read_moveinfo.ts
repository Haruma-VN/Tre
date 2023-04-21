"use strict";
export default function (animation_data: any) {
    const MoveFlags = {
        SrcRect: 32768,
        Rotate: 16384,
        Color: 8192,
        Matrix: 4096,
        LongCoords: 2048,
        AnimFrameNum: 1024
    }
    const flags = animation_data.readUInt16LE();
    let index: number = flags & 1023;
    if (index == 1023) {
        index = animation_data.readUInt32LE();
    };
    let transform: Array<number> = [0, 0, 0, 0, 0, 0];
    if ((flags & MoveFlags.Matrix) != 0) {
        transform[0] = animation_data.readInt32LE() / 65536;
        transform[2] = animation_data.readInt32LE() / 65536;
        transform[1] = animation_data.readInt32LE() / 65536;
        transform[3] = animation_data.readInt32LE() / 65536;
    }
    else if ((flags & MoveFlags.Rotate) != 0) {
        transform = [0, 0, 0]
        transform[0] = animation_data.readInt16LE() / 1000;
    }
    else {
        transform = [0, 0]
    };
    if ((flags & MoveFlags.LongCoords) != 0) {
        transform[transform.length - 2] = animation_data.readInt32LE() / 20;
        transform[transform.length - 1] = animation_data.readInt32LE() / 20;
    }
    else {
        transform[transform.length - 2] = animation_data.readInt16LE() / 20;
        transform[transform.length - 1] = animation_data.readInt16LE() / 20;
    }
    let sprite_frame_number: Array<number> | null = null;
    if ((flags & MoveFlags.SrcRect) != 0) {
        sprite_frame_number = [
            animation_data.readInt16LE() / 20,
            animation_data.readInt16LE() / 20,
            animation_data.readInt16LE() / 20,
            animation_data.readInt16LE() / 20
        ]
    }
    let color: Array<number> | null = null;
    if ((flags & MoveFlags.Color) != 0) {
        color = [
            animation_data.readUInt8() / 255,
            animation_data.readUInt8() / 255,
            animation_data.readUInt8() / 255,
            animation_data.readUInt8() / 255
        ]
    }
    let source_rectangle: Array<number> | null = null;
    if ((flags & MoveFlags.AnimFrameNum) != 0) {
        source_rectangle = animation_data.readUInt16LE();
    }
    return {
        index, transform, color, sprite_frame_number, source_rectangle
    }
}