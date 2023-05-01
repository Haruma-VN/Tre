"use strict";
import rton2json from "../../rton/rton2json.js";
import zlib from "zlib";
import { res_split } from "../../../../scripts/popcap/resources/util.js";
import { SmartBuffer } from "smart-buffer";
import fs_js from "../../../../library/fs/implement.js";
export default async function (
    rsg_name_list_uppercase: any,
    rsg_list_info: any,
    rsb_buffer_for_unpacking: any,
    simple_unpack_method: any,
    decode_rton: boolean,
    splitres: boolean,
    rsb_new_extract_folder: any,
) {
    let resources_file_data: any;
    for (let k = rsg_name_list_uppercase.length - 1; k >= 0; k--) {
        if (rsg_name_list_uppercase[k].name_path.indexOf("__MANIFESTGROUP__") !== -1) {
            for (let i = rsg_list_info.length - 1; i >= 0; i--) {
                if (rsg_name_list_uppercase[k].rsg_pool_index === rsg_list_info[i].rsg_item_pool_index) {
                    let resources_rsg_package = rsb_buffer_for_unpacking.slice(
                        rsg_list_info[i].rsg_item_offset,
                        rsg_list_info[i].rsg_item_offset + rsg_list_info[i].rsg_item_size,
                    );
                    if (resources_rsg_package.slice(0, 4).toString() !== "pgsr") {
                        const resources_header_info_repair = new SmartBuffer();
                        resources_header_info_repair.writeString("pgsr").writeInt8(4).writeBuffer(Buffer.alloc(11));
                        resources_header_info_repair.writeBuffer(rsg_list_info[i].rsg_temp_info_fixing_rac_rsb);
                        resources_rsg_package.fill(resources_header_info_repair.toBuffer(), 0, 64);
                    }
                    const resources_zlib_data =
                        resources_rsg_package.slice(28, 32).readUInt32LE() !==
                        resources_rsg_package.slice(32, 36).readUInt32LE()
                            ? zlib.unzipSync(
                                  resources_rsg_package.slice(
                                      resources_rsg_package.slice(24, 28).readUInt32LE(),
                                      resources_rsg_package.slice(24, 28).readUInt32LE() +
                                          resources_rsg_package.slice(28, 32).readUInt32LE(),
                                  ),
                              )
                            : resources_rsg_package.slice(
                                  resources_rsg_package.slice(24, 28).readUInt32LE(),
                                  resources_rsg_package.slice(24, 28).readUInt32LE() +
                                      resources_rsg_package.slice(28, 32).readUInt32LE(),
                              );
                    resources_file_data = rton2json(resources_zlib_data, false);
                    if (
                        rsg_list_info[i].rsg_name_item[126] + rsg_list_info[i].rsg_name_item[127] !== 0 ||
                        resources_rsg_package.slice(0, 4).toString() !== "pgsr"
                    ) {
                        const resources_parse_json = JSON.parse(resources_file_data.slice());
                        const res_rsg_list = new Array();
                        for (let group of resources_parse_json.groups) {
                            if (group.type === "simple") {
                                res_rsg_list.push(group.id);
                            }
                        }
                        for (let rsg_index in rsg_list_info) {
                            for (let key in rsg_name_list_uppercase) {
                                if (
                                    rsg_name_list_uppercase[key].rsg_pool_index ===
                                    rsg_list_info[rsg_index].rsg_item_pool_index
                                ) {
                                    rsg_list_info[rsg_index].rsg_name_item = rsg_name_list_uppercase[key].name_path;
                                    break;
                                }
                            }
                            const rsg_header_info_repair = new SmartBuffer();
                            rsg_header_info_repair.writeString("pgsr").writeInt8(4).writeBuffer(Buffer.alloc(11));
                            rsg_header_info_repair.writeBuffer(rsg_list_info[rsg_index].rsg_temp_info_fixing_rac_rsb);
                            rsb_buffer_for_unpacking.fill(
                                rsg_header_info_repair.toBuffer(),
                                rsg_list_info[rsg_index].rsg_item_offset,
                                rsg_list_info[rsg_index].rsg_item_offset + 64,
                            );
                            rsb_buffer_for_unpacking.fill(
                                Buffer.alloc(4),
                                rsg_list_info[rsg_index].rsg_item_offset + 48,
                                rsg_list_info[rsg_index].rsg_item_offset + 52,
                            );
                        }
                        for (let rsg_pool_index in rsg_list_info) {
                            for (let rsg_name_path in res_rsg_list) {
                                if (
                                    rsg_list_info[rsg_pool_index].rsg_name_item ===
                                    res_rsg_list[rsg_name_path].toUpperCase()
                                ) {
                                    rsg_list_info[rsg_pool_index].rsg_name_item = res_rsg_list[rsg_name_path];
                                    res_rsg_list.splice(rsg_name_path as any, 1);
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let rsg_item in rsg_list_info) {
                            rsg_list_info[rsg_item].rsg_name_item = rsg_list_info[rsg_item].rsg_name_item
                                .slice(0, rsg_list_info[rsg_item].rsg_name_item.indexOf("\x00"))
                                .toString();
                        }
                    }
                    if (simple_unpack_method) {
                        if (decode_rton) {
                            fs_js.outfile_fs(
                                `${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`,
                                resources_file_data,
                            );
                            if (splitres) {
                                res_split(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`, true);
                                fs_js.js_remove(`${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.json`);
                            }
                        } else {
                            fs_js.outfile_fs(
                                `${rsb_new_extract_folder}/Res/PROPERTIES/RESOURCES.rton`,
                                resources_zlib_data,
                            );
                        }
                    }
                    break;
                }
            }
        }
    }
    return [rsb_buffer_for_unpacking, rsg_list_info];
}
