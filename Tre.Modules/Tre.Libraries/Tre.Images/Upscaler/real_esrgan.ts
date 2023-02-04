"use strict";
import { execSync } from "node:child_process";
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from "path";
export default function (dir: string = process.argv[2], modelname: string = 'realesrgan-x4plus-anime', ratio: number | string, new_dir?: string) {
    try {
        execSync('cmd /c start /b realesrgan-ncnn-vulkan.exe' +
            ' -i "' + dir + '" -o "' + new_dir + '" -n ' + modelname + ' -s ' + ratio + ' -f png', { cwd: 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Upscale', stdio: 'ignore' });
    } catch (error: any) {
        TreErrorMessage({ error: "Cannot upscale spritesheet", reason: "Unknown", system: error.toString() }, "Unknown bug occur with Upscaler please check debug folder for more details.");
    }
}