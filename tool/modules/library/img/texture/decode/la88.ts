"use strict";
import { createCanvas } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
export default function decode_la88(img_buf: Buffer, width: number, height: number): Buffer {
    const img_b: any = SmartBuffer.fromBuffer(img_buf);
    const img_c: any = createCanvas(width, height);
    const c_ctx: any = img_c.getContext("2d");
    const canvas_data: any = c_ctx.createImageData(width, height);
    const img_pixels: Uint8ClampedArray = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < img_pixels.length / 4; i++) {
        let temp: number = img_b.readUInt16LE();
        let l: number = (temp >> 8);
        img_pixels[i * 4] = l;
        img_pixels[i * 4 + 1] = l;
        img_pixels[i * 4 + 2] = l;
        img_pixels[i * 4 + 3] = temp & 0xFF;
    }
    canvas_data.data.set(img_pixels);
    c_ctx.putImageData(canvas_data, 0, 0);
    return img_c.toBuffer("image/png");
}
