"use strict";
import cat from "./cat.js";
import resize from "./resize.js";
import { readjson } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
import localization from "../../../Tre.Callback/localization.js";
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";

export default async function (dir: string, width: number, height: number, display_not_atlas_info?: string, cannot_find_groups_array_in_atlasinfo?: string, cannot_find_subgroup_in_atlas_info?: string, cannot_find_method_in_atlas_info?: string, cannot_get_res_data?: string, not_found_res_indicated_in_subgroups?: string, total_sprites_process_in_thiz_function?: string): Promise<void> {
    const config_json: any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
    // 1536
    await cat(dir, width, height, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function);
    // 768
    console.log(color.fggreen_string(`◉ ${localization("execution_status")}: ${localization("finish_packing")} 1536`));
    const create_768_packet_fast_resize = await resize(dir, 1536, 768);
    console.log(color.fggreen_string(`◉ ${localization("execution_status")}: ${localization("finish_resize")} 768`));
    await cat(create_768_packet_fast_resize, width / 2, height / 2, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function)
    // 384
    console.log(color.fggreen_string(`◉ ${localization("execution_status")}: ${localization("finish_packing")} 768`));
    if (config_json.atlas.cross_resolution.allow_384) {
        const create_384_packet_fast_resize = await resize(dir, 1536, 384);
        console.log(color.fggreen_string(`◉ ${localization("execution_status")}: ${localization("finish_resize")} 384`));
        await cat(create_384_packet_fast_resize, width / 4, height / 4, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function)
        console.log(color.fggreen_string(`◉ ${localization("execution_status")}: ${localization("finish_packing")} 384`));
    }
}