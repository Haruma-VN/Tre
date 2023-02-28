"use strict";
import rton2json from './rton2json.js';
import { outfile, readfilebuffer, read_dir, makefolder } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import fs from 'fs-extra';
import path, { parse } from 'node:path';
export function rton_to_json(filepath?: string): void {
    if (!filepath) {
        return;
    }

    if (fs.statSync(filepath).isDirectory()) {
        const folder = read_dir(filepath);
        makefolder(`${filepath}_json`);
        for (let file of folder) {
            if (parse(file).ext.toUpperCase() == '.RTON') {
                const jsonpath = `${filepath}/../${path.basename(filepath)}.json`;
                outfile(jsonpath, rton2json(readfilebuffer(file)));
            }
        }
    } else {
        outfile(`${parse(filepath).dir}/${parse(filepath).name.toUpperCase()}.JSON`, rton2json(readfilebuffer(filepath)));
    }
}
