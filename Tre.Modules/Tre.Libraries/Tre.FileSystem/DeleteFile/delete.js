"use strict";
import fs from 'node:fs';
export default function (dir) {
    if (fs.existsSync(dir)) {
        fs.unlinkSync(dir);
    }
    ;
    return;
}
