"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { parse, resolve } from "node:path";
import * as color from "../../Tre.Color/color.js";
import localization from '../../../Tre.Callback/localization.js';
import { basename, extname } from '../../Tre.Basename/util.js';
export default async function (dir: string, width: number, height: number): Promise<void> {
    console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    const tre_thirdparty = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
    let cmd = `PVRTexToolCLI.exe -i "${parse(dir).name}.pvr" -d "${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png"`;
    let pvr_header:any = Buffer.from('505652030000000003000000000000000100000000000000BBBBBBBBAAAAAAAA010000000100000001000000010000001000000050565203060000000400000000000000', 'hex');
    pvr_header.writeInt32LE('0x' + width.toString(16), 28);
    pvr_header.writeInt32LE('0x' + height.toString(16), 24);
    const originalImage = Buffer.concat([pvr_header, fs.readFileSync(dir)]);
    fs.writeFileSync(`${tre_thirdparty}${parse(dir).name}.pvr`, originalImage);
    console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${resolve(`${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`)}`);
    execSync(cmd, { cwd: tre_thirdparty, stdio: 'ignore' });
    for (let item of fs.readdirSync(tre_thirdparty)) {
        parse(item).ext.toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
    }
}
;
