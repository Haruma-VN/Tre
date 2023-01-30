"use strict";
import sharp from 'sharp';
import { basename } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { dimension } from '../util.js';
export default async function (dir = process.argv[2]) {
    const img_data = await dimension(dir).finally((result) => {
        return result;
    });
    console.log("Encoding: " + basename(dir) + extname(dir));
    console.log("Width: " + img_data.width);
    console.log("Height: " + img_data.height);
    const data = await sharp(dir).raw().toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read image data");
    });
    return writefile(dir + '/../' + basename(dir) + '.PTX', data);
}