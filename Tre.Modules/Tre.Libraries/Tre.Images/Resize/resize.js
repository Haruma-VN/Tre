"use strict";
import sharp from 'sharp';
export default async function (dir, width, height, new_dir) {
    const images = await sharp(dir);
    await images.resize(parseInt(width), parseInt(height))
        .toFile(new_dir);
    return
}