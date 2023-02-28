"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import localization from '../../../Tre.Callback/localization.js';
import * as color from "../../Tre.Color/color.js";
import path from "node:path";
export default async function (dir: string): Promise<void> {
    const tre_thirdparty: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
    const pvrtc_process: string = `PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "${dir}" -o "${basename(dir).toUpperCase()}.pvr"`;
    const dimension_x: { width: number; height: number } = await dimension(dir).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset: number = width * height / 2;
    console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    try {
        await execSync(pvrtc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
    } catch (error: any) {
        TreErrorMessage({ error: localization("cannot_encode_ptx"), reason: localization("unknown"), system: error.toString() }, `${localization("cannot_encode_ptx")} ${dir}`);
        return;
    }
    const originalImage = await fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.pvr`).slice(fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.pvr`).length - offset);
    await fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`, originalImage);
    console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`)}`);
    for (let item of fs.readdirSync(tre_thirdparty)) {
        extname(item).toUpperCase() != '.EXE' ? await fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
    }
    return;
}
