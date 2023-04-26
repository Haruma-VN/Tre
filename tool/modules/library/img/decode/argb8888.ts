"use strict";
import sharp from "sharp";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
import max_sharp from "../exception/evaluate.js";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function (
    dir: string,
    width: number,
    height: number,
    not_notify_console_log: boolean = false
): Promise<void> {
    if (!not_notify_console_log) {
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_information")}: `
            ) + "argb8888"
        );
        Console.WriteLine(
            color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) +
                `${fs_js.get_full_path(dir)}`
        );
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_display_width")}: `
            ) + `${width}`
        );
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_display_height")}: `
            ) + `${height}`
        );
    }
    max_sharp(width, height);
    fs_js.js_remove(dir + "/../" + fs_js.basename(dir) + ".png");
    await sharp(fs_js.read_file(dir, "buffer"), {
        raw: { width: width, height: height, channels: 4 },
    })
        .toBuffer()
        .then(async (argb32: Buffer) => {
            await sharp(argb32)
                .extractChannel("blue")
                .toBuffer()
                .then(async (blue: Buffer) => {
                    await sharp(argb32)
                        .extractChannel("green")
                        .toBuffer()
                        .then(async (green: Buffer) => {
                            await sharp(argb32)
                                .extractChannel("red")
                                .toBuffer()
                                .then(async (red: Buffer) => {
                                    await sharp(argb32)
                                        .extractChannel("alpha")
                                        .toBuffer()
                                        .then(async (alpha) => {
                                            await sharp(blue)
                                                .joinChannel(green)
                                                .joinChannel(red)
                                                .joinChannel(alpha)
                                                .toBuffer()
                                                .then(async (image: Buffer) => {
                                                    if (
                                                        !not_notify_console_log
                                                    ) {
                                                        Console.WriteLine(
                                                            color.fggreen_string(
                                                                `◉ ${localization(
                                                                    "execution_out"
                                                                )}:\n     `
                                                            ) +
                                                                `${fs_js.resolve(
                                                                    dir +
                                                                        "/../" +
                                                                        fs_js.basename(
                                                                            dir
                                                                        ) +
                                                                        ".png"
                                                                )}`
                                                        );
                                                    }
                                                    return await fs_js.write_file(
                                                        dir +
                                                            "/../" +
                                                            fs_js.basename(
                                                                dir
                                                            ) +
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
