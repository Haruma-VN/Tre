"use strict";
import fs from 'node:fs';
import path from 'node:path';
export default function (dir: string): void {
    const message = fs.readFileSync(dir, {encoding: "utf-8", flag: 'r'});
    return fs.writeFileSync(dir + '/../' + path.parse(dir).name, Buffer.from(message, 'base64').toString('ascii'));
};