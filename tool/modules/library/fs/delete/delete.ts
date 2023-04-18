"use strict";
import fs from "node:fs";
export default function (dir: string): void {
    if (fs.existsSync(dir)) {
        fs.unlinkSync(dir);
    }
    return;
}
