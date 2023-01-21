"use strict";
import fs from 'node:fs';
// Will return array list of files
export default function (dir = process.argv[2]) {
    const arr = new Array();
    fs.readdirSync(dir).forEach(file => {
        arr.push(file);
    });
    return arr;
}