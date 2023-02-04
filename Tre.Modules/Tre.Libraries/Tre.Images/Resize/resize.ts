"use strict";
import sharp from 'sharp';
export default async function (dir: string, width: number | string, height: number | string, new_dir: string) {
    width = (typeof width === 'string') ? parseInt(width) : width;
    height = (typeof height === 'string') ? parseInt(height) : height;
    const images = await sharp(dir);
    await images.resize((width), (height)).png({effort: 1})
        .toFile(new_dir);
    return
}