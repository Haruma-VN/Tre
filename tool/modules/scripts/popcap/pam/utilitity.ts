"use strict";
import writepam from "./encode/encode.js";
import fs_js from "../../../library/fs/implement.js";
import read_pam from "./decode/decode.js";
import popcap_pam_from_gif from "./gif/encode.js";
import { atlasinfo_conduct } from "../../default/atlas_info/util.js";
import localization from "../../../callback/localization.js";
import evaluate_modules_workspace_assertation from "../../../callback/evaluate_modules_workspace_assertation.js";
import pamjson2pamflash from "./json_to_flash/json_to_flash.js";
import pamflash_to_pamjson from "./json_from_flash/json_from_flash.js";
import increaseFramerate from "./frame_rate/increase_framerate.js";
import fs_resize from "./flash_resize/fs_resize.js";
import add_content from "./batch/add_content.js";

export { read_pam };

export { add_content };

export async function popcap_pam_encode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false
) {
    const pam_data = await writepam(
        fs_js.read_json(file_system_data_input_argument)
    );
    const file_system_output = `${file_system_data_input_argument}/../${
        fs_js.parse_fs(fs_js.parse_fs(file_system_data_input_argument).name)
            .name
    }.pam`;
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_file(file_system_output, pam_data);
}

export async function popcap_pam_decode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false
) {
    const pam_data = await read_pam(
        await fs_js.read_file(file_system_data_input_argument, "buffer")
    );
    const file_system_output = `${file_system_data_input_argument}/../${
        fs_js.parse_fs(file_system_data_input_argument).name
    }.pam.json`;
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_json(file_system_output, pam_data);
}

export async function gif_to_pam(
    file_system_data_input_argument: string
): Promise<void> {
    const subgroup_name = fs_js.parse_fs(file_system_data_input_argument).name;
    const gif_output_directory = `${file_system_data_input_argument}/../${subgroup_name}_1536.spg`;
    fs_js.execution_out(gif_output_directory);
    const resource_build_json_directory = `${gif_output_directory}/resource_build.json`;
    const pam_json = await popcap_pam_from_gif(
        file_system_data_input_argument,
        gif_output_directory
    );
    const pam_data = await writepam(pam_json);
    const file_system_output = `${file_system_data_input_argument}/../${
        fs_js.parse_fs(file_system_data_input_argument).name
    }.pam`;
    fs_js.execution_out(file_system_output);
    fs_js.write_file(file_system_output, pam_data);
    atlasinfo_conduct(
        gif_output_directory,
        `${gif_output_directory}/Atlasinfo.json`,
        fs_js.read_json(resource_build_json_directory) as resource_build,
        false,
        subgroup_name + "_1536"
    );
    fs_js.js_remove(resource_build_json_directory);
    fs_js.execution_status(
        "success",
        localization("deleted_resource_build_json")
    );
    fs_js.execution_auto(
        `${localization("popcap_pam_from_gif")} ~ ${localization(
            "popcap_texture_atlas_pack_cross_resolution"
        )}`
    );
    await evaluate_modules_workspace_assertation(
        gif_output_directory,
        "popcap_texture_atlas_pack_cross_resolution"
    );
}

export async function popcap_pam_to_flash(
    file_system_data_input_argument: string,
    texture_reslution: number
) {
    await pamjson2pamflash(
        await read_pam(
            await fs_js.read_file(file_system_data_input_argument, "buffer")
        ),
        file_system_data_input_argument,
        texture_reslution
    );
}

export async function popcap_flash_to_pam(
    file_system_data_input_argument: string
) {
    const pam_json = await pamflash_to_pamjson(file_system_data_input_argument);
    const file_system_output = `${file_system_data_input_argument}/../${
        fs_js.parse_fs(file_system_data_input_argument).name
    }.pam`;
    const pam_data = await writepam(pam_json);
    fs_js.write_file(file_system_output, pam_data);
    fs_js.execution_out(fs_js.get_full_path(file_system_output));
}

export async function frame_rate_increasement(
    file_system_data_input_argument: string,
    ratio: 2 | 3 | 4
) {
    const input = file_system_data_input_argument;
    const output = await increaseFramerate(fs_js.read_json(input), ratio);
    const file_system_output = `${file_system_data_input_argument}/../${
        fs_js.parse_fs(fs_js.parse_fs(file_system_data_input_argument).name)
            .name
    }.x${ratio}.pam.json`;
    fs_js.write_json(file_system_output, output);
    fs_js.execution_out(fs_js.get_full_path(file_system_output));
}

export async function popcap_pam_json_to_flash(
    file_system_data_input_argument: string,
    texture_reslution: number
) {
    await pamjson2pamflash(
        fs_js.read_json(file_system_data_input_argument),
        file_system_data_input_argument,
        texture_reslution
    );
}

export async function flash_animation_resize(
    file_system_data_input_argument: string,
    texture_reslution: number
) {
    await fs_resize(file_system_data_input_argument, texture_reslution);
    fs_js.execution_finish(localization("all_flash_resized"));
}

export async function popcap_flash_to_pam_json(
    file_system_data_input_argument: string
) {
    const pam_json = await pamflash_to_pamjson(file_system_data_input_argument);
    const output = `${fs_js.js_dir(file_system_data_input_argument)}/${
        fs_js.parse_fs(file_system_data_input_argument).name
    }.json`;
    fs_js.write_json(output, pam_json);
    fs_js.execution_out(output);
}
