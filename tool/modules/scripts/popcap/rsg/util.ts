"use strict";
import unpack from "./unpack_rsg.js";
import pack from "./rsg_pack.js";
import * as color from "../../../library/color/color.js";
import localization from "../../../callback/localization.js";
import { Console } from "../../../callback/console.js";
import fs_js from "../../../library/fs/implement.js";

export async function unpack_rsg(
    rsg_data: any,
    rsg_path: string,
    decode_image: boolean = false,
    decode_rton: boolean = false,
    decode_data: boolean = false,
    removeinfo: boolean = false
) {
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${fs_js.resolve(rsg_path)}`
    );
    await unpack(
        rsg_data,
        rsg_path,
        decode_image,
        decode_rton,
        decode_data,
        removeinfo,
        2
    );
    return;
}
export async function pack_rsg(dir: string, is_pack_simple: boolean = false) {
    const rsg_data = is_pack_simple
        ? await pack(dir, true, false, false, false, false, false)
        : await pack(dir, false, false, false, false, false, false);
    await fs_js.write_file(
        `${fs_js.parse_fs(dir).dir}/${fs_js.parse_fs(dir).name}.rsg`,
        rsg_data
    );
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${fs_js.resolve(
            `${fs_js.parse_fs(dir).dir}/${fs_js.parse_fs(dir).name}.rsg`
        )}`
    );
    return;
}
