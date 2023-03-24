"use strict";
import writepam from './encode/write_pam.js';
import fs_js from '../../../library/fs/implement.js';
import read_pam from './decode/read_pam.js';
import path from 'node:path';
import popcap_pam_from_gif from './gif/encode.js';
import { atlasinfo_conduct } from '../../default/atlas_info/util.js';
import localization from '../../../callback/localization.js';
import execute_function_from_core from '../../../callback/execute_from_core.js';
import pamjson2pamflash from './json_to_flash/pamjson_to_pamflash.js';
import pamflash_to_pamjson from './flash_to_json/pamflash_to_pamjson.js'

export async function popcap_pam_encode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false,
) {
    const pam_data = await writepam(fs_js.read_json(file_system_data_input_argument));
    const file_system_output = `${file_system_data_input_argument}/../${path.parse(path.parse(file_system_data_input_argument).name).name}.pam`;
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_file(file_system_output, pam_data);
}


export async function popcap_pam_decode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false,
) {
    const pam_data = await read_pam(await fs_js.read_file(file_system_data_input_argument, 'buffer'));
    const file_system_output = `${file_system_data_input_argument}/../${path.parse(file_system_data_input_argument).name}.pam.json`;
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_json(file_system_output, pam_data);
}

export async function gif_to_pam(
    file_system_data_input_argument: string,
): Promise<void> {
    const subgroup_name = path.parse(file_system_data_input_argument).name;
    const gif_output_directory = `${file_system_data_input_argument}/../${subgroup_name}_1536.spg`;
    fs_js.execution_out(gif_output_directory);
    const resource_build_json_directory = `${gif_output_directory}/resource_build.json`;
    const pam_json = await popcap_pam_from_gif(file_system_data_input_argument, gif_output_directory);
    const pam_data = await writepam(pam_json);
    const file_system_output = `${file_system_data_input_argument}/../${path.parse(file_system_data_input_argument).name}.pam`;
    fs_js.execution_out(file_system_output);
    fs_js.write_file(file_system_output, pam_data);
    atlasinfo_conduct(gif_output_directory, `${gif_output_directory}/Atlasinfo.json`,
        fs_js.read_json(resource_build_json_directory) as resource_build, false, subgroup_name + "_1536");
    fs_js.js_remove(resource_build_json_directory);
    fs_js.execution_status("success", localization("deleted_resource_build_json"));
    fs_js.execution_auto(`${localization("popcap_pam_from_gif")} ~ ${localization("popcap_texture_atlas_pack_cross_resolution")}`);
    await execute_function_from_core(gif_output_directory, "popcap_texture_atlas_pack_cross_resolution");
}

export async function popcap_pam_to_flash(
    file_system_data_input_argument: string,
    texture_reslution: number,
) {
    await pamjson2pamflash(await read_pam(await fs_js.read_file(file_system_data_input_argument, 'buffer')), file_system_data_input_argument, texture_reslution);
}

export async function popcap_flash_to_pam(
    file_system_data_input_argument: string,
) {
    const pam_json = await pamflash_to_pamjson(file_system_data_input_argument);
    const file_system_output = `${file_system_data_input_argument}/../${path.parse(file_system_data_input_argument).name}.pam`;
    const pam_data = await writepam(pam_json);
    fs_js.write_file(file_system_output, pam_data);
    fs_js.execution_out(fs_js.get_full_path(file_system_output));
}