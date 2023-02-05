"use strict";
import Void from "./function_class.js";
export namespace Display.Tre.Function {
    export const js_execute = new Void("JS Execute", 1);
    export const res_split = new Void("PopCap Resources Split", 2);
    export const res_cat = new Void("PopCap Resources Concat", 3);
    export const atlas_split = new Void("PopCap Atlas Split", 4);
    export const atlas_cat = new Void("PopCap Atlas Concat", 5);
    export const encode_rgba8888 = new Void("PopCap RGBA8888 Android Encode (0)", 6);
    export const encode_argb8888 = new Void("PopCap ARGB8888 iOS Encode (0)", 7);
    export const encode_etc1a = new Void("PopCap ETC1 Alpha Android Encode (147)", 8);
    export const encode_pvrtc = new Void("PopCap PVRTC iOS Encode (30)", 9);
    export const resize_atlas = new Void("PopCap Atlas Members Resize", 16);
}