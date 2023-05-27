"use strict";
import {createCanvas, loadImage} from "@napi-rs/canvas";
import fs_js from "../../fs/implement.js";
export default async function (
    arg: Array<{input: string, top: 0, left: 0}> = [],
    dir: string = "string",
    width: number = 32,
    height: number = 32
) {
    const create_new_canvas_composite: any = createCanvas(width, height);
    const create_new_ctx_composite: any = create_new_canvas_composite.getContext("2d");
    for (let i = 0; i < arg.length; i++) {
        const img: any = await loadImage(arg[i].input)
        create_new_ctx_composite.drawImage(img,  arg[i].left, arg[i].top);
    }
    fs_js.outfile_fs(dir, create_new_canvas_composite.toBuffer("image/png"), true);
}
