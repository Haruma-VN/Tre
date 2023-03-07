"use strict";
import { execSync } from "node:child_process";
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from "path";
import localization from "../../../Tre.Callback/localization.js";
export default async function (dir: string = process.argv[2], modelname: string = 'realesrgan-x4plus-anime', ratio: number | string, new_dir?: string, is_folder: boolean = false): Promise<void> {
    try {
        await execSync('cmd /c start /b realesrgan-ncnn-vulkan.exe' +
            ' -i "' + dir + '" -o "' + new_dir + '" -n ' + modelname + ' -s ' + (ratio) + ' -f png', { cwd: process.cwd() + '/Tre.Extension/Tre.ThirdParty/Upscale', stdio: 'ignore' });
    } catch (error: any) {
        TreErrorMessage({ error: localization("cannot_upscale_spritesheet"), reason: localization("error"), system: error.message.toString() }, localization("local_bug_check_debug_folder"));
    }
    if (new_dir != undefined) {
        if (is_folder) {
            fs.readdirSync(new_dir).forEach((item) => {
                while (!fs.existsSync(`${new_dir}/${item}`)) {
                    continue;
                };
                return;
            })
        }
        else {
            while (!fs.existsSync(new_dir)) {
                continue;
            };
        }
        return;
    }
}