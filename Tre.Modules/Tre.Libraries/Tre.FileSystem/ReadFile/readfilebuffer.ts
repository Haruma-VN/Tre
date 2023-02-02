"use strict";
import fs from "fs-extra";
export default function (buffer: string): ArrayBuffer {
    return fs.readFileSync(buffer)
}