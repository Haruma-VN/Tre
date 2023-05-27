"use strict";
import { createCanvas, Image } from "@napi-rs/canvas";
export default function encode_rgba_8888(img_buf: Buffer): Buffer {
    const img: any = new Image(); 
    let raw_img: Buffer = Buffer.alloc(0);
    img.onload = function() {
        const img_c: any = createCanvas(img.width, img.height);
        const c_ctx: any = img_c.getContext("2d");
        c_ctx.drawImage(img, 0, 0);
        raw_img = Buffer.from(c_ctx.getImageData(0, 0, img.width, img.height).data);
    }
    img.src = img_buf;
    return raw_img;
}