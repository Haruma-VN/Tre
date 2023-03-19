"use strict";
import fs from 'node:fs';
import path from 'node:path';
export default function (dir: string): void {
    const message = fs.readFileSync(dir);
    return fs.writeFileSync(dir + '/../' + path.parse(dir).name + path.extname(dir) + '.bin', Buffer.from(message).toString('base64'));
};