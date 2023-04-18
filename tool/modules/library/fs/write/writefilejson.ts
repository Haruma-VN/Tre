"use strict";
import fs from "node:fs";
import { stringify } from "../../json/util.js";
import parser from "../../json/parser.js";
import writefile from "./writefile.js";
export default function (directories: string, data: {} | string): void {
    if (typeof data !== "object") {
        data = parser(data);
    }
    return writefile(directories, stringify(data));
}
