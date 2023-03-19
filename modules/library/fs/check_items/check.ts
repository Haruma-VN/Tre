"use strict";
import fs from "node:fs";
export default function (file_directory: string): boolean {
    return fs.lstatSync(file_directory).isFile();
}