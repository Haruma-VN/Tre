"use strict";
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import sharp from 'sharp';
import * as color from "../../Tre.Color/color.js";
import localization from '../../../Tre.Callback/localization.js';
import path from 'node:path';
import { delete_file } from '../../Tre.FileSystem/util.js';
import exception_encode_dimension from '../Exception/encode.js';
import fs_js from '../../Tre.FileSystem/implement.js';

export default async function (dir: string, not_notify_console_log: boolean = false): Promise<void> {
    const tre_thirdparty: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
    const etc_process: string = `etcpak.exe --etc1 "${dir}" "${dirname(dir)}/${basename(dir).toUpperCase()}.ptx"`;
    const dimension_x: { width: number, height: number } = await dimension(dir).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset = width * height / 2;
    if (!not_notify_console_log) {
        console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "rgb_etc1_a_8");
        console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${fs_js.get_full_path(dir)}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    }
    const exception_try: boolean = exception_encode_dimension(width, height);
    if (exception_try && fs_js.check_etcpak()) {
        delete_file(path.resolve(dir + '/../' + basename(dir) + '.ptx'));
        execSync(etc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
        await sharp(dir).extractChannel('alpha').raw().toBuffer().then((alpha: Buffer) => {
            const originalImage = fs.readFileSync(`${dir.toUpperCase().replace('.PNG', '.ptx')}`).slice(fs.readFileSync(`${dir.toUpperCase().replace('.PNG', '.ptx')}`).length - offset);
            const etc_image = Buffer.concat([originalImage, alpha]);
            fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`, etc_image);
            if (!not_notify_console_log) {
                console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(dir + '/../' + basename(dir) + '.ptx')}`);
            }
            for (let item of fs.readdirSync(tre_thirdparty)) {
                extname(item).toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
            }
        });
        return
    }
}
