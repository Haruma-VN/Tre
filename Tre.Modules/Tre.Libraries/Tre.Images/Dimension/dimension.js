"use strict";
import sharp from 'sharp';
export default async function (file) {
    const image = await sharp(file);
    const metadata = await image.metadata();
    return {
        width: metadata.width, height: metadata.height
    }
};
