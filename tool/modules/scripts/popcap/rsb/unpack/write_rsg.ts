"use strict";
import fs_js from "../../../../library/fs/implement.js";
import unpack_rsg from "../../rsg/unpack/unpack_rsg.js";
import popcap_resource_to_res from "../../resources/res/encode.js";
import split_res_json from "../../resources/res/split/split.js";
import { ResourceDataTypeContainerStrictlyRequirement } from "../../../../implement/error.js";
import localization from "../../../../callback/localization.js";

export default function write_rsg(
    rsb_path: string,
    rsg_name: string,
    rsg_before_format: number,
    ptx_info_list: Array<{ width: number; height: number; width_plus: number; fmt: number }>,
    composite_folder: string,
    rsg_res_type: number,
    rsg_file_data: Buffer,
    resgroup_method: boolean,
    unpack_packages: boolean,
    decode_rton: boolean,
    split_resjson: boolean,
) {
    if (resgroup_method) {
        if (rsg_name.toUpperCase().includes("__MANIFESTGROUP__")) {
            const res_info: any = unpack_rsg("", rsg_file_data, true, true, true);
            if (res_info.rsg_temp_list.length !== 1) {
                throw new ResourceDataTypeContainerStrictlyRequirement(
                    localization("rsg_has_more_than_one_resource"),
                    rsg_name,
                    "rsg_unpack_error",
                );
            }
            const resource_json = JSON.parse(res_info.rsg_temp_list[0].decode_data.toString("utf8"));
            const res_json = popcap_resource_to_res.do_process_whole(resource_json, `${rsb_path}/res.json`);
            fs_js.write_json(`${rsb_path}/res.json`, res_json, true);
            if (split_resjson) {
                split_res_json.create_conversion(`${rsb_path}/res.json`);
            }
            return Object.fromEntries([
                [
                    rsg_name,
                    {
                        category: [rsg_res_type === 0 ? null : rsg_res_type, null],
                        resources: {
                            head_version: res_info.head_version,
                            compression_flags: res_info.compression_flags,
                        },
                    },
                ],
            ]);
        } else {
            const decode_data_info: any = unpack_rsg("", rsg_file_data, false, true, true);
            for (let i = 0; i < decode_data_info.rsg_temp_list.length; i++) {
                fs_js.outfile_fs(
                    `${rsb_path}/res/${decode_data_info.rsg_temp_list[i].path}`,
                    decode_data_info.rsg_temp_list[i].decode_data,
                    true,
                );
            }
            const package_info = decode_data_info.packet_info;
            for (let i = 0; i < package_info.res; i++) {
                if (package_info.res[i].ptx_info !== undefined) {
                    package_info.res[i].ptx_info.ptx_fmt = ptx_info_list[rsg_before_format + i];
                }
            }
            return Object.fromEntries([
                [
                    rsg_name,
                    {
                        category: [rsg_res_type === 0 ? null : rsg_res_type, null],
                        resources: decode_data_info.packet_info,
                    },
                ],
            ]);
        }
    } else {
        const rsg_path = `${rsb_path}/packet/${composite_folder}/${rsg_name}.rsg`;
        if (unpack_packages && rsg_name.toUpperCase() === "PACKAGES") {
            const package_info: any = unpack_rsg(rsg_path, rsg_file_data, decode_rton, true, true);
            for (let i = 0; i < package_info.rsg_temp_list.length; i++) {
                fs_js.outfile_fs(
                    `${rsb_path}/${package_info.rsg_temp_list[i].path.replace(/^([A-Z]+)/, "packages")}`,
                    package_info.rsg_temp_list[i].decode_data,
                    true,
                );
            }
            return Object.fromEntries([
                [
                    rsg_name,
                    {
                        category: [rsg_res_type === 0 ? null : rsg_res_type, null],
                        resources: {
                            head_version: package_info.packet_info.head_version,
                            compression_flags: package_info.packet_info.compression_flags,
                        },
                    },
                ],
            ]);
        } else if (rsg_name.toUpperCase().includes("__MANIFESTGROUP__")) {
            const res_info: any = unpack_rsg(rsg_path, rsg_file_data, true, true, true);
            if (res_info.rsg_temp_list.length !== 1) {
                throw new ResourceDataTypeContainerStrictlyRequirement(
                    localization("rsg_has_more_than_one_resource"),
                    rsg_path,
                    "rsg_unpack_error",
                );
            }
            const resource_json = JSON.parse(res_info.rsg_temp_list[0].decode_data.toString("utf8"));
            const res_json = popcap_resource_to_res.do_process_whole(resource_json, `${rsb_path}/res.json`);
            fs_js.write_json(`${rsb_path}/res.json`, res_json, true);
            if (split_resjson) {
                split_res_json.create_conversion(`${rsb_path}/res.json`);
            }
            return Object.fromEntries([
                [
                    rsg_name,
                    {
                        category: [rsg_res_type === 0 ? null : rsg_res_type, null],
                        resources: {
                            head_version: res_info.packet_info.head_version,
                            compression_flags: res_info.packet_info.compression_flags,
                        },
                    },
                ],
            ]);
        } else {
            fs_js.outfile_fs(rsg_path, rsg_file_data, true);
            return Object.fromEntries([[rsg_name, { category: [rsg_res_type === 0 ? null : rsg_res_type, null] }]]);
        }
    }
}
