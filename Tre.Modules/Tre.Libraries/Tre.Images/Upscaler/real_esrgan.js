"use strict";
import { exec } from "node:child_process";
import fs from 'node:fs';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from "path";
import upscale_data from "./upscale_data.js";
import parser from "../../Tre.JSONSystem/parser.js";
export default function (dir = process.argv[2], modelname = 'realesrgan-x4plus-anime', ratio) {
    const file_input = dir;
    var file_ouput = path.dirname(file_input) + '/' + path.basename(file_input).replace('.PNG', '').replace('.JPG', '').replace('.png', '').replace('.jpg', '');
    if (path.extname(path.basename(file_input)).toUpperCase() == '.PNG' || path.extname(path.basename(file_input)).toUpperCase() == '.JPG') {
        file_ouput = file_ouput + '_Upscale_x' + ratio.toString() + '.png'
    }
    else {
        file_ouput = file_ouput + '_Upscale_x' + ratio.toString()
        if (!fs.existsSync(file_ouput)) {
            fs.mkdirSync(file_ouput);
            if (fs.existsSync(file_input + '/AtlasInfo.json')) {
                fs.writeFileSync(file_ouput + '/AtlasInfo.json', upscale_data(ratio, parser(fs.readFileSync(file_input + '/AtlasInfo.json'))));
            }
        };
    };
    exec('realesrgan-ncnn-vulkan.exe' + 
    ' -i "' + file_input + '" -o "' + file_ouput + '" -n ' + modelname + ' -s ' + ratio + ' -f png', { cwd: 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Upscale' }, (error, stdout, stderr) => {
        if (error) throw error
        })
}