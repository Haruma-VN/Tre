"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (index: number) {
    const removeInfo = new SmartBuffer();
    if (index >= 2047) {
        removeInfo.writeUInt16LE(2047);
        removeInfo.writeUInt32LE(index);
    }
    else {
        removeInfo.writeUInt16LE(index);
    }
    return removeInfo.toBuffer();
}