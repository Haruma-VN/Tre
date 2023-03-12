"use strict";
import path from "node:path";
export default function resolveFilePath(filePath) {
    if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(process.cwd(), filePath);
    }
    return filePath;
}
