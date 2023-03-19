"use strict";
import path from 'node:path';
export default function (dir: string): string {
    return path.parse(dir).name;
};