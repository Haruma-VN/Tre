"use strict";
import read_head from "./read_head.js";
import file_list_split from "./file_list_split.js";
import check_zlib from "./check_zlib.js";
import decode_data from "./decode_data.js";
import decode_texture from "./decode_texture.js";
import fs_js from "../../../../library/fs/implement.js";
import { WrongPropertyValue } from "../../../../implement/error.js";
import localization from "../../../../callback/localization.js";
export default function unpack_rsg(
    rsg_input: string,
    rsg_b: Buffer,
    simple_mode:
        | boolean
        | { decode_rton: boolean; decode_pam: boolean; decode_bnk: boolean; decode_texture: boolean } = false,
    return_mode: boolean = false,
    disable_notify: boolean = false,
): void | {
    rsg_temp_list: Array<{ path: string; decode_data: Buffer | null; json_data: any }>;
    packet_info: packet_info;
} {
    if (!disable_notify) fs_js.execution_in(rsg_input);
    const settings: any = fs_js.create_toolkit_view("packets");
    const array_path: boolean = settings.array_path;
    const head_info: rsg_head_infomation = read_head(rsg_b) as rsg_head_infomation;
    const flags: number = head_info.flags;
    if (head_info.version !== 3 && head_info.version !== 4) {
        throw new WrongPropertyValue(
            localization("version_out_of_range"),
            "version",
            rsg_input,
            localization("version_number_should_be_in_range_3_to_4"),
        );
    }
    if (0 < flags && flags > 3) {
        throw new WrongPropertyValue(
            localization("unsupported_rsg_flag"),
            "version",
            rsg_input,
            localization("rsg_flag_only_in_range_1_to_3"),
        );
    }
    if (simple_mode === true && head_info.version === 3) {
        throw new WrongPropertyValue(
            localization("rsg_unpack_simple_only_supports_version_number_4"),
            "version",
            rsg_input,
            localization("rsg_unpack_simple_only_supports_version_number_4"),
        );
    }
    const file_list: { part_0_list: Array<any>; part_1_list: Array<any> } = file_list_split(
        rsg_b.slice(head_info.file_list_offset, head_info.file_list_offset + head_info.file_list_length),
    );
    const packet_info: packet_info = {
        head_version: head_info.version,
        compression_flags: flags,
        use_packet_data: simple_mode ? true : null,
        res: [],
    };
    const part_0_list: Array<{ path: string; offset: number; size: number }> = file_list.part_0_list;
    const rsg_temp_list: Array<{ path: string; decode_data: Buffer | null; json_data: any }> = [];
    const rsg_path: string = `${rsg_input}.packet`;
    function choose_type(decode_data: Buffer | null, json_data: Buffer | null, item_path: string): void {
        if (decode_data !== null && json_data === null) {
            fs_js.outfile_fs(`${rsg_path}/res/${item_path}`, decode_data, true);
        } else if (decode_data === null && json_data !== null) {
            fs_js.outfile_fs(`${rsg_path}/res/${item_path}`, Buffer.alloc(0), true);
            fs_js.write_json(`${rsg_path}/res/${item_path}`, json_data, true);
        } else {
            throw new WrongPropertyValue(
                localization("invalid_decode_data"),
                "version",
                rsg_input,
                localization("invalid_decode_data"),
            );
        }
    }
    if (part_0_list.length > 0) {
        const part_0_raw_data: Buffer = check_zlib(rsg_b, head_info, flags, false);
        for (let i = 0; i < part_0_list.length; i++) {
            const packet_info_list: {
                item_path: string;
                decode_data: Buffer | null;
                json_data: Buffer | null;
                rton_encrypted: boolean;
            } = decode_data(
                part_0_raw_data.slice(part_0_list[i].offset, part_0_list[i].offset + part_0_list[i].size),
                simple_mode,
                rsg_path,
                part_0_list[i].path,
            );
            if (return_mode) {
                rsg_temp_list.push({
                    path: packet_info_list.item_path,
                    decode_data: packet_info_list.decode_data,
                    json_data: packet_info_list.json_data,
                });
            } else {
                choose_type(packet_info_list.decode_data, packet_info_list.json_data, packet_info_list.item_path);
            }
            const path: string | Array<string> = array_path
                ? packet_info_list.item_path.split("\\")
                : packet_info_list.item_path;
            packet_info_list.rton_encrypted
                ? packet_info.res.push({ rton_encrypted: packet_info_list.rton_encrypted, path })
                : packet_info.res.push({ path });
        }
    }
    const part_1_list: Array<{
        path: string;
        offset: number;
        size: number;
        id: number;
        width: number;
        height: number;
    }> = file_list.part_1_list;
    if (part_1_list.length > 0) {
        for (let i = 0; i < part_1_list.length; i++) {
            const part_1_raw_data: Buffer = check_zlib(rsg_b, head_info, flags, true);
            for (let i = 0; i < part_1_list.length; i++) {
                const texture_info_list: {
                    item_path: string;
                    img_data: any;
                    ptx_fmt: boolean | number;
                    ptx_platform: boolean | string;
                } = decode_texture(
                    part_1_raw_data.slice(part_1_list[i].offset, part_1_list[i].offset + part_1_list[i].size),
                    simple_mode,
                    rsg_path,
                    part_1_list[i].path,
                    part_1_list[i].width,
                    part_1_list[i].height,
                    settings,
                    disable_notify,
                );
                if (return_mode) {
                    rsg_temp_list.push({
                        path: texture_info_list.item_path,
                        decode_data: texture_info_list.img_data,
                        json_data: null,
                    });
                } else {
                    choose_type(texture_info_list.img_data, null, texture_info_list.item_path);
                }
                const path: string | Array<string> = array_path
                    ? texture_info_list.item_path.split("\\")
                    : texture_info_list.item_path;
                typeof texture_info_list.ptx_fmt === "boolean"
                    ? packet_info.res.push({
                          path,
                          ptx_info: {
                              id: part_1_list[i].id,
                              width: part_1_list[i].width,
                              height: part_1_list[i].height,
                          },
                      })
                    : packet_info.res.push({
                          path,
                          ptx_info: {
                              id: part_1_list[i].id,
                              ptx_fmt: texture_info_list.ptx_fmt,
                              ptx_platform: texture_info_list.ptx_platform,
                          },
                      });
            }
        }
    }
    if (return_mode) {
        return { rsg_temp_list, packet_info };
    } else {
        if (!disable_notify) fs_js.execution_out(`${rsg_input}.packet`);
        fs_js.write_json(`${rsg_input}.packet/packet_info.json`, packet_info, true);
    }
}
