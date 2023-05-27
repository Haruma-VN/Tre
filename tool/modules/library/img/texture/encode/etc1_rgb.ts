"use strict";
import { createCanvas, Image } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
import ETC1 from "../compression_coder/etc1.js";
export default function encode_etc1_rgb(img_buf: Buffer): Buffer {
    let img_data: Buffer = Buffer.alloc(0);
    const img = new Image();
    img.onload = function (): void {
        const temp_canvas: any = createCanvas(img.width, img.height);
        const temp_ctx: any = temp_canvas.getContext("2d");
        temp_ctx.drawImage(img, 0, 0);
        img_data = encode_image(img.width, img.height, temp_canvas) as Buffer;
    };
    img.src = img_buf;
    function encode_image(width: number, height: number, img_c: any): Buffer {
        let rs: boolean = false;
        let new_width: number = width;
        let new_height: number = height;
        if (new_width % 4 != 0) {
            new_width += 4 - (new_width % 4);
            rs = true;
        }
        if (new_height % 4 != 0) {
            new_height += 4 - (new_height % 4);
            rs = true;
        }
        const img_c_ctx: any = img_c.getContext("2d");
        let pixels: Uint8ClampedArray = img_c_ctx.getImageData(0, 0, width, height).data;
        if (rs) {
            const image2: any = createCanvas(new_width, new_height);
            const image2_ctx: any = image2.getContext("2d");
            image2_ctx.drawImage(img_c, 0, 0, width, height);
            pixels = image2_ctx.getImageData(0, 0, new_width, new_height).data;
        }
        let color_buffer: Uint8ClampedArray = new Uint8ClampedArray(64);
        const image_b: any = new SmartBuffer();
        for (let y = 0; y < height; y += 4) {
            for (let x = 0; x < width; x += 4) {
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        if (y + i < height && x + j < width) {
                            color_buffer[((i << 2) | j) * 4 + 0] = pixels[((y + i) * width + x + j) * 4 + 0];
                            color_buffer[((i << 2) | j) * 4 + 1] = pixels[((y + i) * width + x + j) * 4 + 1];
                            color_buffer[((i << 2) | j) * 4 + 2] = pixels[((y + i) * width + x + j) * 4 + 2];
                            color_buffer[((i << 2) | j) * 4 + 3] = pixels[((y + i) * width + x + j) * 4 + 3];
                        } else {
                            color_buffer[((i << 2) | j) * 4 + 3] = 255;
                        }
                    }
                }
                image_b.writeBigUInt64BE(ETC1.gen_vertical(color_buffer));
            }
        };
        return image_b.toBuffer();
    }
    return img_data;
}
