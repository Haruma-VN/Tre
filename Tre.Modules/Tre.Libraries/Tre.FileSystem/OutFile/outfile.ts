"use strict";
import fs from 'fs-extra';
export default function (directories: string, data: string) {
    return fs.outputFileSync(directories, data);
}