"use strict";
import sharp from 'sharp';
import fs from 'fs';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string, width:number, height:number): Promise<void> {
    console.log("Decoding: " + basename(dir) + extname(dir));
    console.log("Width: " + width);
    console.log("Height: " + height);
    const data = await sharp((fs.readFileSync(dir)), { raw: { width: (width), height: (height), channels: 4 } }).png().toBuffer().then((result) => {
        return result;
    }).catch((error) => {
        TreErrorMessage({ error: "Unknown", reason: "Recheck input data or file is not PopCap PTX file", system: error.toString() }, "Recheck input data or file is not PopCap PTX file");
    });
    if(data){
        return writefile(dir + '/../' + basename(dir) + '.png', data);
    }
    return;
}
