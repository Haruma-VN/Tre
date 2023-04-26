"use strict";
import fs from "node:fs";
import { execSync } from "node:child_process";
import { parse, resolve } from "node:path";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
import exception_encode_dimension from "../exception/encode.js";
import fs_js from "../../fs/implement.js";
import path from "node:path";
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
            ) + "rgb_pvrtc4_a_8"
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
    const exception_checker = exception_encode_dimension(width, height);
    if (exception_checker && fs_js.check_pvrtc()) {
        fs_js.js_remove(
            `${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`
        );
        const tre_thirdparty =
            path.dirname(process.argv[1]) + "/extension/third/encode/";
        let cmd = `PVRTexToolCLI.exe -i "${parse(dir).name}.pvr" -d "${
            parse(dir).dir
        }/${parse(dir).name.toUpperCase()}.png"`;
        let pvr_header: any = Buffer.from(
            "505652030000000003000000000000000100000000000000BBBBBBBBAAAAAAAA010000000100000001000000010000001000000050565203060000000400000000000000",
            "hex"
        );
        pvr_header.writeInt32LE("0x" + width.toString(16), 28);
        pvr_header.writeInt32LE("0x" + height.toString(16), 24);
        const originalImage = Buffer.concat([pvr_header, fs.readFileSync(dir)]);
        fs.writeFileSync(
            `${tre_thirdparty}${parse(dir).name}.pvr`,
            originalImage
        );
        if (!not_notify_console_log) {
            Console.WriteLine(
                color.fggreen_string(
                    `◉ ${localization("execution_out")}:\n     `
                ) +
                    `${resolve(
                        `${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`
                    )}`
            );
        }
        execSync(cmd, { cwd: tre_thirdparty, stdio: "ignore" });
        for (let item of fs.readdirSync(tre_thirdparty)) {
            parse(item).ext.toUpperCase() !== ".EXE"
                ? fs.unlinkSync(`${tre_thirdparty}${item}`)
                : {};
        }
    }
}
