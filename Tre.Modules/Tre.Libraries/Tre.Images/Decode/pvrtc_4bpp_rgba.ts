"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { parse } from "node:path";
export default async function (dir: string, width: number, height: number): Promise<void> {
    console.log("Decoding: " + parse(dir).base);
    console.log("Width: " + width);
    console.log("Height: " + height);
    const tre_thirdparty:string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    let cmd:string = `PVRTexToolCLI.exe -i "${parse(dir).name}.PVR" -d "${parse(dir).dir}/${parse(dir).name.toUpperCase()}.PNG"`;
    let pvr_header:Buffer = Buffer.from('505652030000000003000000000000000100000000000000BBBBBBBBAAAAAAAA010000000100000001000000010000001000000050565203060000000400000000000000', 'hex');
    pvr_header.writeInt32LE('0x' + width.toString(16), 28);
    pvr_header.writeInt32LE('0x' + height.toString(16), 24);
    const originalImage:Buffer = Buffer.concat([pvr_header, fs.readFileSync(dir)]);
    await fs.writeFileSync(`${tre_thirdparty}${parse(dir).name}.PVR`, originalImage);
    await execSync(cmd, { cwd: tre_thirdparty, stdio: 'ignore' });
    for (let item of fs.readdirSync(tre_thirdparty)) {
        parse(item).ext.toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
    }
};
