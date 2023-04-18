"use strict";
import sharp from "sharp";
import fs from "fs";
export default async function (
    dir: string,
    width: number | string,
    height: number | string,
    new_dir: string
) {
    width = typeof width === "string" ? parseInt(width) : width;
    height = typeof height === "string" ? parseInt(height) : height;
    const images = await sharp(dir);
    await images
        .resize(width, height)
        .toBuffer()
        .then((buffer) => fs.writeFileSync(new_dir, buffer));
    return;
}
