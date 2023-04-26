"use strict";
import { dimension } from "../util.js";
import sharp from "sharp";
import * as color from "../../color/color.js";
import localization from "../../../callback/localization.js";
import exception_encode_dimension from "../exception/encode.js";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function (
    dir: string,
    not_notify_console_log: boolean = false
): Promise<void> {
    const tre_thirdparty: string =
        fs_js.dirname(process.argv[1]) + "/extension/third/encode/";
    const etc_process: string = `etcpak.exe --etc1 "${dir}" "${fs_js.dirname(
        dir
    )}/${fs_js.basename(dir).toUpperCase()}.ptx"`;
    const dimension_x: { width: number; height: number } = await dimension(
        dir
    ).then((result) => result);
    const width: number = dimension_x.width;
    const height: number = dimension_x.height;
    const offset = (width * height) / 2;
    if (!not_notify_console_log) {
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_information")}: `
            ) + "rgb_etc1_a_8"
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
    const exception_try: boolean = exception_encode_dimension(width, height);
    if (exception_try && fs_js.check_etcpak()) {
        fs_js.js_remove(
            fs_js.resolve(dir + "/../" + fs_js.basename(dir) + ".ptx")
        );
        fs_js.evaluate_powershell(etc_process, tre_thirdparty, "ignore");
        await sharp(dir)
            .extractChannel("alpha")
            .raw()
            .toBuffer()
            .then((alpha: Buffer) => {
                const originalImage = fs_js
                    .read_file(
                        `${dir.toUpperCase().replace(".PNG", ".ptx")}`,
                        "buffer"
                    )
                    .slice(
                        fs_js.read_file(
                            `${dir.toUpperCase().replace(".PNG", ".ptx")}`,
                            "buffer"
                        ).length - offset
                    );
                const etc_image = Buffer.concat([originalImage, alpha]);
                fs_js.write_file(
                    `${fs_js.dirname(dir)}/${fs_js
                        .basename(dir)
                        .toUpperCase()}.ptx`,
                    etc_image
                );
                if (!not_notify_console_log) {
                    Console.WriteLine(
                        color.fggreen_string(
                            `◉ ${localization("execution_out")}:\n     `
                        ) +
                            `${fs_js.resolve(
                                dir + "/../" + fs_js.basename(dir) + ".ptx"
                            )}`
                    );
                }
                for (let item of fs_js.full_reader(tre_thirdparty)) {
                    fs_js.extname(item).toUpperCase() !== ".EXE"
                        ? fs_js.js_remove(`${tre_thirdparty}${item}`)
                        : {};
                }
            });
        return;
    }
}
