"use strict";
import { execSync } from "node:child_process";
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from "path";
export default async function (dir: string = process.argv[2], modelname: string = 'realesrgan-x4plus-anime', ratio: number | string, new_dir?: string, is_folder: boolean = false): Promise<void> {
    try {
        await execSync('cmd /c start /b realesrgan-ncnn-vulkan.exe' +
            ' -i "' + dir + '" -o "' + new_dir + '" -n ' + modelname + ' -s ' + (ratio) + ' -f png', { cwd: 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Upscale', stdio: 'ignore' });
    } catch (error: any) {
        TreErrorMessage({ error: "Cannot upscale spritesheet", reason: "Unknown", system: error.toString() }, "Unknown bug occur with Upscaler please check debug folder for more details.");
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