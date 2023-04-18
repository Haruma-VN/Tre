"use strict";
import sharp from "sharp";
import { basename, extname } from "../../extension/util.js";
import { writefile, readfilebuffer } from "../../fs/util.js";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
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
            ) + "argb8888"
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
    delete_file(dir + "/../" + basename(dir) + ".png");
    await sharp(readfilebuffer(dir), {
        raw: { width: width, height: height, channels: 4 },
    })
        .png()
        .toBuffer()
        .then(async (argb32) => {
            await sharp(argb32)
                .extractChannel("blue")
                .toBuffer()
                .then(async (blue) => {
                    await sharp(argb32)
                        .extractChannel("green")
                        .toBuffer()
                        .then(async (green) => {
                            await sharp(argb32)
                                .extractChannel("red")
                                .toBuffer()
                                .then(async (red) => {
                                    await sharp(argb32)
                                        .extractChannel("alpha")
                                        .toBuffer()
                                        .then(async (alpha) => {
                                            await sharp(blue)
                                                .joinChannel(green)
                                                .joinChannel(red)
                                                .joinChannel(alpha)
                                                .toBuffer()
                                                .then(async (image) => {
                                                    if (
                                                        !not_notify_console_log
                                                    ) {
                                                        console.log(
                                                            color.fggreen_string(
                                                                `◉ ${localization(
                                                                    "execution_out"
                                                                )}:\n     `
                                                            ) +
                                                                `${path.resolve(
                                                                    dir +
                                                                        "/../" +
                                                                        basename(
                                                                            dir
                                                                        ) +
                                                                        ".png"
                                                                )}`
                                                        );
                                                    }
                                                    return await writefile(
                                                        dir +
                                                            "/../" +
                                                            basename(dir) +
                                                            ".png",
                                                        image
                                                    );
                                                });
                                        });
                                });
                        });
                });
        })
        .catch((error: any) => {
            throw new Error(localization("popcap_ptx_decode_native_error"));
        });
    return;
}
