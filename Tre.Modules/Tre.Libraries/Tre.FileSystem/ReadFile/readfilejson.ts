"use strict";
import fs from "node:fs";
import { parse } from '../../Tre.JSONSystem/util.js';
export default function (directories: string = process.argv[2]): {} {
    return parse(fs.readFileSync(directories, { encoding: "utf-8", flag: "r" }));
}