"use strict";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { parse } from "node:path";
import sharp from "sharp";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
import path from "node:path";
import { delete_file } from "../../fs/util.js";
import exception_encode_dimension from "../exception/encode.js";
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
            ) + "rgb_etc1_a_8"
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
    const exception_checker = exception_encode_dimension(width, height);
    if (exception_checker && fs_js.check_etcpak()) {
        delete_file(`${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`);
        const tre_thirdparty =
            path.dirname(process.argv[1]) + "/extension/third/encode/";
        let cmd = `etcpak.exe --etc1 -v "${parse(dir).base}" "${parse(
            dir
        ).name.toUpperCase()}.png"`;
        let pvr_header: any = Buffer.from(
            "505652030000000006000000000000000000000000000000BBBBBBBBAAAAAAAA0100000001000000010000000100000000000000",
            "hex"
        );
        pvr_header.writeInt32LE("0x" + width.toString(16), 28);
        pvr_header.writeInt32LE("0x" + height.toString(16), 24);
        const originalImage = Buffer.concat([pvr_header, fs.readFileSync(dir)]);
        fs.writeFileSync(`${tre_thirdparty}${parse(dir).base}`, originalImage);
        execSync(cmd, { cwd: tre_thirdparty, stdio: "ignore" });
        await sharp(`${tre_thirdparty}${parse(dir).name.toUpperCase()}.png`)
            .removeAlpha()
            .toBuffer()
            .then(async (slice_alpha) => {
                await sharp(fs.readFileSync(dir).slice((width * height) / 2), {
                    raw: { width: width, height: height, channels: 1 },
                })
                    .png()
                    .toBuffer()
                    .then(async (alpha) => {
                        await sharp(slice_alpha)
                            .joinChannel(alpha)
                            .toBuffer()
                            .then((buffer) => {
                                if (!not_notify_console_log) {
                                    console.log(
                                        color.fggreen_string(
                                            `◉ ${localization(
                                                "execution_out"
                                            )}:\n     `
                                        ) +
                                            `${path.resolve(
                                                `${parse(dir).dir}/${parse(
                                                    dir
                                                ).name.toUpperCase()}.png`
                                            )}`
                                    );
                                }
                                fs.writeFileSync(
                                    `${parse(dir).dir}/${parse(
                                        dir
                                    ).name.toUpperCase()}.png`,
                                    buffer
                                );
                            });
                        for (let item of fs.readdirSync(tre_thirdparty)) {
                            parse(item).ext.toUpperCase() !== ".EXE"
                                ? fs.unlinkSync(`${tre_thirdparty}${item}`)
                                : {};
                        }
                    })
                    .catch((error: any) => {
                        throw new Error(
                            localization("popcap_ptx_decode_native_error")
                        );
                    });
            });
    }
}
