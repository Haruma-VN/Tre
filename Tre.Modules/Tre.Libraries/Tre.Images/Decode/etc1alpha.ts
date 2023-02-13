"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { parse } from "node:path";
import sharp from 'sharp';
export default async function (dir:string, width:number, height:number) {
    console.log("Decoding: " + parse(dir).base);
    console.log("Width: " + width);
    console.log("Height: " + height);
    const tre_thirdparty:string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let cmd:string = `etcpak.exe --etc1 -v "${parse(dir).base}" "${parse(dir).name.toUpperCase()}.PNG"`;
    var pvr_header:Buffer = Buffer.from('505652030000000006000000000000000000000000000000BBBBBBBBAAAAAAAA0100000001000000010000000100000000000000', 'hex');
    pvr_header.writeInt32LE('0x' + width.toString(16), 28);
    pvr_header.writeInt32LE('0x' + height.toString(16), 24);
    const originalImage = Buffer.concat([pvr_header, fs.readFileSync(dir)]);
    await fs.writeFileSync(`${tre_thirdparty}${parse(dir).base}`, originalImage);
    await execSync(cmd, { cwd: tre_thirdparty, stdio: 'ignore' });
    await sharp(`${tre_thirdparty}${parse(dir).name.toUpperCase()}.PNG`).removeAlpha().toBuffer().then(async slice_alpha => {
        await sharp(fs.readFileSync(dir).slice(width * height / 2), { raw: { width: width, height: height, channels: 1 } }).png().toBuffer().then(async alpha => {
            await sharp(slice_alpha).joinChannel(alpha).toFile(`${parse(dir).dir}/${parse(dir).name.toUpperCase()}.PNG`);
            for (let item of fs.readdirSync(tre_thirdparty)) {
                await parse(item).ext.toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
            }
        });
    });
};
