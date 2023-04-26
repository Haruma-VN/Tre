"use strict";
import { createCanvas, loadImage } from "canvas";
export default async function (animation_image: any, media_path: string, image_name_by_id: boolean, texture_reslution: number) {
    let scale_ratio: number = 0;
    const texture_range: number[] = [1536, 1200, 768, 640, 384];
    if (texture_reslution != -1) {
        if (texture_range.includes(texture_reslution)) {
            scale_ratio = 1200 / texture_reslution;
        } else {
            throw new Error("Texture Reslution must be one of the following: 1536, 1200, 768, 640, 384");
        }
    } else {
        scale_ratio = texture_reslution;
    }
    const image_list: any = new Array();
    const image_canvas_list: any = new Array();
    for (let i = 0; i < animation_image.length; i++) {
        const image_name: string = image_name_by_id ? animation_image[i].name.split("|")[1] : animation_image[i].name.split("|")[0];
        const image: any = await loadImage(`${media_path}/${image_name}.png`);
        if (scale_ratio == -1) {
            const width_ratio = animation_image[i].size[0] / image.width;
            const height_ratio = animation_image[i].size[1] / image.height;
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
        const image_width: number = Math.round(image.width * scale_ratio);
        const image_height: number = Math.round(image.height * scale_ratio);
        const image_canvas: any = createCanvas(image_width, image_height);
        const image_ctx: any = image_canvas.getContext("2d");
        image_ctx.drawImage(image, 0, 0, image_width, image_height);
        image_list.push([{ image_width, image_height, matrix: animation_image[i].transform, image_name, image_resource: i, sprite_disable: false }]);
        image_canvas_list.push({ image_canvas, image_ctx });
    }
    return [image_list, image_canvas_list];
}
