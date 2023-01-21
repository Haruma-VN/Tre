"use strict";
import { readfile, writefile } from '../../../Tre.FileSystem/util.js';
import path from 'node:path';
export default function(dir){
    const message = readfile(dir);
    return writefile(dir + '/../' + path.parse(dir).name + path.extname(dir) + '.bin', Buffer.from(message).toString('base64'));
};