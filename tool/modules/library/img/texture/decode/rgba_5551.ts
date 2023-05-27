"use strict";
import { createCanvas } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
export default function decode_rgba_5551(img_buf: Buffer, width: number, height: number): Buffer {
    const img_b: any = SmartBuffer.fromBuffer(img_buf);
    const img_c: any = createCanvas(width, height);
    const c_ctx: any = img_c.getContext("2d");
    const canvas_data: any = c_ctx.createImageData(width, height);
    const img_pixels: Uint8ClampedArray = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < img_pixels.length / 4; i++) {
        let temp: number = img_b.readUInt16LE();
        let r: number = (temp & 0xF800) >> 11;
        let g: number = (temp & 0x7C0) >> 6;
        let b: number = (temp & 0x3E) >> 1;
        img_pixels[i * 4] = (r << 3) | (r >> 2);
        img_pixels[i * 4 + 1] = (g << 3) | (g >> 2);
        img_pixels[i * 4 + 2] = (b << 3) | (b >> 2);
        img_pixels[i * 4 + 3] = ((temp & 0x1) == 0 ? 0 : 255);
    }
    canvas_data.data.set(img_pixels);
    c_ctx.putImageData(canvas_data, 0, 0);
    return img_c.toBuffer("image/png");
}
