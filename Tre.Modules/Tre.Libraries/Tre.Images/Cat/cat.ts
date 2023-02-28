"use strict";
import sharp from 'sharp';
import localization from '../../../Tre.Callback/localization.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (arg: {}[] = [], dir: string = 'string', width: number = 32, height: number = 32) {
    const proc = await sharp({ create: { width: width, height: height, channels: 4, background: ({ r: 0, b: 0, g: 0, alpha: 0 }) } })
    await proc.composite(arg)
        .toFile(dir).catch((error) => {
            TreErrorMessage({ error: localization("native_error_cannot_merge_sprite_to_atlas"), reason: localization("native_error_cannot_merge_sprite_to_atlas_reason"), system: error.toString() }, localization("native_error_cannot_merge_sprite_to_atlas_reason"));
        });
    return;
};