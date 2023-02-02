"use strict";
import fs from 'node:fs';
export default function (directories: string, data: string | Buffer): void {
    return fs.writeFileSync(directories, data, { encoding: "utf-8", flag: "w" });
}