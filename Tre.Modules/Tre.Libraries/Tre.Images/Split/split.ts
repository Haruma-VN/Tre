"use strict";
import { readjson } from '../../Tre.FileSystem/util.js';
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import * as color from '../../Tre.Color/color.js';
import path from 'path';
import fs from 'fs';
export interface configAtlas {
    atlas: {
        split: {
            notify_duplicate: boolean,
        }
    }
}
export default async function (dir: string, x: number, y: number, w: number, h: number, new_dir: string) {
    const json_config: configAtlas = readjson("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json");
    if (json_config.atlas.split.notify_duplicate) {
        if (fs.existsSync(new_dir)) {
            fs.unlinkSync(new_dir);
            console.log(color.yellow_string(`◉ Image ${path.parse(new_dir).name}.png already exists. Overriding...`));
        }
    }
    const proc = await sharp(dir);
    await proc.extract({ width: (w), height: (h), left: (x), top: (y) }).png({ effort: 1 }).toFile(new_dir).catch((error) => {
        TreErrorMessage({ error: "Cannot split spritesheet", reason: "Bad extract area", system: error.toString() }, "Bad extract area");
        return;
    });
    return;
};