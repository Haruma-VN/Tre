"use strict";
import fs from 'fs-extra';
export default function(directories, data){
    return fs.outputFileSync(directories, data);
}