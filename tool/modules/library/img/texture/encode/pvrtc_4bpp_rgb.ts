"use strict";
import { createCanvas, Image } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
import PVRTC_coder from "../compression_coder/pvrtc.js";
export default function encode_pvrtc_4bpp_rgb(img_buf: Buffer): Buffer {
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
        if (new_width < 8) {
            new_width = 8;
            rs = true;
        }
        if (new_height < 8) {
            new_height = 8;
            rs = true;
        }
        if ((new_width & (new_height - 1)) != 0) {
            new_width = 0b10 << Math.floor(Math.log2(new_width));
            rs = true;
        }
        if ((new_height & (new_height - 1)) != 0) {
            new_height = 0b10 << Math.floor(Math.log2(new_height));
            rs = true;
        }
        if (new_width != new_height) {
            new_width = new_height = Math.max(new_width, new_height);
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
        const pvrtc_word_image: Array<any> = PVRTC_coder.PVRTC.encode_rgb_4bpp(pixels, new_width);
        const image_b: any = new SmartBuffer();
        for (let i = 0; i < pvrtc_word_image.length; i++) {
            image_b.writeBigUInt64LE(pvrtc_word_image[i].pvrtc_number);
        }
        return image_b.toBuffer();
    }
    return img_data;
}
