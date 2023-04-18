"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (pam_change: any, version: number) {
    const changeInfo = new SmartBuffer();
    const MoveFlags = {
        SrcRect: 32768,
        Rotate: 16384,
        Color: 8192,
        Matrix: 4096,
        LongCoords: 2048,
        AnimFrameNum: 1024,
    };
    let flags = 0;
    if (pam_change.index >= 1023 || pam_change.index < 0) {
        flags += 1023;
        changeInfo.writeInt32LE(pam_change.index);
    } else {
        flags += pam_change.index;
    }
    if (pam_change.transform.length === 6) {
        flags += MoveFlags.Matrix;
        changeInfo.writeInt32LE(pam_change.transform[0] * 65536);
        changeInfo.writeInt32LE(pam_change.transform[2] * 65536);
        changeInfo.writeInt32LE(pam_change.transform[1] * 65536);
        changeInfo.writeInt32LE(pam_change.transform[3] * 65536);
    }
    if (pam_change.transform.length === 3) {
        flags += MoveFlags.Rotate;
        changeInfo.writeInt16LE(pam_change.transform[0] * 1000);
    }
    if (version >= 5) {
        changeInfo.writeInt32LE(
            pam_change.transform[pam_change.transform.length - 2] * 20
        );
        changeInfo.writeInt32LE(
            pam_change.transform[pam_change.transform.length - 1] * 20
        );
        flags += MoveFlags.LongCoords;
    } else {
        changeInfo.writeInt16LE(
            pam_change.transform[pam_change.transform.length - 2] * 20
        );
        changeInfo.writeInt16LE(
            pam_change.transform[pam_change.transform.length - 1] * 20
        );
    }
    if (pam_change.src_rect !== null && pam_change.src_rect.length >= 4) {
        flags += MoveFlags.SrcRect;
        changeInfo.writeInt16LE(pam_change.src_rect[0] * 20);
        changeInfo.writeInt16LE(pam_change.src_rect[1] * 20);
        changeInfo.writeInt16LE(pam_change.src_rect[2] * 20);
        changeInfo.writeInt16LE(pam_change.src_rect[3] * 20);
    }
    if (pam_change.color !== null && pam_change.color.length >= 4) {
        flags += MoveFlags.Color;
        changeInfo.writeUInt8(pam_change.color[0] * 255);
        changeInfo.writeUInt8(pam_change.color[1] * 255);
        changeInfo.writeUInt8(pam_change.color[2] * 255);
        changeInfo.writeUInt8(pam_change.color[3] * 255);
    }
    if (pam_change.anim_frame_num !== 0) {
        flags += MoveFlags.AnimFrameNum;
        changeInfo.writeInt16LE(pam_change.anim_frame_num);
    }
    changeInfo.writeUInt16LE(flags);
    const writeOffset = changeInfo.writeOffset - 2;
    const changeInfo_b = Buffer.concat([
        changeInfo.toBuffer().slice(writeOffset),
        changeInfo.toBuffer().slice(0, writeOffset),
    ]);
    return changeInfo_b;
}
