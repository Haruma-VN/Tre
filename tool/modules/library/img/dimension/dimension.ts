"use strict";
import { Image, loadImage } from "@napi-rs/canvas";
import fs_js from "../../fs/implement.js";
interface DimensionX {
    width: number;
    height: number;
}
function dimension(input: string | Buffer): DimensionX {
    const img: any = new Image();
    let dimension: DimensionX = { width: 0, height: 0 };
    img.onload = function () {
        dimension = { width: img.width, height: img.height };
    };
    img.src = (typeof input === "string" ? fs_js.read_file(input, "buffer") : input);
    return dimension;
}
async function async_dimension(input: string | Buffer): Promise<DimensionX> {
    const { width, height } = await loadImage(input);
    return { width, height };
}
export {dimension,  async_dimension};