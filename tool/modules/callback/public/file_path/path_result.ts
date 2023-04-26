"use strict";
import fs_js from "../../../library/fs/implement.js";

export default function resolveFilePath(filePath: string): string {
    if (!fs_js.is_absolute(filePath)) {
        filePath = fs_js.resolve(fs_js.dirname(process.argv[1]), filePath);
    }
    return filePath;
}
