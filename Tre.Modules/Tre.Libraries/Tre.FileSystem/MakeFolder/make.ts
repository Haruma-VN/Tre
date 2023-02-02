"use strict";
import fs from 'node:fs';
export default function (dir: string): void | string {
    if (dir != undefined) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        };
        return dir;
    }
    else {
        return;
    }
}