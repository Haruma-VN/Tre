"use strict";
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir, x, y, w, h, new_dir) {
    const proc = await sharp(dir);
    await proc.extract({ width: parseInt(w), height: parseInt(h), left: parseInt(x), top: parseInt(y) }).toFile(new_dir).catch((error) => {
        TreErrorMessage({error: "Cannot split spritesheet", reason: "Bad extract area", system: error}, "Bad extract area");
        return;
    });
    return;
};