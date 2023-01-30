"use strict";
import sharp from 'sharp';
import { basename, extname } from '../../Tre.Basename/util.js';
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
    const blue = await sharp(dir).extractChannel('blue').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read blue image data");
    });
    const green = await sharp(dir).extractChannel('green').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read green image data");
    });
    const red = await sharp(dir).extractChannel('red').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read red image data");
    });
    const alpha = await sharp(dir).extractChannel('alpha').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read alpha image data");
    });
    const data = await sharp(blue).joinChannel(green).joinChannel(red).joinChannel(alpha).raw().toBuffer().finally(result => {
        return result;
    }).catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error }, "Cannot read image data");
    });
    return writefile(dir + '/../' + basename(dir) + '.ptx', data);
};