"use strict";
import path from 'node:path';
export default function (dir) {
    return path.parse(dir).name;
};