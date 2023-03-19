"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../extension/util.js';
import { dimension } from '../util.js';
import localization from '../../../callback/localization.js';
import * as color from "../../color/color.js";
import path from "node:path";
import { delete_file } from '../../fs/util.js';
import exception_encode_dimension from '../exception/encode.js';
import fs_js from '../../fs/implement.js';

export default async function (dir: string, not_notify_console_log: boolean = false): Promise<void> {
    const tre_thirdparty: string = process.cwd() + "/extension/third/encode/";
    const pvrtc_process: string = `PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "${dir}" -o "${basename(dir).toUpperCase()}.pvr"`;
    const dimension_x: { width: number; height: number } = await dimension(dir).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset: number = width * height / 2;
    if (!not_notify_console_log) {
        console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "rgb_pvrtc4_a_8");
        console.log(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(dir)}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    }
    const get_exception: boolean = exception_encode_dimension(width, height);
    if (get_exception && fs_js.check_pvrtc()) {
        delete_file(path.resolve(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`));
        try {
            await execSync(pvrtc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
        } catch (error: any) {
            throw new Error(`${localization("cannot_encode_ptx")} ${dir}`);
        }
        const originalImage = await fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.pvr`).slice(fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.pvr`).length - offset);
        await fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`, originalImage);
        if (!not_notify_console_log) {
            console.log(color.fggreen_string(`◉ ${localization("execution_out")}:\n     `) + `${path.resolve(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`)}`);
        }
        for (let item of fs.readdirSync(tre_thirdparty)) {
            extname(item).toUpperCase() != '.EXE' ? await fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
        }
    }
    return;
}
