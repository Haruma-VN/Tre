"use strict";
import { createCanvas } from "@napi-rs/canvas";
export default function decode_argb_8888(img_buf: Buffer, width: number, height: number): Buffer {
    const img_c: any = createCanvas(width, height);
    const c_ctx: any = img_c.getContext("2d");
    const canvas_data: any = c_ctx.createImageData(width, height);
    const img_pixels: Uint8ClampedArray = new Uint8ClampedArray(img_buf);
    for (let i = 0; i < img_pixels.length / 4; i++) {
        img_pixels[i * 4] = img_buf[i * 4 + 2];
        img_pixels[i * 4 + 2] = img_buf[i * 4];
    }
    canvas_data.data.set(img_pixels);
    c_ctx.putImageData(canvas_data, 0, 0);
    return img_c.toBuffer("image/png");
}
