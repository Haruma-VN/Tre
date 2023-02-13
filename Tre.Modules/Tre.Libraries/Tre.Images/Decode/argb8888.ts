"use strict";
import sharp from 'sharp';
import fs from 'fs';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string, width: number, height: number): Promise<void> {
    console.log("Decoding: " + basename(dir) + extname(dir));
    console.log("Width: " + width);
    console.log("Height: " + height);
    await sharp((fs.readFileSync(dir)), { raw: { width: (width), height: (height), channels: 4 } }).png().toBuffer().then(async (argb32) => {
        await sharp(argb32).extractChannel('blue').toBuffer().then(async blue => {
            await sharp(argb32).extractChannel('green').toBuffer().then(async green => {
                await sharp(argb32).extractChannel('red').toBuffer().then(async red => {
                    await sharp(argb32).extractChannel('alpha').toBuffer().then(async alpha => {
                        await sharp(blue).joinChannel(green).joinChannel(red).joinChannel(alpha).toBuffer().then(async image => {
                            return await writefile(dir + '/../' + basename(dir) + '.PNG', image);
                        });
                    });
                });
            });
        });
    }).catch((error) => {
        TreErrorMessage({ error: "Unknown", reason: "Recheck input data or file is not PopCap PTX file", system: error.toString() }, "Recheck input data or file is not PopCap PTX file");
    });
    return;
}
