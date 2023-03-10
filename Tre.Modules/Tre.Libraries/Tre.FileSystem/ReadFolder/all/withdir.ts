"use strict";
import fs from 'node:fs';
import path from 'node:path';
export default function getAllFilesDir(dir = process.argv[2]): string[] {
    const all_files = new Array();
    fs.readdirSync(dir).forEach((file) => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            all_files.push(getAllFilesDir(fullPath));
        } else {
            all_files.push(fullPath);
        }
    });
    return all_files.reduce((a, b) => a.concat(b), new Array())
}