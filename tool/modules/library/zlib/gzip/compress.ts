"use strict";
import zlib from "node:zlib";
import path from "node:path";
import fs from "node:fs";
export default async function (dir: string): Promise<void> {
    const inp = fs.createReadStream(dir);
    const out = fs.createWriteStream(
        dir + "/../" + path.basename(dir) + path.extname(dir + ".bin")
    );
    const gzip = zlib.createGzip();
    await inp.pipe(gzip).pipe(out);
    return;
}
