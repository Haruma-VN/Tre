"use strict";
import fs from 'fs-extra';
import { execSync } from 'node:child_process';
import { basename, extname, dirname } from '../../Tre.Basename/util.js';
import { dimension } from '../util.js';
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir:string): Promise<void> {
    try {
      const tre_thirdparty: string = 'C:/Tre.Vietnam/Tre.Extension/Tre.ThirdParty/Raw/';
      const etc_process: string = `etcpak.exe --etc1 "${dir}" "${dirname(dir)}/${basename(dir).toUpperCase()}.PTX"`;
      const dimension_x: { width: number, height: number } = await dimension(dir).then((result) => result).finally(() => { });
      const width: number = dimension_x.width;
      const height: number = dimension_x.height;
      const offset = width * height / 2;
      console.log("Encoding: " + basename(dir) + extname(dir));
      console.log("Width: " + width);
      console.log("Height: " + height);
      execSync(etc_process, { cwd: tre_thirdparty, stdio: 'ignore' });
      await sharp(dir).extractChannel('alpha').raw().toBuffer().then((alpha: Buffer) => {
          const originalImage = fs.readFileSync(`${dir.toUpperCase().replaceAll('.PNG', '.PTX')}`).slice(fs.readFileSync(`${dir.toUpperCase().replaceAll('.PNG', '.PTX')}`).length - offset);
          const etc_image = Buffer.concat([originalImage, alpha]);
          fs.writeFileSync(`${dirname(dir)}/${basename(dir).toUpperCase()}.PTX`, etc_image);
          for (let item of fs.readdirSync(tre_thirdparty)) {
              extname(item).toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
          }
      });
      return;
    } catch (error: any) {
        TreErrorMessage({error: "Cannot Encode PTX", reason: "Unknown", system: `Encode PTX failed for ${dir}`}, `Encode PTX failed for ${dir}`)
    }
  };
