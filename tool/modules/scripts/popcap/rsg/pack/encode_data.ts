"use strict";
import fs_js from "../../../../library/fs/implement.js";
import json_2_rton from "../../rton/json2rton.js";
import pam_encode from "../../pam/encode/encode.js";
import pam_xfl_encode from "../../pam/json_from_flash/json_from_flash.js";
import wwise_encode from "../../wwise/encode_simple.js";
import encode_texture from "./encode_texture.js";
import localization from "../../../../callback/localization.js";
export default function encode_data(
    rsg_path_info: rsg_path_info,
    rsg_folder: string,
    packet_info: any,
    rsg_default_setting: rsg_default_setting,
    texture_format_mapper: any,
    simple_mode: boolean,
    merge_mode: boolean,
): any {
    const rsg_file_data: any = new Array();
    let ptx_info: {
        id: number;
        width: number;
        height: number;
    } | null = null;
    let merge_mode_ptx_id: [number] = [0];
    for (let i = 0; i < rsg_path_info.length; i++) {
        const item_ext: string = fs_js.js_extname(`${rsg_folder}/${rsg_path_info[i].path}`, false, true);
        if (simple_mode) {
            if (item_ext === ".JSON" && `${rsg_folder}/${rsg_path_info[i].path}`.endsWith(".PAM.JSON")) {
                const animation_json: any = fs_js.read_json(`${rsg_folder}/${rsg_path_info[i].path}`, true) as any;
                const item_data: Buffer = pam_encode(animation_json, `${rsg_folder}/${rsg_path_info[i].path}`);
                rsg_file_data.push({ item_data, ptx_info: null });
                rsg_path_info[i].path = rsg_path_info[i].path.slice(0, rsg_path_info[i].path.length - item_ext.length);
                rsg_path_info[i].packet_index = i;
            } else if (item_ext === ".JSON") {
                const json_data: any = fs_js.read_json(`${rsg_folder}/${rsg_path_info[i].path}`, true) as any;
                if (merge_mode) {
                    rsg_file_data.push({
                        item_data: json_2_rton(
                            json_data,
                            rsg_default_setting.rton_encrypted,
                            true,
                            `${rsg_folder}/${rsg_path_info[i].path}`,
                        ) as Buffer,
                        ptx_info: null,
                    });
                } else {
                    const rton_encrypted: boolean = packet_info.res[rsg_path_info[i].manifest_index] ?? false;
                    rsg_file_data.push({
                        item_data: json_2_rton(
                            json_data,
                            rton_encrypted,
                            true,
                            `${rsg_folder}/${rsg_path_info[i].path}`,
                        ) as Buffer,
                        ptx_info: null,
                    });
                }
                rsg_path_info[i].path =
                    rsg_path_info[i].path.slice(0, rsg_path_info[i].path.length - item_ext.length) + ".RTON";
                rsg_path_info[i].packet_index = i;
            } else if (item_ext === ".XFL") {
                const animation_json: any = pam_xfl_encode(`${rsg_folder}/${rsg_path_info[i].path}`) as any;
                const item_data: Buffer = pam_encode(animation_json, `${rsg_folder}/${rsg_path_info[i].path}`);
                rsg_file_data.push({ item_data, ptx_info: null });
                rsg_path_info[i].path = rsg_path_info[i].path.slice(0, rsg_path_info[i].path.length - item_ext.length);
                rsg_path_info[i].packet_index = i;
            } else if (item_ext === ".SOUNDBANK") {
                const item_data: Buffer = wwise_encode(`${rsg_folder}/${rsg_path_info[i].path}`, true) as Buffer;
                rsg_file_data.push({ item_data, ptx_info: null });
                rsg_path_info[i].path = rsg_path_info[i].path.slice(0, rsg_path_info[i].path.length - item_ext.length);
                rsg_path_info[i].packet_index = i;
            } else if (item_ext === ".PNG") {
                const texture_info = encode_texture(
                    fs_js.read_file(`${rsg_folder}/${rsg_path_info[i].path}`, "buffer") as Buffer,
                    merge_mode,
                    merge_mode_ptx_id,
                    rsg_default_setting,
                    texture_format_mapper,
                    merge_mode ? undefined : packet_info.res[rsg_path_info[i].manifest_index].ptx_info,
                );
                rsg_file_data.push(texture_info);
                rsg_path_info[i].path =
                    rsg_path_info[i].path.slice(0, rsg_path_info[i].path.length - item_ext.length) + ".PTX";
                rsg_path_info[i].packet_index = i;
            } else {
                if (item_ext === ".PTX" && !merge_mode) {
                    if (packet_info.res[rsg_path_info[i].manifest_index].ptx_info === undefined) {
                        throw new Error(
                            `${localization("expect_ptx_info").replace(/\{\}/g, "PTX Info")} ${rsg_path_info[i].path}`,
                        );
                    } else {
                        ptx_info = packet_info.res[rsg_path_info[i].manifest_index].ptx_info;
                    }
                }
                const item_data: Buffer = fs_js.read_file(`${rsg_folder}/${rsg_path_info[i].path}`, "buffer") as Buffer;
                rsg_file_data.push({ item_data, ptx_info });
                rsg_path_info[i].packet_index = i;
            }
        } else {
            if (item_ext === ".PTX") {
                if (packet_info.res[rsg_path_info[i].manifest_index].ptx_info === undefined) {
                    throw new Error(
                        `${localization("expect_ptx_info").replace(/\{\}/g, "PTX Info")} ${rsg_path_info[i].path}`,
                    );
                } else {
                    ptx_info = packet_info.res[rsg_path_info[i].manifest_index].ptx_info;
                }
            }
            const item_data: Buffer = fs_js.read_file(`${rsg_folder}/${rsg_path_info[i].path}`, "buffer") as Buffer;
            rsg_file_data.push({ item_data, ptx_info });
            rsg_path_info[i].packet_index = i;
        }
    }
    return rsg_file_data;
}
