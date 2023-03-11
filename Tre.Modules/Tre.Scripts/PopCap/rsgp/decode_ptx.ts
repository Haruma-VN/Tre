"use strict";
import * as image_util from '../../../Tre.Libraries/Tre.Images/util.js';
import * as fs from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import * as color from '../../../Tre.Libraries/Tre.Color/color.js';
import localization from "../../../Tre.Callback/localization.js";
import { parse } from "node:path";
import { readline_integer } from '../../../Tre.Progress/Readline/util.js';
export default async function DecodePTX(ptx_path: string, file_data_size: number, image_width: number, image_height: number, ios_argb8888: number | boolean) {
    const square_ratio = parseInt(((file_data_size / (image_width * image_height)) * 10 / 2) as any);
    let format: any = { Format: 0, Platform: 'ios' };
    switch (square_ratio) {
        case 20:
            if (ios_argb8888 == 2) {
                console.log(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${parse(ptx_path).base} ${localization("ios_argb8888")}`));
                ios_argb8888 = readline_integer(0, 1) == 0 ? false : true;
            };
            if (ios_argb8888 == 1) {
                await image_util.decode_argb8888(ptx_path, image_width, image_height);
                format = { Format: 0, Platform: 'ios' };
            }
            else {
                await image_util.decode_rgba8888(ptx_path, image_width, image_height);
                format = { Format: 0, Platform: 'android' };
            }
            break;
        case 2:
            await image_util.decode_pvrtc(ptx_path, image_width, image_height);
            format = { Format: 30, Platform: 'ios' };
            break;
        case 5:
            await image_util.decode_etc1alpha_palette(ptx_path, image_width, image_height);
            format = { Format: 147, Platform: 'android_cn' };
            break;
        case 7:
            await image_util.decode_etc1a(ptx_path, image_width, image_height);
            format = { Format: 147, Platform: 'android' };
            break;
        default:
            console.log(color.fgred_string("Can\'t decode PTX. Unknown PTX's format"));
            break;
    }

    if (fs.check_is_file(ptx_path)) {
        await fs.delete_file(ptx_path);
    }

    return format;
}
