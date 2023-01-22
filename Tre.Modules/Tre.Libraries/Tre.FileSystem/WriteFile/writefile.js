"use strict";
import fs from 'node:fs';
export default function(directories, data){
    return fs.writeFileSync(directories, data, {encoding: "utf-8", flag: "w"});
}