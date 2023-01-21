"use strict";
import { readfile } from '../../Tre.FileSystem/util.js';
import sha256hash from './sha256hash.js';
export default function (path) {
    return sha256hash(readfile(path));
}