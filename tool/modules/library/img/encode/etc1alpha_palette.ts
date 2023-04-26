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
    const offset: number = (width * height) / 2;
    if (!not_notify_console_log) {
        Console.WriteLine(
            color.fggreen_string(
                `◉ ${localization("execution_information")}: `
            ) + "rgb_etc1_a_palette"
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
    const exception_thrown = exception_encode_dimension(width, height);
    if (exception_thrown && fs_js.check_etcpak()) {
        fs_js.js_remove(
            fs_js.resolve(dir + "/../" + fs_js.basename(dir) + ".ptx")
        );
        fs_js.evaluate_powershell(etc_process, tre_thirdparty, "ignore");
        await sharp(dir)
            .extractChannel("alpha")
            .raw()
            .toBuffer()
            .then((pixels: any) => {
                const originalImage: Buffer = fs_js.read_file(
                    `${fs_js.dirname(dir)}/${fs_js
                        .basename(dir)
                        .toUpperCase()}.ptx`,
                    "buffer"
                );
                const etc1Image: Buffer = originalImage.slice(
                    originalImage.length - offset
                );
                let square: number = width * height;
                const odd: boolean = (square & 177) === 1;
                const alpha_palette: Array<any> = new Array();
                alpha_palette.push(0x10);
                square >>= 1;
                let AlphaSize: number = square + 17;
                for (let i: number = 0; i < 16; i++) {
                    alpha_palette.push(i);
                }
                for (let i: number = 0; i < square; i++) {
                    alpha_palette.push(
                        (pixels[i << 1] & 0b11110000) |
                            (pixels[(i << 1) | 1] >> 4)
                    );
                }
                if (odd) {
                    AlphaSize++;
                    alpha_palette.push(pixels[square << 1] & 0b11110000);
                }
                const etc_image: Buffer = Buffer.concat([
                    etc1Image,
                    Buffer.from(alpha_palette),
                ]);
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
    }
}
