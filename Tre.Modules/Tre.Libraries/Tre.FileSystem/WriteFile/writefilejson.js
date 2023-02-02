"use strict";
import fs from 'node:fs';
import { stringify } from '../../Tre.JSONSystem/util.js';
import parser from '../../Tre.JSONSystem/parser.js';
export default function (directories, data) {
    if(typeof data != 'object'){
        data = parser(data);
    };
    return fs.writeFileSync(directories, stringify(data), { encoding: "utf-8", flag: "w" });
};