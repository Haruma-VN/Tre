"use strict";
import localization from "../../../../callback/localization.js";
import { popcap_texture_encode } from "../../../../library/img/texture/utility.js";
import { dimension } from "../../../../library/img/util.js";
export default function encode_texture(
    img_buf: Buffer,
    merge_mode: boolean,
    merge_mode_ptx_id: [number],
    rsg_default_setting: rsg_default_setting,
    texture_format_mapper: any,
    ptx_info:
        | undefined
        | {
              id: number;
              ptx_fmt: number;
              ptx_platform: string;
          },
) {
    function take_fmt_index(ptx_format: number, ptx_platform: string): number {
        return texture_format_mapper[ptx_platform][ptx_format][1] as number;
    }
    const { width, height } = dimension(img_buf);
    if (merge_mode) {
        const fmt_index: number = take_fmt_index(rsg_default_setting.ptx_fmt, rsg_default_setting.ptx_platform);

        const item_data = popcap_texture_encode(img_buf, "", fmt_index, true, true);
        return { item_data, ptx_info: { id: merge_mode_ptx_id[0]++, width, height } };
    } else {
        if (ptx_info === undefined) {
            throw new Error(localization("expect_ptx_info").replace(/\{\}/g, "ptx_info"));
        }
        const fmt_index: number = take_fmt_index(ptx_info.ptx_fmt, ptx_info.ptx_platform);
        const item_data = popcap_texture_encode(img_buf, "", fmt_index, true, true);
        return {
            item_data,
            ptx_info: {
                id: ptx_info.id,
                width,
                height,
            },
        };
    }
}
