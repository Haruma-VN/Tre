"use strict";
import fs from "fs-extra";
export default function(buffer){
    return fs.readFileSync(buffer)
}