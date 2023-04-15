"use strict";
import zlib from 'node:zlib';
import path from 'node:path';
import fs from 'node:fs';
export default async function (dir: string): Promise<void> {
    const unzip = zlib.createUnzip();
    const inp = fs.createReadStream(dir);
    const out = fs.createWriteStream(dir + '/../' + path.parse(dir).name);
    await inp.pipe(unzip).pipe(out);
    return;
};