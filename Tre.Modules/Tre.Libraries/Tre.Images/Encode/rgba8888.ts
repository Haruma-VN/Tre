"use strict";
import sharp from 'sharp';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { dimension } from '../util.js';
export default async function (dir: string = process.argv[2]): Promise<void> {
    const img_data: { width: number, height: number } = await dimension(dir).then((result: { width: number, height: number }) => {
        return result;
    });
    console.log("Encoding: " + basename(dir) + extname(dir));
    console.log("Width: " + img_data.width);
    console.log("Height: " + img_data.height);
    const data: any = await sharp(dir).raw().toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read image data");
    });
    fs.writeFileSync(dir + '/../' + basename(dir) + '.PTX', data);
    return
}