"use strict";
import { createCanvas, Image, Canvas, SKRSContext2D } from "@napi-rs/canvas";
import fs_js from "../../fs/implement.js";
import localization from "../../../callback/localization.js";
import { ResizeImageError } from "../../../implement/error.js";
export default function (
    dir: string,
    width: number | string,
    height: number | string,
    new_dir: string,
    not_notify: boolean,
) {
    width = typeof width === "string" ? parseInt(width) : width;
    height = typeof height === "string" ? parseInt(height) : height;
    const img_canvas: Image = new Image();
    let img_resized: Buffer = Buffer.alloc(0);
    img_canvas.onload = function () {
        const rs_canvas: Canvas = createCanvas(width as number, height as number);
        const img_context: SKRSContext2D = rs_canvas.getContext("2d");
        img_context.drawImage(img_canvas, 0, 0, width as number, height as number);
        img_resized = rs_canvas.toBuffer("image/png");
    };
    img_canvas.onerror = function (err: auto) {
        if (err as auto) {
            throw new ResizeImageError(
                `${localization("cannot_resize")}`,
                `${fs_js.get_full_path(`${dir}`)}`,
                err.message,
            );
        }
    };
    img_canvas.src = fs_js.read_file(dir, "buffer");
    fs_js.outfile_fs(new_dir, img_resized, not_notify);
    return;
}
