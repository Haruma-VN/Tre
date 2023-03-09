"use strict";
import sharp from 'sharp';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile, readfilebuffer } from '../../Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import * as color from "../../Tre.Color/color.js";
import localization from '../../../Tre.Callback/localization.js';
import path from 'node:path';
import { delete_file } from '../../Tre.FileSystem/util.js';

export default async function (dir: string, width: number, height: number): Promise<void> {
    console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "argb8888");
    console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    delete_file(dir + '/../' + basename(dir) + '.png');
    await sharp(readfilebuffer(dir), { raw: { width: (width), height: (height), channels: 4 } }).png().toBuffer().then(async (argb32) => {
        await sharp(argb32).extractChannel('blue').toBuffer().then(async (blue) => {
            await sharp(argb32).extractChannel('green').toBuffer().then(async (green) => {
                await sharp(argb32).extractChannel('red').toBuffer().then(async (red) => {
                    await sharp(argb32).extractChannel('alpha').toBuffer().then(async (alpha) => {
                        await sharp(blue).joinChannel(green).joinChannel(red).joinChannel(alpha).toBuffer().then(async (image) => {
                            console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(dir + '/../' + basename(dir) + '.png')}`);
                            return await writefile(dir + '/../' + basename(dir) + '.png', image);
                        });
                    });
                });
            });
        });
    }).catch((error: any) => {
        TreErrorMessage({ error: localization("unknown"), reason: localization("popcap_ptx_decode_native_error"), system: error.message.toString() }, localization("popcap_ptx_decode_native_error"));
    });
    return;
}
