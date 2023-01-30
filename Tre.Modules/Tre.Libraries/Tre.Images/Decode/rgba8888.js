"use strict";
import sharp from 'sharp';
import fs from 'fs';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir = process.argv[2], width = 4096, height = 4096) {
    console.log("Decoding: " + basename(dir) + extname(dir));
    console.log("Width: " + width);
    console.log("Height: " + height);
    const data = await sharp((fs.readFileSync(dir)), { raw: { width: parseInt(width), height: parseInt(height), channels: 4 } }).png().toBuffer().finally((result) => {
        return result;
    }).catch((error) => {
        TreErrorMessage({ error: "Unknown", reason: "Recheck input data or file is not PopCap PTX file", system: error }, "Recheck input data or file is not PopCap PTX file");
    });
    return writefile(dir + '/../' + basename(dir) + '.PNG', data);
}