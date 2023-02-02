"use strict";
import fs from 'node:fs';
import { exec } from 'node:child_process';
import path from "node:path";
import sharp from 'sharp';
import { basename } from '../../Tre.Basename/util.js';
export default async function (dir: string = process.argv[2], width: number = 4096, height: number = 4096): Promise<void> {
    const tre_thirdparty: string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let image_dir: string = path.dirname(dir) + '/';
    let image_name: string = path.basename(dir).toUpperCase();
    var pvr_header: Buffer = Buffer.from('505652030000000006000000000000000000000000000000BBBBBBBBAAAAAAAA0100000001000000010000000100000000000000', 'hex');
    pvr_header.writeInt32LE('0x' + width.toString(16), 28);
    pvr_header.writeInt32LE('0x' + height.toString(16), 24);
    const etc1_image = fs.readFileSync(dir);
    const originalImage = Buffer.concat([pvr_header, etc1_image]);
    fs.writeFileSync(tre_thirdparty + image_name, originalImage);
    let cmd = 'etcpak.exe --etc1 -v "' + image_name + '" "' + basename(image_name) + ".png" + '"';
    await exec(cmd, { cwd: tre_thirdparty }, (err, stdout, stderr) => {
        if (stdout == stdout) {
            let alpha_channel = fs.readFileSync(dir).slice(width * height / 2);
            sharp(tre_thirdparty + basename(image_name) + ".png").removeAlpha().toBuffer().then(less_alpha => {
                sharp(alpha_channel, { raw: { width: width, height: height, channels: 1 } }).png().toBuffer().then(alpha => {
                    sharp(less_alpha).joinChannel(alpha).toFile(image_dir + basename(image_name) + ".png");
                    let clear_temp = fs.readdirSync(tre_thirdparty);
                    for (let temp of clear_temp) {
                        let temp_ext = path.extname(temp).toUpperCase();
                        if (temp_ext != '.EXE') {
                            fs.unlinkSync(tre_thirdparty + temp);
                        };
                    };
                });
            });
        };
    });
};