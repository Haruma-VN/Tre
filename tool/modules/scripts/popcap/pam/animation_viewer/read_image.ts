"use strict";
import { createCanvas, loadImage } from "canvas";
export default async function (
    pam_image: any,
    media_path: string,
    image_name_by_id: boolean,
    texture_reslution: number
) {
    let scale_ratio = 0;
    const texture_range: number[] = [1536, 1200, 768, 640, 384];
    if (texture_reslution !== -1) {
        if (texture_range.includes(texture_reslution)) {
            scale_ratio = 1200 / texture_reslution;
        } else {
            throw new Error(
                "Texture Reslution must be one of the following: 1536, 1200, 768, 640, 384"
            );
        }
    } else {
        scale_ratio = texture_reslution;
    }
    const image_list = new Array();
    for (let i = 0; i < pam_image.length; i++) {
        const image_name = image_name_by_id
            ? pam_image[i].name.split("|")[1]
            : pam_image[i].name.split("|")[0];
        const image = await loadImage(`${media_path}/${image_name}.png`);
        if (scale_ratio === -1) {
            const width_ratio = pam_image[i].size[0] / image.width;
            const height_ratio = pam_image[i].size[1] / image.height;
            const square_ratio = width_ratio * height_ratio;
            const s_min = texture_range.reduce(
                (min: any, texture: any) => {
                    const s = Math.pow(1200 / texture, 2) - square_ratio;
                    return s < min.value ? { value: s, texture: texture } : min;
                },
                { value: Infinity, texture: null }
            );
            texture_reslution = s_min.texture;
            scale_ratio = 1200 / texture_reslution;
        }
        const imgWidth = Math.round(image.width * scale_ratio);
        const imgHeight = Math.round(image.height * scale_ratio);
        const canvas = createCanvas(imgWidth, imgHeight);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight);
        const data = canvas.toBuffer();
        image_list.push([
            {
                data,
                imgWidth,
                imgHeight,
                matrix: pam_image[i].transform,
                image_name,
            },
        ]);
    }
    return image_list;
}
