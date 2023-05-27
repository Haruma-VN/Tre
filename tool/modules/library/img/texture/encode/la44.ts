"use strict";
import { SmartBuffer } from "smart-buffer";
import { createCanvas, Image } from "@napi-rs/canvas";
export default function encode_la44(img_buf: Buffer): Buffer {
    const img: any = new Image(); 
    let raw_img: Buffer = Buffer.alloc(0);
    img.onload = function() {
        const img_c: any = createCanvas(img.width, img.height);
        const c_ctx: any = img_c.getContext("2d");
        c_ctx.drawImage(img, 0, 0);
        raw_img = encode_image(c_ctx.getImageData(0, 0, img.width, img.height).data, img.width * img.height);
    }
    img.src = img_buf;
    function encode_image(pixels: Uint8ClampedArray, img_s: number): Buffer {
        const image_b: any = new SmartBuffer();
        for (let i = 0; i < img_s; i ++) {
            image_b.writeUInt8(((Math.max(pixels[i * 4] * 0.299 + pixels[i * 4 + 1] * 0.587 + pixels[i * 4 + 2] * 0.114, 255)) & 0xF0) | ((pixels[i * 4 + 3]) >> 4));
        }
        return image_b.toBuffer();
    }
    return raw_img;
}