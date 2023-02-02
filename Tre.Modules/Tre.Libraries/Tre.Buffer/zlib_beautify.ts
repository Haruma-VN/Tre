"use strict";
import { Buffer } from "buffer";
export default function (filesize: number): ArrayBuffer {
    if (Number.isInteger(filesize / 4096))
        return Buffer.alloc(filesize)
    return Buffer.alloc(4096 * Math.ceil((filesize / 4096)));
}