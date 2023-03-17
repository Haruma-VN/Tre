"use strict";
export default function (pam_data: any, version: number) {
    const MoveFlags = {
        SrcRect: 32768,
        Rotate: 16384,
        Color: 8192,
        Matrix: 4096,
        LongCoords: 2048,
        AnimFrameNum: 1024
    }
    const flags = pam_data.readUInt16LE();
    let index = flags & 1023;
    if (index == 1023) {
        index = pam_data.readUInt32LE();
    };
    let transform = new Array();
    if ((flags & MoveFlags.Matrix) != 0) {
        transform = [0, 0, 0, 0, 0, 0];
        transform[0] = pam_data.readInt32LE() / 65536;
        transform[2] = pam_data.readInt32LE() / 65536;
        transform[1] = pam_data.readInt32LE() / 65536;
        transform[3] = pam_data.readInt32LE() / 65536;
    }
    else if ((flags & MoveFlags.Rotate) != 0) {
        transform = [0, 0, 0]
        transform[0] = pam_data.readInt16LE() / 1000;
    }
    else {
        transform = [0, 0]
    };
    if ((flags & MoveFlags.LongCoords) != 0) {
        transform[transform.length - 2] = pam_data.readInt32LE() / 20;
        transform[transform.length - 1] = pam_data.readInt32LE() / 20;
    }
    else {
        transform[transform.length - 2] = pam_data.readInt16LE() / 20;
        transform[transform.length - 1] = pam_data.readInt16LE() / 20;
    }
    let src_rect: number[] | null = null;
    if ((flags & MoveFlags.SrcRect) != 0) {
        src_rect = [
            pam_data.readInt16LE() / 20,
            pam_data.readInt16LE() / 20,
            pam_data.readInt16LE() / 20,
            pam_data.readInt16LE() / 20
        ]
    }
    let color: number[] | null = null;
    if ((flags & MoveFlags.Color) != 0) {
        color = [
            pam_data.readUInt8() / 255,
            pam_data.readUInt8() / 255,
            pam_data.readUInt8() / 255,
            pam_data.readUInt8() / 255
        ]
    }
    let anim_frame_num = 0;
    if ((flags & MoveFlags.AnimFrameNum) != 0) {
        anim_frame_num = pam_data.readInt16LE();
    }
    return {
        index, transform, color, src_rect, anim_frame_num
    }
}