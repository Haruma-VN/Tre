"use strict";
import fs from 'node:fs';
import path from 'node:path';
function getAllFiles(dir: string = process.argv[2], fromPath?: string) {
    const all_files = new Array();
    fs.readdirSync(dir).forEach((file) => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            all_files.push(getAllFiles(fullPath));
        } else {
            all_files.push(fullPath.slice(fullPath.indexOf(fromPath as string), fullPath.length));
        }
    });
    return all_files.reduce((a, b) => a.concat(b), new Array());
}
export default getAllFiles