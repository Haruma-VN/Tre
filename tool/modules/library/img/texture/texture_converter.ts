"use strict";
import en_a8 from "./encode/a8.js";
import en_argb_8888 from "./encode/argb_8888.js";
import en_etc1_rgb from "./encode/etc1_rgb.js";
import en_etc1_rgb_a8 from "./encode/etc1_rgb_a8.js";
import en_etc1_rgb_a_palette from "./encode/etc1_rgb_a_palette.js";
import en_l8 from "./encode/l8.js";
import en_la44 from "./encode/la44.js";
import en_la88 from "./encode/la88.js";
import en_pvrtc_4bpp_rgb from "./encode/pvrtc_4bpp_rgb.js";
import en_pvrtc_4bpp_rgba from "./encode/pvrtc_4bpp_rgba.js";
import en_pvrtc_4bpp_rgb_a8 from "./encode/pvrtc_4bpp_rgb_a8.js";
import en_rgb_565 from "./encode/rgb_565.js";
import en_rgb_888 from "./encode/rgb_888.js";
import en_rgba_4444 from "./encode/rgba_4444.js";
import en_rgba_8888 from "./encode/rgba_8888.js";
import en_rgba_5551 from "./encode/rgba_5551.js";
import en_xrgb_8888 from "./encode/xrgb_8888.js";
import en_xrgb_8888_a8 from "./encode/xrgb_8888_a8.js";
// decode;
import de_a8 from "./decode/a8.js";
import de_argb_8888 from "./decode/argb_8888.js";
import de_etc1_rgb from "./decode/etc1_rgb.js";
import de_etc1_rgb_a8 from "./decode/etc1_rgb_a8.js";
import de_etc1_rgb_a_palette from "./decode/etc1_rgb_a_palette.js";
import de_l8 from "./decode/l8.js";
import de_la44 from "./decode/la44.js";
import de_la88 from "./decode/la88.js";
import de_pvrtc_4bpp_rgb_a8 from "./decode/pvrtc_4bpp_rgb_a8.js";
import de_pvrtc_4bpp_rgba from "./decode/pvrtc_4bpp_rgba.js";
import de_rgb_565 from "./decode/rgb_565.js";
import de_rgb_888 from "./decode/rgb_888.js";
import de_rgba_4444 from "./decode/rgba_4444.js";
import de_rgba_5551 from "./decode/rgba_5551.js";
import de_rgba_8888 from "./decode/rgba_8888.js";
import de_xrgb_8888 from "./decode/xrgb_8888.js";
import de_xrgb_8888_a8 from "./decode/xrgb_8888_a8.js";

export namespace texture_converter {
    export function encode_a8(img_buf: Buffer) {
        return en_a8(img_buf);
    }
    export function encode_argb_8888(img_buf: Buffer) {
        return en_argb_8888(img_buf);
    }
    export function encode_etc1_rgb(img_buf: Buffer) {
        return en_etc1_rgb(img_buf);
    }
    export function encode_etc1_rgb_a8(img_buf: Buffer) {
        return en_etc1_rgb_a8(img_buf);
    }
    export function encode_etc1_rgb_a_palette(img_buf: Buffer) {
        return en_etc1_rgb_a_palette(img_buf);
    }
    export function encode_l8(img_buf: Buffer) {
        return en_l8(img_buf);
    }
    export function encode_la44(img_buf: Buffer) {
        return en_la44(img_buf);
    }
    export function encode_la88(img_buf: Buffer) {
        return en_la88(img_buf);
    }
    export function encode_pvrtc_4bpp_rgb_a8(img_buf: Buffer) {
        return en_pvrtc_4bpp_rgb_a8(img_buf);
    }
    export function encode_pvrtc_4bpp_rgba(img_buf: Buffer) {
        return en_pvrtc_4bpp_rgba(img_buf);
    }
    export function encode_pvrtc_4bpp_rgb(img_buf: Buffer) {
        return en_pvrtc_4bpp_rgb(img_buf);
    }
    export function encode_rgb_565(img_buf: Buffer) {
        return en_rgb_565(img_buf);
    }
    export function encode_rgb_888(img_buf: Buffer) {
        return en_rgb_888(img_buf);
    }
    export function encode_rgba_4444(img_buf: Buffer) {
        return en_rgba_4444(img_buf);
    }
    export function encode_rgba_5551(img_buf: Buffer) {
        return en_rgba_5551(img_buf);
    }
    export function encode_rgba_8888(img_buf: Buffer) {
        return en_rgba_8888(img_buf);
    }
    export function encode_xrgb_8888(img_buf: Buffer) {
        return en_xrgb_8888(img_buf);
    }
    export function encode_xrgb_8888_a8(img_buf: Buffer) {
        return en_xrgb_8888_a8(img_buf);
    }
    export function decode_a8(img_buf: Buffer, width: number, height: number) {
        return de_a8(img_buf, width, height);
    }
    export function decode_argb_8888(img_buf: Buffer, width: number, height: number) {
        return de_argb_8888(img_buf, width, height);
    }
    export function decode_etc1_rgb(img_buf: Buffer, width: number, height: number) {
        return de_etc1_rgb(img_buf, width, height);
    }
    export function decode_etc1_rgb_a8(img_buf: Buffer, width: number, height: number) {
        return de_etc1_rgb_a8(img_buf, width, height);
    }
    export function decode_etc1_rgb_a_palette(img_buf: Buffer, width: number, height: number) {
        return de_etc1_rgb_a_palette(img_buf, width, height);
    }
    export function decode_l8(img_buf: Buffer, width: number, height: number) {
        return de_l8(img_buf, width, height);
    }
    export function decode_la44(img_buf: Buffer, width: number, height: number) {
        return de_la44(img_buf, width, height);
    }
    export function decode_la88(img_buf: Buffer, width: number, height: number) {
        return de_la88(img_buf, width, height);
    }
    export function decode_pvrtc_4bpp_rgb_a8(img_buf: Buffer, width: number, height: number) {
        return de_pvrtc_4bpp_rgb_a8(img_buf, width, height);
    }
    export function decode_pvrtc_4bpp_rgba(img_buf: Buffer, width: number, height: number) {
        return de_pvrtc_4bpp_rgba(img_buf, width, height);
    }
    export function decode_pvrtc_4bpp_rgb(img_buf: Buffer, width: number, height: number) {
        return de_pvrtc_4bpp_rgba(img_buf, width, height);
    }
    export function decode_rgb_565(img_buf: Buffer, width: number, height: number) {
        return de_rgb_565(img_buf, width, height);
    }
    export function decode_rgb_888(img_buf: Buffer, width: number, height: number) {
        return de_rgb_888(img_buf, width, height);
    }
    export function decode_rgba_4444(img_buf: Buffer, width: number, height: number) {
        return de_rgba_4444(img_buf, width, height);
    }
    export function decode_rgba_5551(img_buf: Buffer, width: number, height: number) {
        return de_rgba_5551(img_buf, width, height);
    }
    export function decode_rgba_8888(img_buf: Buffer, width: number, height: number) {
        return de_rgba_8888(img_buf, width, height);
    }
    export function decode_xrgb_8888(img_buf: Buffer, width: number, height: number) {
        return de_xrgb_8888(img_buf, width, height);
    }
    export function decode_xrgb_8888_a8(img_buf: Buffer, width: number, height: number) {
        return de_xrgb_8888_a8(img_buf, width, height);
    }
}
