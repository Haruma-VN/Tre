"use strict";
import sharp from "sharp";
import { basename } from "../../extension/util.js";
import fs from "node:fs";
import { dimension } from "../util.js";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import path from "node:path";
import max_sharp from "../exception/evaluate.js";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function (
    dir: string,
    not_notify_console_log: boolean = false
): Promise<void> {
    const img_data: { width: number; height: number } = await dimension(
        dir
    ).then((result: { width: number; height: number }) => {
        return result;
    });
    if (!not_notify_console_log) {
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_information")}: `
            ) + "rgba8888"
        );
        Console.WriteLine(
            color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) +
                `${fs_js.get_full_path(dir)}`
        );
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_display_width")}: `
            ) + `${img_data.width}`
        );
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_display_height")}: `
            ) + `${img_data.height}`
        );
    }
    max_sharp(img_data.width, img_data.height);
    fs_js.js_remove(path.resolve(dir + "/../" + basename(dir) + ".ptx"));
    const data: any = await sharp(dir)
        .raw()
        .toBuffer()
        .catch((error: any) => {
            throw new Error(localization("cannot_read_image_data"));
        });
    fs.writeFileSync(dir + "/../" + basename(dir) + ".ptx", data);
    if (!not_notify_console_log) {
        Console.WriteLine(
            color.fggreen_string(`◉ ${localization("execution_out")}:\n     `) +
                `${path.resolve(dir + "/../" + basename(dir) + ".ptx")}`
        );
    }
    return;
}
