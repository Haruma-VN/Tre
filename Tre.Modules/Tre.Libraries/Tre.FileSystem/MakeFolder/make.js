"use strict";
import fs from 'node:fs';
export default function (dir) {
    if (dir != undefined) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        };
        return dir;
    }
    else{
        return;
    }
}