"use strict";
import fs from "fs-extra";
export default function (buffer: string): any {
    return fs.readFileSync(buffer)
}