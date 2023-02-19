"use strict";
import cat from "./cat.js";
import resize from "./resize.js";
import { readjson } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
export default async function (dir, width, height, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function) {
    const config_json = readjson("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json");
    // 1536
    await cat(dir, width, height, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function);
    // 768
    console.log("1536 finish");
    const create_768_packet_fast_resize = await resize(dir, 1536, 768);
    await cat(create_768_packet_fast_resize, width / 2, height / 2, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function);
    // 384
    console.log("768 finish");
    if (config_json.atlas.cross_resolution.allow_384) {
        const create_384_packet_fast_resize = await resize(dir, 1536, 384);
        await cat(create_384_packet_fast_resize, width / 4, height / 4, true, display_not_atlas_info, cannot_find_groups_array_in_atlasinfo, cannot_find_subgroup_in_atlas_info, cannot_find_method_in_atlas_info, cannot_get_res_data, not_found_res_indicated_in_subgroups, total_sprites_process_in_thiz_function);
        console.log("384 finish");
    }
}
