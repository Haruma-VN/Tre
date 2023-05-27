"use strict";
import unpack_rsg from "./unpack_rsg.js";
import unpack_ptx_info from "./unpack_ptx_info.js";
import read_head from "./read_head.js";
import file_list_split from "./file_list_split.js";
import unpack_composite from "./unpack_composite.js";
import fs_js from "../../../../library/fs/implement.js";
import { BrokenFile, WrongPropertyValue } from "../../../../implement/error.js";
import localization from "../../../../callback/localization.js";
export default function unpack_rsb(
    rsb_path: string,
    resgroup_method: boolean = false,
    unpack_packages: boolean = false,
    decode_rton: boolean = false,
    split_res_json: boolean = false,
): void {
    const rsb_b: Buffer = fs_js.read_file(rsb_path, "buffer");
    const head_info: rsb_head_infomation = read_head(rsb_b) as rsb_head_infomation;
    if (head_info.magic !== "1bsr") {
        throw new BrokenFile(
            localization("rsb_header_should_starts_with_1bsr"),
            rsb_path,
            localization("unknown_rsb_header"),
        );
    }
    if (head_info.version !== 3 && head_info.version !== 4) {
        throw new WrongPropertyValue(
            localization("invalid_rsb_version_number"),
            "magic",
            rsb_path,
            localization("rsb_version_number_should_be_3_or_4"),
        );
    }
    // const rsb_file_list_b: Buffer = rsb_b.slice(head_info.file_list_begin_offset, head_info.file_list_begin_offset + head_info.file_list_length);
    // const rsb_rsg_list_b: Buffer = rsb_b.slice(head_info.rsg_list_begin_offset, head_info.rsg_list_begin_offset + head_info.rsg_list_length);
    // const file_list: Array<{ path: string; rsg_pool_index: number }> = file_list_split(rsb_file_list_b);
    const rsb_composite_b: Buffer = rsb_b.slice(
        head_info.composite_info_begin_offset,
        head_info.composite_info_begin_offset + head_info.composite_number * head_info.composite_info_each_length,
    );
    const ptx_info_list = unpack_ptx_info(
        rsb_b.slice(
            head_info.ptx_info_begin_offset,
            head_info.ptx_info_begin_offset + head_info.ptx_number * head_info.ptx_info_each_length,
        ),
    );
    const mainfest: any = unpack_composite(rsb_composite_b, head_info.version);
    const rsg_info: Buffer = rsb_b.slice(
        head_info.rsg_info_begin_offset,
        head_info.rsg_info_begin_offset + head_info.rsg_number * head_info.rsg_info_each_length,
    );
    mainfest.group = unpack_rsg(
        mainfest,
        `${rsb_path}.bundle`,
        rsg_info,
        rsb_b,
        ptx_info_list,
        resgroup_method,
        unpack_packages,
        decode_rton,
        split_res_json,
    );
    fs_js.write_json(`${rsb_path}.bundle/mainfest_info.json`, mainfest, true);
}
