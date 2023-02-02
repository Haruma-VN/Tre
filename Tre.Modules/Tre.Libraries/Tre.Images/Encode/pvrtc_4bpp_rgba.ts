"use strict";
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
export default async function (dir: string = process.argv[2], mode: number = 0): Promise<void> {
    const tre_thirdparty: string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let image_dir: string = dirname(dir) + '/';
    let image_name_ptx: string = basename(dir) + '.ptx';
    let image_name: string = basename(dir) + ".pvr";
    if (fs.existsSync(image_dir + image_name_ptx)) {
        fs.unlinkSync(image_dir + image_name_ptx)
    };
    let pvrtc_bat: string = 'PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "' + dir + '" -o "' + image_name + '"\n';
    switch (mode) {
        case 0:
            fs.writeFileSync(tre_thirdparty + 'pvrtc.bat', pvrtc_bat, { flag: 'w' });
            break;
        default:
            fs.appendFileSync(tre_thirdparty + 'pvrtc.bat', pvrtc_bat, { flag: 'a' });
    };
    fs.appendFileSync(tre_thirdparty + 'pvrtc.bat', 'finish', { flag: 'a' });
    const dimension_x: { width: number, height: number } = await dimension(dir).then((result: { width: number, height: number }) => result);
    await exec('pvrtc.bat', { cwd: tre_thirdparty }, (err, stdout, stderr) => {
        if (stderr == stderr) {
            let width: number = dimension_x.width;
            let height: number = dimension_x.height;
            let offset: number = width * height / 2;
            let image_dir: string = dirname(dir) + '/';
            let image_name: string = basename(dir);
            let image_pvrtc: string = image_dir + image_name;
            let pvrtc_raw: string = tre_thirdparty + image_name + '.pvr';
            let originalImage: any = fs.readFileSync(pvrtc_raw).slice(fs.readFileSync(pvrtc_raw).length - offset);
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
    return;
}