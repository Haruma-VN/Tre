"use strict";
import { resize, real_esrgan, calculate, upscale_data } from '../../../library/img/util.js';
import { read_single_folder, readjson, writefile, makefolder, writejson } from '../../../library/fs/util.js';
import path from 'path';
import localization from '../../../callback/localization.js';
import * as color from "../../../library/color/color.js";

export interface AtlasInfo {
    subgroup: string,
    groups: { id: string, path: string[], x: number, y: number }[],
}

export default async function (dir: string, orig: number, mod: number): Promise<string> {
    const files_process: string[] = read_single_folder(dir);
    let atlasinfo: any;
    let calculator: number = calculate(orig, mod);
    const new_set_entry_point: string = `${dir}/../${path.parse(dir).name.replace(`_${orig.toString()}`, `_${mod.toString()}`)}.spg`;
    let upscaler_model_default: string = (parseInt(calculator.toString()) === 4) ? "realesrgan-x4plus-anime" : "realesr-animevideov3";
    makefolder(new_set_entry_point);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(`${new_set_entry_point}`)}`);
    let check_if_atlas_info_is_located: boolean = false;
    for (let i: number = 0; i < files_process.length; ++i) {
        if (path.extname(`${dir}/${files_process[i]}`).toLowerCase() === '.json') {
            if (path.parse(`${dir}/${files_process[i]}`).name.toLowerCase() == 'atlasinfo') {
                atlasinfo = readjson(`${dir}/${files_process[i]}`);
                atlasinfo = upscale_data(calculator, atlasinfo, orig, mod);
                writejson(`${new_set_entry_point}/AtlasInfo.json`, atlasinfo);
                check_if_atlas_info_is_located = true;
            }
            else {
                continue;
            };
        }
        else if (path.extname(`${dir}/${files_process[i]}`).toLowerCase() === '.png') {
            if (calculator >= 1) {
                await resize(`${dir}/${files_process[i]}`, orig, mod, `${new_set_entry_point}/${files_process[i]}`).finally(() => { });
            }
            else {
                await real_esrgan(`${dir}`, upscaler_model_default, parseInt((1 / calculator).toString()), `${new_set_entry_point}`);
                if (check_if_atlas_info_is_located) {
                    break;
                }
            }
        }
        else {
            continue;
        }
    }
    return new_set_entry_point;
}