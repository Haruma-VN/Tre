"use strict";
import { readfile } from '../../Tre.FileSystem/util.js';
import md5hash from './md5hash.js';
export default function (path) {
    return md5hash(readfile(path));
}