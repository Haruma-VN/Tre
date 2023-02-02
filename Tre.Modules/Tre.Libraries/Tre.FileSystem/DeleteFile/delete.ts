"use strict";
import fs from 'node:fs';
export default function (dir: string = ''): void {
    return fs.unlinkSync(dir);
};