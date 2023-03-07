"use strict";
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import * as color from "../../Tre.Color/color.js";
import localization from '../../../Tre.Callback/localization.js';
import path from 'node:path';

export default async function (dir: string): Promise<void> {
    try {
        const tre_thirdparty: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
        const etc_process: string = `etcpak.exe --etc1 "${dir}" "${dirname(dir)}/${basename(dir).toUpperCase()}.ptx"`;
        const dimension_x: { width: number, height: number } = await dimension(dir).then((result) => result);
        const width: number = dimension_x.width;
        const height: number = dimension_x.height;
        const offset: number = width * height / 2;
        console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "rgb_etc1_a_palette");
        console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
        console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
        execSync(etc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
        await sharp(dir).extractChannel('alpha').raw().toBuffer().then((pixels) => {
            const originalImage: Buffer = fs.readFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`);
            const etc1Image: Buffer = originalImage.slice(originalImage.length - offset);
            let square: number = width * height;
            const odd: boolean = ((square & 177) === 1);
            const alpha_palette: Array<any> = new Array();
            alpha_palette.push(0x10)
            square >>= 1;
            let AlphaSize: number = square + 17;
            for (let i: number = 0; i < 16; i++) {
                alpha_palette.push(i);
            };
            for (let i: number = 0; i < square; i++) {
                alpha_palette.push((pixels[i << 1] & 0b11110000) | (pixels[(i << 1) | 1] >> 4));
            }
            if (odd) {
                AlphaSize++
                alpha_palette.push((pixels[square << 1] & 0b11110000));
            }
            const etc_image: Buffer = Buffer.concat([etc1Image, Buffer.from(alpha_palette)]);
            fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.ptx`, etc_image);
            console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(dir + '/../' + basename(dir) + '.ptx')}`);
            for (let item of fs.readdirSync(tre_thirdparty)) {
                extname(item).toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
            }
        });
    }
    catch (error: any) {
        TreErrorMessage({ error: localization("cannot_encode_ptx"), reason: localization("unknown"), system: error.message.toString() }, `${localization("cannot_encode_ptx")} ${dir}`);
    }
}