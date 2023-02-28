"use strict";
import sharp from 'sharp';
import { basename, extname } from '../../Tre.Basename/util.js';
import { writefile } from '../../Tre.FileSystem/util.js';
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { dimension } from '../util.js';
import localization from '../../../Tre.Callback/localization.js';
import * as color from "../../Tre.Color/color.js";
import path from "node:path";
export default async function (dir:string): Promise<void> {
    const img_data: { width: number, height: number } = await dimension(dir).then((result: { width: number, height: number }) => {
        return result;
    });
    console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${img_data.width}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${img_data.height}`);
    const data: any = await sharp(dir).raw().toBuffer().catch((error) => {
        TreErrorMessage({ error: localization("not_a_raw_image"), reason: localization("cannot_read_image_data"), system: error.toString() }, localization("cannot_read_image_data"));
    });
    fs.writeFileSync(dir + '/../' + basename(dir) + '.ptx', data);
    console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(dir + '/../' + basename(dir) + '.ptx')}`);
    return
}