"use strict";
import { SmartBuffer } from "smart-buffer";
import { createCanvas, Image } from "@napi-rs/canvas";
export default function encode_a8(img_buf: Buffer): Buffer {
    const img: any = new Image();
    img.src = img_buf;
    const img_c: any = createCanvas(img.width, img.height);
    const c_ctx: any = img_c.getContext("2d");
    c_ctx.drawImage(img, 0, 0);
    const pixels: Uint8ClampedArray = c_ctx.getImageData(0, 0, img.width, img.height).data;
    const image_b: any = new SmartBuffer();
    const img_s: number = (img.width * img.height);
    for (let i = 0; i < img_s; i++) {
        image_b.writeUInt8(pixels[i * 4 + 3]);
    }
    return image_b.toBuffer();
}
