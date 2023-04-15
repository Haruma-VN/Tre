"use strict";
import path from "node:path";
export default function resolveFilePath(filePath: string): string {
    if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(path.dirname(process.argv[1]), filePath);
    }
    return filePath;
}