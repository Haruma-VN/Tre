"use strict";
import fs from 'node:fs';
export default function (dir: string = process.argv[2]): string[] {
    const arr: string[] = new Array();
    fs.readdirSync(dir).forEach(file => {
        arr.push(file);
    });
    return arr;
}