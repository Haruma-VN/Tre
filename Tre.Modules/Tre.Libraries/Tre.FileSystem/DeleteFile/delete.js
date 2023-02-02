"use strict";
import fs from 'node:fs';
export default function (dir = '') {
    return fs.unlinkSync(dir);
};