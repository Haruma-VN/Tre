"use strict";
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string, x: number, y: number, w: number, h: number, new_dir: string) {
    const proc = await sharp(dir);
    await proc.extract({ width: (w), height: (h), left: (x), top: (y) }).toFile(new_dir).catch((error) => {
        TreErrorMessage({ error: "Cannot split spritesheet", reason: "Bad extract area", system: error.toString() }, "Bad extract area");
        return;
    });
    return;
};