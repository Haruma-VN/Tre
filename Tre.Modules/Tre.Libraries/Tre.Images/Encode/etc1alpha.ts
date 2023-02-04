"use strict";
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import sharp from 'sharp';
export default async function (dir: string = process.argv[2], mode: number = 0): Promise<void> {
    const tre_thirdparty: string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let etc_bat: string = 'etcpak.exe --etc1 "' + dirname(dir) + '/' + basename(dir) + extname(dir) + '" "' + dirname(dir) + '/' + basename(dir) + '.ptx' + '"\n';
    switch (mode) {
        case 0:
            fs.writeFileSync(tre_thirdparty + 'etc1.bat', etc_bat, { flag: 'w' });
            break;
        default:
            fs.appendFileSync(tre_thirdparty + 'etc1.bat', etc_bat, { flag: 'a' });
    };
    fs.appendFileSync(tre_thirdparty + 'etc1.bat', 'finish', { flag: 'a' });
    const dimension_x: { width: number, height: number } = await dimension(dir).then((result: { width: number, height: number }) => result).finally(()=>{});
    await console.log("Encoding: " + basename(dir) + extname(dir));
    await console.log("Width: " + dimension_x.width);
    await console.log("Height: " + dimension_x.height);
    await exec('etc1.bat', { cwd: tre_thirdparty }, async (err, stdout, stderr) => {
        if (stderr) {
            let width: number = await dimension_x.width;
            let height: number = await dimension_x.height;
            let offset: number = width * height / 2;
            let image_dir: string = dirname(dir) + '/';
            let image_name: string = basename(dir) + '.ptx';
            let image_etc: string = image_dir + image_name;
            await sharp(dir).extractChannel('alpha').raw().toBuffer().then(async alpha => {
                let originalImage: any = await fs.readFileSync(image_etc).slice(fs.readFileSync(image_etc).length - offset);
                let etc_image: any = Buffer.concat([originalImage, alpha]);
                await fs.writeFileSync(image_etc, etc_image);
                let clear_temp = await fs.readdirSync(tre_thirdparty);
                for (let temp of clear_temp) {
                    let temp_ext = extname(temp).toUpperCase();
                    if (temp_ext != '.EXE') {
                        await fs.unlinkSync(tre_thirdparty + temp);
                        return;
                    }
                }
            })
        }
    });
}