"use strict";
import fs from "node:fs";
import localization from "../../../callback/localization.js";

export default function (directories: string = process.argv[2]): string {
    try {
        return fs.readFileSync(directories, { encoding: "utf-8", flag: "r" });
    } catch (err: any) {
        throw new Error(`${localization("cannot_read")} ${directories}. ${directories}: ${err.message.toString()}`);
    }
}
