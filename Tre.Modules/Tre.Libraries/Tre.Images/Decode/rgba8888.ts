"use strict";
import sharp from 'sharp';
import fs from 'fs';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string = process.argv[2], width: number = 4096, height: number = 4096) {
    console.log("Decoding: " + basename(dir) + extname(dir));
    console.log("Width: " + width);
    console.log("Height: " + height);
    const data: any = await sharp((fs.readFileSync(dir)), { raw: { width: (width), height: (height), channels: 4 } }).png().toBuffer().then((result: any) => {
        return result;
    }).catch((error) => {
        TreErrorMessage({ error: "Unknown", reason: "Recheck input data or file is not PopCap PTX file", system: error.toString() }, "Recheck input data or file is not PopCap PTX file");
    });
    return writefile(dir + '/../' + basename(dir) + '.PNG', data);
}