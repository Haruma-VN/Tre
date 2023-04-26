"use strict";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
import exception_encode_dimension from "../exception/encode.js";
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
            `${fs_js.parse_fs(dir).dir}/${fs_js
                .parse_fs(dir)
                .name.toUpperCase()}.png`
        );
        const tre_thirdparty =
            fs_js.dirname(process.argv[1]) + "/extension/third/encode/";
        let cmd = `PVRTexToolCLI.exe -i "${fs_js.parse_fs(dir).name}.pvr" -d "${
            fs_js.parse_fs(dir).dir
        }/${fs_js.parse_fs(dir).name.toUpperCase()}.png"`;
        let pvr_header: any = Buffer.from(
            "505652030000000003000000000000000100000000000000BBBBBBBBAAAAAAAA010000000100000001000000010000001000000050565203060000000400000000000000",
            "hex"
        );
        pvr_header.writeInt32LE("0x" + width.toString(16), 28);
        pvr_header.writeInt32LE("0x" + height.toString(16), 24);
        const originalImage = Buffer.concat([
            pvr_header,
            fs_js.read_file(dir, "buffer"),
        ]);
        fs_js.write_file(
            `${tre_thirdparty}${fs_js.parse_fs(dir).name}.pvr`,
            originalImage
        );
        if (!not_notify_console_log) {
            Console.WriteLine(
                color.fggreen_string(
                    `◉ ${localization("execution_out")}:\n     `
                ) +
                    `${fs_js.resolve(
                        `${fs_js.parse_fs(dir).dir}/${fs_js
                            .parse_fs(dir)
                            .name.toUpperCase()}.png`
                    )}`
            );
        }
        fs_js.evaluate_powershell(cmd, tre_thirdparty, "ignore");
        for (let item of fs_js.full_reader(tre_thirdparty)) {
            fs_js.parse_fs(item).ext.toUpperCase() !== ".EXE"
                ? fs_js.js_remove(`${tre_thirdparty}${item}`)
                : {};
        }
    }
}
