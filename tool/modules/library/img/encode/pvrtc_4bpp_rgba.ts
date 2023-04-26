"use strict";
import { dimension } from "../util.js";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import exception_encode_dimension from "../exception/encode.js";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function (
    dir: string,
    not_notify_console_log: boolean = false
): Promise<void> {
    const tre_thirdparty: string =
        fs_js.dirname(process.argv[1]) + "/extension/third/encode/";
    const pvrtc_process: string = `PVRTexToolCLI.exe -f PVRTCI_4BPP_RGBA,UBN,sRGB -q PVRTCFAST -i "${dir}" -o "${fs_js
        .basename(dir)
        .toUpperCase()}.pvr"`;
    const dimension_x: { width: number; height: number } = await dimension(
        dir
    ).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset: number = (width * height) / 2;
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
    const get_exception: boolean = exception_encode_dimension(width, height);
    if (get_exception && fs_js.check_pvrtc()) {
        fs_js.js_remove(
            fs_js.resolve(
                `${fs_js.dirname(dir)}/${fs_js.basename(dir).toUpperCase()}.ptx`
            )
        );
        try {
            await fs_js.evaluate_powershell(
                pvrtc_process,
                tre_thirdparty,
                "ignore"
            );
        } catch (error: any) {
            throw new Error(`${localization("cannot_encode_ptx")} ${dir}`);
        }
        const originalImage = await fs_js
            .read_file(
                `${tre_thirdparty}/${fs_js.basename(dir).toUpperCase()}.pvr`,
                "buffer"
            )
            .slice(
                fs_js.read_file(
                    `${tre_thirdparty}/${fs_js
                        .basename(dir)
                        .toUpperCase()}.pvr`,
                    "buffer"
                ).length - offset
            );
        fs_js.write_file(
            `${fs_js.dirname(dir)}/${fs_js.basename(dir).toUpperCase()}.ptx`,
            originalImage
        );
        if (!not_notify_console_log) {
            Console.WriteLine(
                color.fggreen_string(
                    `◉ ${localization("execution_out")}:\n     `
                ) +
                    `${fs_js.resolve(
                        `${fs_js.dirname(dir)}/${fs_js
                            .basename(dir)
                            .toUpperCase()}.ptx`
                    )}`
            );
        }
        for (let item of fs_js.full_reader(tre_thirdparty)) {
            fs_js.extname(item).toUpperCase() !== ".EXE"
                ? await fs_js.js_remove(`${tre_thirdparty}${item}`)
                : {};
        }
    }
    return;
}
