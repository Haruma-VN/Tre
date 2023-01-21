"use strict";
import zlib from 'node:zlib';
import path from 'node:path';
import fs from 'node:fs';
export default function (dir) {
    const inp = fs.createReadStream(dir);
    const out = fs.createWriteStream(dir + '/../' + path.basename(dir) + path.extname(dir + '.bin'));
    const gzip = zlib.createGzip();
    inp.pipe(gzip).pipe(out);
}