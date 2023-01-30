"use strict";
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
export default async function (dir = process.argv[2], mode = 0) {
    const tre_thirdparty = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let image_dir = dirname(dir) + '/';
    let image_name_ptx = basename(dir) + '.ptx';
    let image_name = basename(dir) + ".pvr";
    if (fs.existsSync(image_dir + image_name_ptx)) {
        fs.unlinkSync(image_dir + image_name_ptx)
    };
    let pvrtc_bat = 'PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "' + dir + '" -o "' + image_name + '"\n';
    switch (mode) {
        case 0:
            fs.writeFileSync(tre_thirdparty + 'pvrtc.bat', pvrtc_bat, { flag: 'w' });
            break;
        default:
            fs.appendFileSync(tre_thirdparty + 'pvrtc.bat', pvrtc_bat, { flag: 'a' });
    };
    fs.appendFileSync(tre_thirdparty + 'pvrtc.bat', 'finish', { flag: 'a' });
    const dimension_x = await dimension(dir).finally((result) => result);
    await exec('pvrtc.bat', { cwd: tre_thirdparty }, (err, stdout, stderr) => {
        if (stderr == stderr) {
            let width = dimension_x.width;
            let height = dimension_x.height;
            let offset = width * height / 2;
            let image_dir = dirname(dir) + '/';
            let image_name = basename(dir);
            let image_pvrtc = image_dir + image_name;
            let pvrtc_raw = tre_thirdparty + image_name + '.pvr';
            let originalImage = fs.readFileSync(pvrtc_raw).slice(fs.readFileSync(pvrtc_raw).length - offset);
            fs.writeFileSync(image_pvrtc + '.PTX', originalImage, { flag: 'w' });
            fs.unlinkSync(pvrtc_raw);
            let clear_temp = fs.readdirSync(tre_thirdparty);
            for (let temp of clear_temp) {
                let temp_ext = extname(temp).toUpperCase();
                if (temp_ext != '.EXE') {
                    fs.unlinkSync(tre_thirdparty + temp);
                };
            }

        }
    });
    return 0;
}