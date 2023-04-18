"use strict";
import sharp from "sharp";
import localization from "../../../callback/localization.js";
export default async function (
    arg: {}[] = [],
    dir: string = "string",
    width: number = 32,
    height: number = 32
) {
    const proc = await sharp({
        create: {
            width: width,
            height: height,
            channels: 4,
            background: { r: 0, b: 0, g: 0, alpha: 0 },
        },
    });
    await proc
        .composite(arg)
        .toFile(dir)
        .catch((error: any) => {
            throw new Error(
                localization("native_error_cannot_merge_sprite_to_atlas_reason")
            );
        });
    return;
}
