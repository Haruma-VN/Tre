"use strict";
import { createCanvas, Canvas, SKRSContext2D } from "@napi-rs/canvas";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";
import { args } from "../../../implement/arguments.js";

export default function (dir: SKRSContext2D, x: number, y: number, w: number, h: number, new_dir: string, name: string, extension_list: string[]) {
    const json_config: any = fs_js.read_json(fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json", true);
    if (json_config.atlas.split.notify_duplicate) {
        for (let extension of extension_list) {
            if (name === extension) {
                Console.WriteLine(color.yellow_string(`◉ ${localization("execution_warning")}: ${name} ${localization("is_duplicated")}`));
                break;
            }
        }
    }
    extension_list.push(name);
    const img_data: any = dir.getImageData(x, y, w, h);
    const canvas: Canvas = createCanvas(w, h);
    const ctx: SKRSContext2D = canvas.getContext("2d");
    ctx.putImageData(img_data, 0, 0);
    const img_b: Buffer = canvas.toBuffer("image/png");
    fs_js.outfile_fs(new_dir, img_b, true);
}
