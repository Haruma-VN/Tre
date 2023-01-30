"use strict";
import sharp from 'sharp';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (arg = [], dir = 'string', width = 32, height = 32) {
    const proc = await sharp({ create: { width: width, height: height, channels: 4, background: ({ r: 0, b: 0, g: 0, alpha: 0 }) } })
    await proc.composite(arg)
        .toFile(dir).catch((error) => {
            TreErrorMessage({ error: "Cannot merge sprite to atlas", reason: "Spritesheet size is bigger than atlas input arguments data", system: error }, "Spritesheet size is bigger than atlas input arguments data");
        });
    return;
};