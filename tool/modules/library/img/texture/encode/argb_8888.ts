"use strict";
import { createCanvas, Image } from "@napi-rs/canvas";
export default function encode_argb_8888(img_buf: Buffer): Buffer {
    const img: any = new Image();
    img.src = img_buf;
    const width: number = img.width;
    const height: number = img.height;
    const img_c: any = createCanvas(width, height);
    const c_ctx: any = img_c.getContext("2d");
    c_ctx.drawImage(img, 0, 0);
    const pixels: Uint8ClampedArray = c_ctx.getImageData(0, 0, width, height).data;
    const argb_8888_pixels: Uint8ClampedArray = new Uint8ClampedArray(pixels.length);
    const count: number = pixels.length / 4;
    for (let i = 0; i < count; i++) {
        argb_8888_pixels[i * 4] = pixels[i * 4 + 2];
        argb_8888_pixels[i * 4 + 1] = pixels[i * 4 + 1];
        argb_8888_pixels[i * 4 + 2] = pixels[i * 4];
        argb_8888_pixels[i * 4 + 3] = pixels[i * 4 + 3];
    }
    return Buffer.from(argb_8888_pixels);
}
