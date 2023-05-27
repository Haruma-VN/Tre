"use strict";
import { createCanvas } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
import ETC1 from "../compression_coder/etc1.js";
export default function decode_etc1_rgb_a8(img_buf: Buffer, width: number, height: number): Buffer {
    const image_b: any = SmartBuffer.fromBuffer(img_buf);
    let sz: boolean = false;
    let new_width = width;
    let new_height = height;
    if (new_width % 4 != 0) {
        new_width += 4 - (new_width % 4);
        sz = true;
    }
    if (new_height % 4 != 0) {
        new_height += 4 - (new_height % 4);
        sz = true;
    }
    let img_pixels: Uint8ClampedArray = new Uint8ClampedArray(new_width * new_height * 4);
    let color_buffer: Uint8ClampedArray = new Uint8ClampedArray(64);
    for (let y = 0; y < new_height; y += 4) {
        for (let x = 0; x < new_width; x += 4) {
            ETC1.decode_ETC1(image_b.readBigUInt64BE(), color_buffer) as void;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (y + i < new_height && x + j < width) {
                        img_pixels[((y + i) * width + x + j) * 4] = color_buffer[((i << 2) | j) * 4];
                        img_pixels[((y + i) * width + x + j) * 4 + 1] = color_buffer[((i << 2) | j) * 4 + 1];
                        img_pixels[((y + i) * width + x + j) * 4 + 2] = color_buffer[((i << 2) | j) * 4 + 2];
                    }
                }
            }
        }
    }
    for (let i = 0; i < (new_width * new_height); i++) {
        img_pixels[i * 4 + 3] = image_b.readUInt8();
    }
    const image_c: any = createCanvas(new_width, new_height);
    const c_ctx: any = image_c.getContext("2d");
    const canvas_data: any = c_ctx.createImageData(width, height);
    canvas_data.data.set(img_pixels);
    c_ctx.putImageData(canvas_data, 0, 0);
    if (sz) {
        const image2: any = createCanvas(width, height);
        const ctx_2: any = image2.getContext("2d");
        ctx_2.drawImage(image_c, 0, 0, new_height, new_height);
        return image2.toBuffer();
    }
    return image_c.toBuffer("image/png");
}
