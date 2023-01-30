"use strict";
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import sharp from 'sharp';
export default async function (dir = process.argv[2], mode = 0) {
    const tre_thirdparty = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let etc_bat = 'etcpak.exe --etc1 "' + dirname(dir) + '/' + basename(dir) + extname(dir) + '" "' + dirname(dir) + '/' + basename(dir) + '.ptx' + '"\n';
    switch (mode) {
        case 0:
            fs.writeFileSync(tre_thirdparty + 'etc1.bat', etc_bat, { flag: 'w' });
            break;
        default:
            fs.appendFileSync(tre_thirdparty + 'etc1.bat', etc_bat, { flag: 'a' });
    };
    fs.appendFileSync(tre_thirdparty + 'etc1.bat', 'finish', { flag: 'a' });
    const dimension_x = await dimension(dir).finally((result) => result);
    await exec('etc1.bat', { cwd: tre_thirdparty }, (err, stdout, stderr) => {
        if (stderr) {
            let width = dimension_x.width;
            let height = dimension_x.height;
            let offset = width * height / 2;
            let image_dir = dirname(dir) + '/';
            let image_name = basename(dir) + '.ptx';
            let image_etc = image_dir + image_name;
            sharp(dir).extractChannel('alpha').raw().toBuffer().then(alpha => {
                let originalImage = fs.readFileSync(image_etc).slice(fs.readFileSync(image_etc).length - offset);
                let etc_image = Buffer.concat([originalImage, alpha]);
                fs.writeFileSync(image_etc, etc_image);
                let clear_temp = fs.readdirSync(tre_thirdparty);
                for (let temp of clear_temp) {
                    let temp_ext = extname(temp).toUpperCase();
                    if (temp_ext != '.EXE') {
                        fs.unlinkSync(tre_thirdparty + temp);
                    }
                }
            })
        }
    });
    return;
}