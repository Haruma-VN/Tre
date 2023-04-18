"use strict";
import fs from "node:fs";
export default function create_multiple_parent(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}
