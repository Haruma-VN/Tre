"use strict";
import sharp from 'sharp';
import { basename, extname } from '../../Tre.Basename/util.js';
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { dimension } from '../util.js';
export default async function (dir: string = process.argv[2]): Promise<void> {
    const img_data: {width: number, height: number} = await dimension(dir).then((result: {width: number, height: number}) => {
        return result;
    });
    console.log("Encoding: " + basename(dir) + extname(dir));
    console.log("Width: " + img_data.width);
    console.log("Height: " + img_data.height);
    const blue = await sharp(dir).extractChannel('blue').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read blue image data");
    });
    const green = await sharp(dir).extractChannel('green').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read green image data");
    });
    const red = await sharp(dir).extractChannel('red').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read red image data");
    });
    const alpha = await sharp(dir).extractChannel('alpha').toBuffer().catch((error) => {
        TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read alpha image data");
    });
    if (typeof blue === 'object' && typeof green === 'object' && typeof red === 'object' && typeof alpha === 'object') {
        const data: any = await sharp(blue).joinChannel(green).joinChannel(red).joinChannel(alpha).raw().toBuffer().then((result: ArrayBuffer) => {
            return result;
        }).catch((error) => {
            TreErrorMessage({ error: "Not a raw image file", reason: "Cannot read image data", system: error.toString() }, "Cannot read image data");
        });
        fs.writeFileSync(dir + '/../' + basename(dir) + '.ptx', data);
    }
    return;
};