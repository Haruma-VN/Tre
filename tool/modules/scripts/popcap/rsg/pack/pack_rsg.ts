"use strict";
import fs_js from "../../../../library/fs/implement.js";
import read_rsg_path from "./read_rsg_path.js";
import encode_data from "./encode_data.js";
import file_list_pack from "./file_list_pack.js";
import write_rsg from "./write_rsg.js";
import { args } from "../../../../implement/arguments.js";
import localization from "../../../../callback/localization.js";
import { ResourceDataTypeContainerStrictlyRequirement, WrongPropertyValue } from "../../../../implement/error.js";
export default function pack_rsg(
    rsg_folder: string,
    packet_info: packet_info | null = null,
    simple_mode: boolean = false,
    return_mode: boolean = false,
    disable_notify: boolean = false,
): Buffer | void {
    if (!disable_notify) fs_js.execution_in(rsg_folder);
    if (packet_info === null && fs_js.js_exists(`${rsg_folder}/packet_info.json`)) {
        packet_info = fs_js.read_json(`${rsg_folder}/packet_info.json`, true) as packet_info;
    }
    const rsg_default_setting: rsg_default_setting = fs_js.create_toolkit_view("packets")
        .default_settings as rsg_default_setting;
    let use_packet_data: boolean | null;
    let rsg_head_version: number;
    let compression_flags: number;
    if (packet_info !== null) {
        use_packet_data = packet_info.use_packet_data ?? (simple_mode ? false : null);
        rsg_head_version = packet_info.head_version;
        compression_flags = packet_info.compression_flags;
    } else {
        use_packet_data = false;
        rsg_head_version = rsg_default_setting.head_version;
        compression_flags = rsg_default_setting.compression_flags;
    }
    const texture_format_mapper: any = fs_js.read_json(
        fs_js.dirname(args.main_js as any) + "/extension/settings/texture_format_mapper.json",
        true,
    );
    {
        if (rsg_default_setting.compression_flags < 0 && rsg_default_setting.compression_flags > 3) {
            throw new ResourceDataTypeContainerStrictlyRequirement(
                localization("compression_flags_out_of_range"),
                fs_js.return_this_tool_toolkit_json_location(),
                localization("unknown_compression_flags"),
            );
        }
        if (typeof rsg_default_setting.rton_encrypted !== "boolean") {
            throw new ResourceDataTypeContainerStrictlyRequirement(
                localization("please_setup_the_key_for_encrypted_rton"),
                fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json",
                localization("no_encrypted_rton_key"),
            );
        }
        if (Object.keys(texture_format_mapper).includes(rsg_default_setting.ptx_platform)) {
            if (
                !Object.keys(texture_format_mapper[rsg_default_setting.ptx_platform]).includes(
                    String(rsg_default_setting.ptx_fmt) as string,
                )
            ) {
                throw new ResourceDataTypeContainerStrictlyRequirement(
                    localization("unknown_setup_for_ptx"),
                    fs_js.dirname(args.main_js as any) + "/extension/settings/texture_format_mapper.json",
                    localization("unknown_setup_for_ptx"),
                );
            }
        } else {
            throw new ResourceDataTypeContainerStrictlyRequirement(
                localization("unknown_setup_for_ptx_platform"),
                fs_js.dirname(args.main_js as any) + "/extension/settings/texture_format_mapper.json",
                localization("unknown_setup_for_ptx_platform"),
            );
        }
    }
    let merge_mode: boolean = false;
    if (!simple_mode && use_packet_data !== null) {
        throw new ResourceDataTypeContainerStrictlyRequirement(
            localization("unknown_pack_rsg_mode"),
            rsg_folder,
            localization("unknown_pack_rsg_mode"),
        );
    } else if (simple_mode && use_packet_data === false) {
        merge_mode = true;
    }
    if (rsg_head_version !== 3 && rsg_head_version !== 4) {
        throw new WrongPropertyValue(
            localization("version_out_of_range"),
            "version",
            rsg_folder,
            localization("version_number_should_be_in_range_3_to_4"),
        );
    }
    if ((compression_flags < 0 && compression_flags > 3) || !Number.isSafeInteger(compression_flags)) {
        throw new ResourceDataTypeContainerStrictlyRequirement(
            localization("compression_flags_out_of_range"),
            fs_js.return_this_tool_toolkit_json_location(),
            localization("unknown_compression_flags"),
        );
    }
    const rsg_path_info: any = read_rsg_path(packet_info, rsg_folder, merge_mode) as any;
    const rsg_file_data: any = encode_data(
        rsg_path_info,
        `${rsg_folder}/res`,
        packet_info,
        rsg_default_setting,
        texture_format_mapper,
        simple_mode,
        merge_mode,
    );
    const rsg_smart_path: path_temp = file_list_pack(rsg_path_info);
    const packet_data: Buffer = write_rsg(rsg_file_data, rsg_smart_path, rsg_head_version, compression_flags);
    if (return_mode) {
        return packet_data;
    } else {
        let file_path: string = `${fs_js.parse_fs(rsg_folder).dir}/${fs_js.parse_fs(rsg_folder).name}`;
        if (!fs_js.js_check_extname(file_path, ".rsg")) file_path += ".rsg";
        fs_js.outfile_fs(file_path, packet_data, disable_notify);
    }
}
