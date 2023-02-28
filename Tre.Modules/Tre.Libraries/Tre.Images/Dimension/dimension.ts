"use strict";
import sharp from 'sharp';
interface DimensionX {
    width: number,
    height: number,
}
export default async function (file: any): Promise<DimensionX> {
    const image = await sharp(file);
    const metadata = await image.metadata();
    if (metadata.width != undefined && metadata.height != undefined) {
        return {
            width: metadata.width, height: metadata.height
        }
    }
    else{
        return {
            width: 0, height: 0
        }
    }
};
