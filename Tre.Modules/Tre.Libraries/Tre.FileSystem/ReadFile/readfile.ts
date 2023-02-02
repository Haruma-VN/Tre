"use strict";
import fs from "node:fs";
export default function (directories: string = process.argv[2]): string {
    return fs.readFileSync(directories, { encoding: "utf-8", flag: "r" })
}