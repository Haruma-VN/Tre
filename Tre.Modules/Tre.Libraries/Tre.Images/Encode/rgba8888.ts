"use strict";
import sharp from 'sharp';
import { basename } from '../../Tre.Basename/util.js';
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import { dimension } from '../util.js';
import localization from '../../../Tre.Callback/localization.js';
import * as color from "../../Tre.Color/color.js";
import path from "node:path";
import { delete_file } from '../../Tre.FileSystem/util.js';
import max_sharp from '../Exception/evaluate.js';
import fs_js from '../../Tre.FileSystem/implement.js';

export default async function (dir: string, not_notify_console_log: boolean = false): Promise<void> {
    const img_data: { width: number, height: number } = await dimension(dir).then((result: { width: number, height: number }) => {
        return result;
    });
    if (!not_notify_console_log) {
        console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "rgba8888");
        console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${fs_js.get_full_path(dir)}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${img_data.width}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${img_data.height}`);
    }
    max_sharp(img_data.width, img_data.height);
    delete_file(path.resolve(dir + '/../' + basename(dir) + '.ptx'));
    const data: any = await sharp(dir).raw().toBuffer().catch((error: any) => {
        TreErrorMessage({ error: localization("not_a_raw_image"), reason: localization("cannot_read_image_data"), system: error.message.toString() }, localization("cannot_read_image_data"));
    });
    fs.writeFileSync(dir + '/../' + basename(dir) + '.ptx', data);
    console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(dir + '/../' + basename(dir) + '.ptx')}`);
    return
}