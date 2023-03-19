"use strict";
import readFrameInfo from './read_frameinfo.js';
export default function (pam_data: any, version: number) {
    let name = null;
    let description = null;
    let frame_rate = -1;
    if (version >= 4) {
        name = pam_data.readString(pam_data.readInt16LE());
        if (version >= 6) {
            description = pam_data.readString(pam_data.readInt16LE());
        }
        frame_rate = pam_data.readInt32LE() / 65536;
    }
    const framesCount = pam_data.readInt16LE();
    let work_area = new Array();
    if (version >= 5) {
        work_area = [pam_data.readInt16LE(), pam_data.readInt16LE()];
    }
    else {
        work_area = [0, framesCount - 1];
    }
    work_area[1] = framesCount;
    let framesInfo = new Array();
    for (let i = 0; i < framesCount; i++) {
        framesInfo.push(readFrameInfo(pam_data, version));
    }
    return {
        name, description, frame_rate, work_area, frame: framesInfo
    }
}