"use strict";
import { execSync } from "node:child_process";
import fs from 'node:fs';
import localization from "../../../Tre.Callback/localization.js";
import fs_js from "../../Tre.FileSystem/implement.js";

export default async function (dir: string = process.argv[2], modelname: string = 'realesrgan-x4plus-anime', ratio: number | string, new_dir?: string, is_folder: boolean = false): Promise<void> {
    const real_esrgan_exists = fs_js.check_real_esrgan();
    if (real_esrgan_exists) {
        try {
            await execSync('cmd /c start /b realesrgan-ncnn-vulkan.exe' +
                ' -i "' + dir + '" -o "' + new_dir + '" -n ' + modelname + ' -s ' + (ratio) + ' -f png', { cwd: process.cwd() + '/Tre.Extension/Tre.ThirdParty/Upscale', stdio: 'ignore' });
        } catch (error: any) {
            throw new Error(localization("local_bug_check_debug_folder"));
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
}