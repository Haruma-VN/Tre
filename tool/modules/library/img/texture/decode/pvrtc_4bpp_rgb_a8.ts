"use strict";
import { createCanvas } from "@napi-rs/canvas";
import { SmartBuffer } from "smart-buffer";
import PVRTC_coder from "../compression_coder/pvrtc.js";
export default function decode_pvrtc_4bpp_rgb_a8(img_buf: Buffer, width: number, height: number): Buffer {
    const image_b: any = SmartBuffer.fromBuffer(img_buf);
    let sz: boolean = false;
    let new_width = width;
    let new_height = height;
    if (new_width < 8) {
        new_width = 8;
        sz = true;
    }
    if (new_height < 8) {
        new_height = 8;
        sz = true;
    }
    if ((new_width & (new_width - 1)) != 0) {
        new_width = 0b10 << Math.floor(Math.log2(new_width));
        sz = true;
    }
    if ((new_height & (new_height - 1)) != 0) {
        new_height = 0b10 << Math.floor(Math.log2(new_height));
        sz = true;
    }
    if (new_width != new_height) {
        new_width = new_height = Math.max(new_width, new_height);
        sz = true;
    }
    const packets: Array<any> = new Array();
    const index: number = (new_width * new_width) >> 4;
    for (let i = 0; i < index; i++) {
        packets.push(new PVRTC_coder.PVRTC_packet(image_b.readBigUInt64LE()));
    }
    const img_pixels: Uint8ClampedArray = PVRTC_coder.PVRTC.decode_4bpp(packets, new_width);
    for (let i = 3; i < img_pixels.length; i += 4) {
        img_pixels[i] = image_b.readUInt8();
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
