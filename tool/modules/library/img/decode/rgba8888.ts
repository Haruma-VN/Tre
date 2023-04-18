"use strict";
import sharp from "sharp";
import { basename } from "../../extension/util.js";
import { writefile, readfilebuffer } from "../../fs/util.js";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import path from "node:path";
import { delete_file } from "../../fs/util.js";
import max_sharp from "../exception/evaluate.js";
import fs_js from "../../fs/implement.js";

export default async function (
    dir: string,
    width: number,
    height: number,
    not_notify_console_log: boolean = false
): Promise<void> {
    if (!not_notify_console_log) {
        console.log(
            color.fggreen_string(
                `◉ ${localization("execution_information")}: `
            ) + "rgba8888"
        );
        console.log(
            color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) +
                `${fs_js.get_full_path(dir)}`
        );
        console.log(
            color.fggreen_string(
                `◉ ${localization("execution_display_width")}: `
            ) + `${width}`
        );
        console.log(
            color.fggreen_string(
                `◉ ${localization("execution_display_height")}: `
            ) + `${height}`
        );
    }
    max_sharp(width, height);
    delete_file(`${dir}/../${basename(dir)}.png`);
    await sharp(readfilebuffer(dir), {
        raw: { width: width, height: height, channels: 4 },
    })
        .png()
        .toBuffer()
        .then((result) => {
            if (!not_notify_console_log) {
                console.log(
                    color.fggreen_string(
                        `◉ ${localization("execution_out")}:\n     `
                    ) + `${path.resolve(`${dir}/../${basename(dir)}.png`)}`
                );
            }
            return writefile(`${dir}/../${basename(dir)}.png`, result);
        })
        .catch((error: any) => {
            throw new Error(localization("popcap_ptx_decode_native_error"));
        });
}
