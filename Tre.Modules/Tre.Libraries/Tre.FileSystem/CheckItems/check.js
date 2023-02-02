"use strict";
import fs from "node:fs";
export default function (file_directory) {
    return fs.lstatSync(file_directory).isFile();
}
