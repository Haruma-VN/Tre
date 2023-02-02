"use strict";
import fs from "node:fs";
export default function(directories = process.argv[2]){
    return fs.readFileSync(directories, {encoding: "utf-8", flag:"r"})
}