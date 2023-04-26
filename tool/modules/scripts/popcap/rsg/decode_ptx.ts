"use strict";
import * as image_util from "../../../library/img/util.js";
import * as color from "../../../library/color/color.js";
import localization from "../../../callback/localization.js";
import { parse } from "node:path";
import { readline_integer } from "../../../readline/prompt/util.js";
import fs_js from "../../../library/fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function DecodePTX(
    ptx_path: string,
    file_data_size: number,
    image_width: number,
    image_height: number,
    ios_argb8888: number | boolean,
    no_notify_message: boolean = false
) {
    const square_ratio = parseInt(
        (((file_data_size / (image_width * image_height)) * 10) / 2) as any
    );
    let format: any = { Format: 0, Platform: "ios" };
    switch (square_ratio) {
        case 20:
            if (ios_argb8888 === 2) {
                Console.WriteLine(
                    color.fgcyan_string(
                        `◉ ${localization("execution_argument")}: ${
                            parse(ptx_path).base
                        } ${localization("ios_argb8888")}`
                    )
                );
                fs_js.execution_boolean_view();
                ios_argb8888 = readline_integer(0, 1) === 0 ? false : true;
            }
            if (ios_argb8888 === 1) {
                await image_util.decode_argb8888(
                    ptx_path,
                    image_width,
                    image_height,
                    no_notify_message
                );
                format = { Format: 0, Platform: "ios" };
            } else {
                await image_util.decode_rgba8888(
                    ptx_path,
                    image_width,
                    image_height,
                    no_notify_message
                );
                format = { Format: 0, Platform: "android" };
            }
            break;
        case 2:
            await image_util.decode_pvrtc(
                ptx_path,
                image_width,
                image_height,
                no_notify_message
            );
            format = { Format: 30, Platform: "ios" };
            break;
        case 5:
            await image_util.decode_etc1alpha_palette(
                ptx_path,
                image_width,
                image_height,
                no_notify_message
            );
            format = { Format: 147, Platform: "android_cn" };
            break;
        case 7:
            await image_util.decode_etc1a(
                ptx_path,
                image_width,
                image_height,
                no_notify_message
            );
            format = { Format: 147, Platform: "android" };
            break;
        default:
            throw new Error(
                `${localization("cannot_decode_ptx")}. ${fs_js.get_full_path(
                    ptx_path
                )} ${localization("unknown_ptx_format")}`
            );
    }

    if (fs_js.is_file(ptx_path)) {
        await fs_js.js_remove(ptx_path);
    }

    return format;
}
