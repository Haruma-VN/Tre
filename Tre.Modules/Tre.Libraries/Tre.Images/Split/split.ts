"use strict";
import { readjson } from '../../Tre.FileSystem/util.js';
import sharp from 'sharp';
import localization from '../../../Tre.Callback/localization.js';
import * as color from '../../Tre.Color/color.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string, x: number, y: number, w: number, h: number, new_dir: string, name: string, extension_list: string[]) {
    const json_config:any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", true) ;
    if (json_config.atlas.split.notify_duplicate) {
        for (let extension of extension_list) {
            if (name == extension) {
                console.log(color.yellow_string(`◉ ${localization("execution_warning")}: ${name} ${localization("is_duplicated")}`));
                break;
            }
        }
    };
    extension_list.push(name)
    let data = new Array();
    data.push(extension_list);
    data.push(sharp(dir).extract({ width: (w), height: (h), left: (x), top: (y) }).toFile(new_dir).catch((error: any) => {
        TreErrorMessage({ error: localization("cannot_split_spritesheet"), reason: localization("bad_extract_area"), system: error.message.toString() }, localization("bad_extract_area"));
        return;
    }));
    return data;
}
