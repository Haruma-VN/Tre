"use strict";
import { popcap_texture_decode } from "../../../../library/img/texture/utility.js";
import localization from "../../../../callback/localization.js";
import fs_js from "../../../../library/fs/implement.js";
import { UnknownFormat } from "../../../../implement/error.js";
export default function decode_ptx(
    data: Buffer,
    simple_mode: boolean | any,
    rsg_path: string,
    item_path: string,
    width: number,
    height: number,
    settings: any,
    disable_notify: boolean,
): {
    item_path: string;
    img_data: any;
    ptx_fmt: boolean | number;
    ptx_platform: boolean | string;
} {
    let decode_texture = true;
    if (typeof simple_mode !== "boolean") {
        decode_texture = simple_mode.decode_texture;
    }
    if (simple_mode && decode_texture) {
        const img_s_ratio: number = ~~(((data.length / (width * height)) * 10) / 2);
        item_path = item_path.replace(".PTX", ".PNG");
        let img_data;
        switch (img_s_ratio) {
            case 20:
                if (settings.argb8888_decode) {
                    img_data = popcap_texture_decode(
                        data,
                        `${rsg_path}/res/${item_path}`,
                        width,
                        height,
                        2,
                        disable_notify,
                        true,
                    );
                    return {
                        item_path,
                        img_data,
                        ptx_fmt: 0,
                        ptx_platform: "ios",
                    };
                } else {
                    img_data = popcap_texture_decode(
                        data,
                        `${rsg_path}/res/${item_path}`,
                        width,
                        height,
                        1,
                        disable_notify,
                        true,
                    );
                    return {
                        item_path,
                        img_data,
                        ptx_fmt: 0,
                        ptx_platform: "android",
                    };
                }
            case 7:
                img_data = popcap_texture_decode(
                    data,
                    `${rsg_path}/res/${item_path}`,
                    width,
                    height,
                    14,
                    disable_notify,
                    true,
                );
                return {
                    item_path,
                    img_data,
                    ptx_fmt: 147,
                    ptx_platform: "android",
                };
            case 5:
                img_data = popcap_texture_decode(
                    data,
                    `${rsg_path}/res/${item_path}`,
                    width,
                    height,
                    15,
                    disable_notify,
                    true,
                );
                return {
                    item_path,
                    img_data,
                    ptx_fmt: 147,
                    ptx_platform: "android_cn",
                };
            case 2:
                img_data = popcap_texture_decode(
                    data,
                    `${rsg_path}/res/${item_path}`,
                    width,
                    height,
                    18,
                    disable_notify,
                    true,
                );
                return {
                    item_path,
                    img_data,
                    ptx_fmt: 30,
                    ptx_platform: "ios",
                };
            default:
                throw new UnknownFormat(
                    `${localization("cannot_decode_ptx")} & ${localization("unknown_ptx_format")}`,
                    `${fs_js.get_full_path(`${rsg_path}/res/${item_path}`)}`,
                    `Unknown format`,
                    img_s_ratio,
                );
        }
    } else {
        return {
            item_path,
            img_data: data,
            ptx_fmt: false,
            ptx_platform: false,
        };
    }
}
