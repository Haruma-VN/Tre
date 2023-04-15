"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (index: number) {
    const removeInfo = new SmartBuffer();
    if (index >= 2047) {
        removeInfo.writeInt16LE(2047);
        removeInfo.writeInt32LE(index);
    }
    else {
        removeInfo.writeInt16LE(index);
    }
    return removeInfo.toBuffer();
}