"use strict";
import path from "node:path";
export default function resolveFilePath(filePath: string): string {
    if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(process.cwd(), filePath);
    }
    return filePath;
}