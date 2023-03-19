"use strict";
import { parse } from '../../json/util.js';
import readfile from "./readfile.js";

export default function (directories: string = process.argv[2], force_reading_trailing_commas_json: boolean = false): any {
    return parse(readfile(directories), force_reading_trailing_commas_json);
}