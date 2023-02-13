"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir:string): Promise<void> {
    const tre_thirdparty: string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
    const pvrtc_process: string = `PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "${dir}" -o "${basename(dir).toUpperCase()}.PVR"`;
    const dimension_x: { width: number; height: number } = await dimension(dir).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset: number = width * height / 2;
    console.log("Encoding: " + basename(dir) + extname(dir));
    console.log("Width: " + width);
    console.log("Height: " + height);
    try {
        await execSync(pvrtc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
    } catch (error:any) {
        TreErrorMessage({ error: `Cannot encode ${dir}`, reason: "Unknown", system: error.toString() }, `Cannot encode ${dir}`);
        return;
    }
    const originalImage = await fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.PVR`).slice(fs.readFileSync(`${tre_thirdparty}/${basename(dir).toUpperCase()}.PVR`).length - offset);
    await fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.PTX`, originalImage);
    for (let item of fs.readdirSync(tre_thirdparty)) {
        extname(item).toUpperCase() != '.EXE' ? await fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
    }
    return;
}
