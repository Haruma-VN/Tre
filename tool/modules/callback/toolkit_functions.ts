"use strict";
import Void from "./function_class.js";
import { Console } from "./console.js";
import localization from "./localization.js";
import fs_js from "../library/fs/implement.js";
export namespace Display.ToolKit.Function {
    /**
     *
     * @param evaluate_function_name - Function name
     * @returns render_toolkit_expression
     */
    const execution_evaluate_view = (evaluate_function_name: string): render_toolkit_expression => {
        return (fs_js.read_json(fs_js.functions_json_location as string, true) as js_void)[
            evaluate_function_name
        ] as render_toolkit_expression;
    };
    export const javascript_evaluate: Void = new Void(
        localization("javascript_evaluate"),
        execution_evaluate_view("javascript_evaluate").option,
        execution_evaluate_view("javascript_evaluate").filter,
        execution_evaluate_view("javascript_evaluate").allow,
    );
    export const popcap_resources_split = new Void(
        localization("popcap_resources_split"),
        execution_evaluate_view("popcap_resources_split").option,
        execution_evaluate_view("popcap_resources_split").filter,
        execution_evaluate_view("popcap_resources_split").allow,
    );
    export const popcap_resources_cat: Void = new Void(
        localization("popcap_resources_cat"),
        execution_evaluate_view("popcap_resources_cat").option,
        execution_evaluate_view("popcap_resources_cat").filter,
        execution_evaluate_view("popcap_resources_cat").allow,
    );
    export const popcap_resources_rewrite: Void = new Void(
        localization("popcap_resources_rewrite"),
        execution_evaluate_view("popcap_resources_rewrite").option,
        execution_evaluate_view("popcap_resources_rewrite").filter,
        execution_evaluate_view("popcap_resources_rewrite").allow,
    );
    export const popcap_old_resources_conversion_to_new_resources: Void = new Void(
        localization("popcap_old_resources_conversion_to_new_resources"),
        execution_evaluate_view("popcap_old_resources_conversion_to_new_resources").option,
        execution_evaluate_view("popcap_old_resources_conversion_to_new_resources").filter,
        execution_evaluate_view("popcap_old_resources_conversion_to_new_resources").allow,
    );
    export const popcap_new_resources_conversion_to_old_resources: Void = new Void(
        localization("popcap_new_resources_conversion_to_old_resources"),
        execution_evaluate_view("popcap_new_resources_conversion_to_old_resources").option,
        execution_evaluate_view("popcap_new_resources_conversion_to_old_resources").filter,
        execution_evaluate_view("popcap_new_resources_conversion_to_old_resources").allow,
    );
    export const popcap_resources_local_data_compare = new Void(
        localization("popcap_resources_local_data_compare"),
        execution_evaluate_view("popcap_resources_local_data_compare").option,
        execution_evaluate_view("popcap_resources_local_data_compare").filter,
        execution_evaluate_view("popcap_resources_local_data_compare").allow,
    );
    export const popcap_resources_to_tre_info = new Void(
        localization("popcap_resources_to_tre_info"),
        execution_evaluate_view("popcap_resources_to_tre_info").option,
        execution_evaluate_view("popcap_resources_to_tre_info").filter,
        execution_evaluate_view("popcap_resources_to_tre_info").allow,
    );
    export const popcap_resources_to_atlasinfo = new Void(
        localization("popcap_resources_to_atlasinfo"),
        execution_evaluate_view("popcap_resources_to_atlasinfo").option,
        execution_evaluate_view("popcap_resources_to_atlasinfo").filter,
        execution_evaluate_view("popcap_resources_to_atlasinfo").allow,
    );
    export const popcap_resources_beautify = new Void(
        localization("popcap_resources_beautify"),
        execution_evaluate_view("popcap_resources_beautify").option,
        execution_evaluate_view("popcap_resources_beautify").filter,
        execution_evaluate_view("popcap_resources_beautify").allow,
    );
    export const atlas_info_split = new Void(
        localization("atlas_info_split"),
        execution_evaluate_view("atlas_info_split").option,
        execution_evaluate_view("atlas_info_split").filter,
        execution_evaluate_view("atlas_info_split").allow,
    );
    export const atlas_info_cat = new Void(
        localization("atlas_info_cat"),
        execution_evaluate_view("atlas_info_cat").option,
        execution_evaluate_view("atlas_info_cat").filter,
        execution_evaluate_view("atlas_info_cat").allow,
    );
    export const atlas_info_constructor = new Void(
        localization("atlas_info_constructor"),
        execution_evaluate_view("atlas_info_constructor").option,
        execution_evaluate_view("atlas_info_constructor").filter,
        execution_evaluate_view("atlas_info_constructor").allow,
    );
    export const popcap_atlas_split = new Void(
        localization("popcap_atlas_split"),
        execution_evaluate_view("popcap_atlas_split").option,
        execution_evaluate_view("popcap_atlas_split").filter,
        execution_evaluate_view("popcap_atlas_split").allow,
    );
    export const popcap_atlas_merge_simple = new Void(
        localization("popcap_atlas_merge_simple"),
        execution_evaluate_view("popcap_atlas_merge_simple").option,
        execution_evaluate_view("popcap_atlas_merge_simple").filter,
        execution_evaluate_view("popcap_atlas_merge_simple").allow,
    );
    export const popcap_texture_atlas_merge = new Void(
        localization("popcap_texture_atlas_merge"),
        execution_evaluate_view("popcap_texture_atlas_merge").option,
        execution_evaluate_view("popcap_texture_atlas_merge").filter,
        execution_evaluate_view("popcap_texture_atlas_merge").allow,
    );
    export const popcap_texture_encode_rgba8888 = new Void(
        `PopCap PTX RGBA8888 ${localization("encode")} (0)`,
        execution_evaluate_view("popcap_texture_encode_rgba8888").option,
        execution_evaluate_view("popcap_texture_encode_rgba8888").filter,
        execution_evaluate_view("popcap_texture_encode_rgba8888").allow,
    );
    export const popcap_texture_encode_argb8888 = new Void(
        `PopCap PTX ARGB8888 ${localization("encode")} (0)`,
        execution_evaluate_view("popcap_texture_encode_argb8888").option,
        execution_evaluate_view("popcap_texture_encode_argb8888").filter,
        execution_evaluate_view("popcap_texture_encode_argb8888").allow,
    );
    export const popcap_texture_encode_pvrtc = new Void(
        `PopCap PTX RGB_PVRTC4_A_8 ${localization("encode")} (30)`,
        execution_evaluate_view("popcap_texture_encode_pvrtc").option,
        execution_evaluate_view("popcap_texture_encode_pvrtc").filter,
        execution_evaluate_view("popcap_texture_encode_pvrtc").allow,
    );
    export const popcap_texture_encode_etc1a = new Void(
        `PopCap PTX RGB_ETC1_A_8 ${localization("encode")} (147)`,
        execution_evaluate_view("popcap_texture_encode_etc1a").option,
        execution_evaluate_view("popcap_texture_encode_etc1a").filter,
        execution_evaluate_view("popcap_texture_encode_etc1a").allow,
    );
    export const popcap_texture_encode_etc1a_index = new Void(
        `PopCap PTX RGB_ETC1_A_8_Index ${localization("encode")} (147)`,
        execution_evaluate_view("popcap_texture_encode_etc1a_index").option,
        execution_evaluate_view("popcap_texture_encode_etc1a_index").filter,
        execution_evaluate_view("popcap_texture_encode_etc1a_index").allow,
    );
    export const popcap_texture_decode_rgba8888 = new Void(
        `PopCap PTX RGBA8888 ${localization("decode")} (0)`,
        execution_evaluate_view("popcap_texture_decode_rgba8888").option,
        execution_evaluate_view("popcap_texture_decode_rgba8888").filter,
        execution_evaluate_view("popcap_texture_decode_rgba8888").allow,
    );
    export const popcap_texture_decode_argb8888 = new Void(
        `PopCap PTX ARGB8888 ${localization("decode")} (0)`,
        execution_evaluate_view("popcap_texture_decode_argb8888").option,
        execution_evaluate_view("popcap_texture_decode_argb8888").filter,
        execution_evaluate_view("popcap_texture_decode_argb8888").allow,
    );
    export const popcap_texture_decode_pvrtc = new Void(
        `PopCap PTX RGB_PVRTC4_A_8 ${localization("decode")} (30)`,
        execution_evaluate_view("popcap_texture_decode_pvrtc").option,
        execution_evaluate_view("popcap_texture_decode_pvrtc").filter,
        execution_evaluate_view("popcap_texture_decode_pvrtc").allow,
    );
    export const popcap_texture_decode_etc1a = new Void(
        `PopCap PTX RGB_ETC1_A_8 ${localization("decode")} (147)`,
        execution_evaluate_view("popcap_texture_decode_etc1a").option,
        execution_evaluate_view("popcap_texture_decode_etc1a").filter,
        execution_evaluate_view("popcap_texture_decode_etc1a").allow,
    );
    export const popcap_texture_decode_etc1a_index = new Void(
        `PopCap PTX RGB_ETC1_A_8_Index ${localization("decode")} (147)`,
        execution_evaluate_view("popcap_texture_decode_etc1a_index").option,
        execution_evaluate_view("popcap_texture_decode_etc1a_index").filter,
        execution_evaluate_view("popcap_texture_decode_etc1a_index").allow,
    );
    export const popcap_resize_sprites_simple = new Void(
        localization("popcap_resize_sprites_simple"),
        execution_evaluate_view("popcap_resize_sprites_simple").option,
        execution_evaluate_view("popcap_resize_sprites_simple").filter,
        execution_evaluate_view("popcap_resize_sprites_simple").allow,
    );
    export const popcap_resize_sprites = new Void(
        localization("popcap_resize_sprites"),
        execution_evaluate_view("popcap_resize_sprites").option,
        execution_evaluate_view("popcap_resize_sprites").filter,
        execution_evaluate_view("popcap_resize_sprites").allow,
    );
    export const real_esrgan_upscaler_image = new Void(
        localization("real_esrgan_upscaler_image"),
        execution_evaluate_view("real_esrgan_upscaler_image").option,
        execution_evaluate_view("real_esrgan_upscaler_image").filter,
        execution_evaluate_view("real_esrgan_upscaler_image").allow,
    );
    export const popcap_rsg_unpack = new Void(
        localization("popcap_rsg_unpack"),
        execution_evaluate_view("popcap_rsg_unpack").option,
        execution_evaluate_view("popcap_rsg_unpack").filter,
        execution_evaluate_view("popcap_rsg_unpack").allow,
    );
    export const popcap_rsg_pack = new Void(
        localization("popcap_rsg_pack"),
        execution_evaluate_view("popcap_rsg_pack").option,
        execution_evaluate_view("popcap_rsg_pack").filter,
        execution_evaluate_view("popcap_rsg_pack").allow,
    );
    export const popcap_rsb_unpack = new Void(
        localization("popcap_rsb_unpack"),
        execution_evaluate_view("popcap_rsb_unpack").option,
        execution_evaluate_view("popcap_rsb_unpack").filter,
        execution_evaluate_view("popcap_rsb_unpack").allow,
    );
    export const popcap_rsb_pack = new Void(
        localization("popcap_rsb_pack"),
        execution_evaluate_view("popcap_rsb_pack").option,
        execution_evaluate_view("popcap_rsb_pack").filter,
        execution_evaluate_view("popcap_rsb_pack").allow,
    );
    export const popcap_zlib_uncompress = new Void(
        localization("popcap_zlib_uncompress"),
        execution_evaluate_view("popcap_zlib_uncompress").option,
        execution_evaluate_view("popcap_zlib_uncompress").filter,
        execution_evaluate_view("popcap_zlib_uncompress").allow,
    );
    export const popcap_zlib_compress = new Void(
        localization("popcap_zlib_compress"),
        execution_evaluate_view("popcap_zlib_compress").option,
        execution_evaluate_view("popcap_zlib_compress").filter,
        execution_evaluate_view("popcap_zlib_compress").allow,
    );
    export const popcap_packages_json_split = new Void(
        localization("popcap_packages_json_split"),
        execution_evaluate_view("popcap_packages_json_split").option,
        execution_evaluate_view("popcap_packages_json_split").filter,
        execution_evaluate_view("popcap_packages_json_split").allow,
    );
    export const popcap_packages_json_merge = new Void(
        localization("popcap_packages_json_merge"),
        execution_evaluate_view("popcap_packages_json_merge").option,
        execution_evaluate_view("popcap_packages_json_merge").filter,
        execution_evaluate_view("popcap_packages_json_merge").allow,
    );
    export const json_patch = new Void(
        localization("json_patch"),
        execution_evaluate_view("json_patch").option,
        execution_evaluate_view("json_patch").filter,
        execution_evaluate_view("json_patch").allow,
    );
    export const json_patch_generator = new Void(
        localization("json_patch_generator"),
        execution_evaluate_view("json_patch_generator").option,
        execution_evaluate_view("json_patch_generator").filter,
        execution_evaluate_view("json_patch_generator").allow,
    );
    export const popcap_atlas_pack_cross_resolution = new Void(
        localization("popcap_atlas_pack_cross_resolution"),
        execution_evaluate_view("popcap_atlas_pack_cross_resolution").option,
        execution_evaluate_view("popcap_atlas_pack_cross_resolution").filter,
        execution_evaluate_view("popcap_atlas_pack_cross_resolution").allow,
    );
    export const popcap_lawnstrings_diff = new Void(
        localization("popcap_lawnstrings_diff"),
        execution_evaluate_view("popcap_lawnstrings_diff").option,
        execution_evaluate_view("popcap_lawnstrings_diff").filter,
        execution_evaluate_view("popcap_lawnstrings_diff").allow,
    );
    export const popcap_lawnstrings_convert_to_localization = new Void(
        localization("popcap_lawnstrings_convert_to_localization"),
        execution_evaluate_view("popcap_lawnstrings_convert_to_localization").option,
        execution_evaluate_view("popcap_lawnstrings_convert_to_localization").filter,
        execution_evaluate_view("popcap_lawnstrings_convert_to_localization").allow,
    );
    export const popcap_lawnstrings_convert_from_localization = new Void(
        localization("popcap_lawnstrings_convert_from_localization"),
        execution_evaluate_view("popcap_lawnstrings_convert_from_localization").option,
        execution_evaluate_view("popcap_lawnstrings_convert_from_localization").filter,
        execution_evaluate_view("popcap_lawnstrings_convert_from_localization").allow,
    );
    export const popcap_rton_to_json = new Void(
        localization("popcap_rton_to_json"),
        execution_evaluate_view("popcap_rton_to_json").option,
        execution_evaluate_view("popcap_rton_to_json").filter,
        execution_evaluate_view("popcap_rton_to_json").allow,
    );
    export const popcap_json_to_rton = new Void(
        localization("popcap_json_to_rton"),
        execution_evaluate_view("popcap_json_to_rton").option,
        execution_evaluate_view("popcap_json_to_rton").filter,
        execution_evaluate_view("popcap_json_to_rton").allow,
    );
    export const popcap_rton_decrypt_and_decode = new Void(
        localization("popcap_rton_decrypt_and_decode"),
        execution_evaluate_view("popcap_rton_decrypt_and_decode").option,
        execution_evaluate_view("popcap_rton_decrypt_and_decode").filter,
        execution_evaluate_view("popcap_rton_decrypt_and_decode").allow,
    );
    export const popcap_rton_encode_and_encrypt = new Void(
        localization("popcap_rton_encode_and_encrypt"),
        execution_evaluate_view("popcap_rton_encode_and_encrypt").option,
        execution_evaluate_view("popcap_rton_encode_and_encrypt").filter,
        execution_evaluate_view("popcap_rton_encode_and_encrypt").allow,
    );
    export const popcap_atlas_split_advanced = new Void(
        localization("popcap_atlas_split_advanced"),
        execution_evaluate_view("popcap_atlas_split_advanced").option,
        execution_evaluate_view("popcap_atlas_split_advanced").filter,
        execution_evaluate_view("popcap_atlas_split_advanced").allow,
    );
    export const popcap_atlas_pack_advanced = new Void(
        localization("popcap_atlas_pack_advanced"),
        execution_evaluate_view("popcap_atlas_pack_advanced").option,
        execution_evaluate_view("popcap_atlas_pack_advanced").filter,
        execution_evaluate_view("popcap_atlas_pack_advanced").allow,
    );
    export const popcap_rsg_unpack_simple = new Void(
        localization("popcap_rsg_unpack_simple"),
        execution_evaluate_view("popcap_rsg_unpack_simple").option,
        execution_evaluate_view("popcap_rsg_unpack_simple").filter,
        execution_evaluate_view("popcap_rsg_unpack_simple").allow,
    );
    export const popcap_rsg_pack_simple = new Void(
        localization("popcap_rsg_pack_simple"),
        execution_evaluate_view("popcap_rsg_pack_simple").option,
        execution_evaluate_view("popcap_rsg_pack_simple").filter,
        execution_evaluate_view("popcap_rsg_pack_simple").allow,
    );
    export const popcap_rsb_unpack_simple = new Void(
        localization("popcap_rsb_unpack_simple"),
        execution_evaluate_view("popcap_rsb_unpack_simple").option,
        execution_evaluate_view("popcap_rsb_unpack_simple").filter,
        execution_evaluate_view("popcap_rsb_unpack_simple").allow,
    );
    export const popcap_rsb_pack_simple = new Void(
        localization("popcap_rsb_pack_simple"),
        execution_evaluate_view("popcap_rsb_pack_simple").option,
        execution_evaluate_view("popcap_rsb_pack_simple").filter,
        execution_evaluate_view("popcap_rsb_pack_simple").allow,
    );
    export const popcap_rsb_resource_unpack = new Void(
        localization("popcap_rsb_resource_unpack"),
        execution_evaluate_view("popcap_rsb_resource_unpack").option,
        execution_evaluate_view("popcap_rsb_resource_unpack").filter,
        execution_evaluate_view("popcap_rsb_resource_unpack").allow,
    );
    export const popcap_rsb_resource_pack = new Void(
        localization("popcap_rsb_resource_pack"),
        execution_evaluate_view("popcap_rsb_resource_pack").option,
        execution_evaluate_view("popcap_rsb_resource_pack").filter,
        execution_evaluate_view("popcap_rsb_resource_pack").allow,
    );
    export const popcap_pam_decode = new Void(
        localization("popcap_pam_decode"),
        execution_evaluate_view("popcap_pam_decode").option,
        execution_evaluate_view("popcap_pam_decode").filter,
        execution_evaluate_view("popcap_pam_decode").allow,
    );
    export const popcap_pam_encode = new Void(
        localization("popcap_pam_encode"),
        execution_evaluate_view("popcap_pam_encode").option,
        execution_evaluate_view("popcap_pam_encode").filter,
        execution_evaluate_view("popcap_pam_encode").allow,
    );
    export const popcap_pam_from_gif = new Void(
        localization("popcap_pam_from_gif"),
        execution_evaluate_view("popcap_pam_from_gif").option,
        execution_evaluate_view("popcap_pam_from_gif").filter,
        execution_evaluate_view("popcap_pam_from_gif").allow,
    );
    export const popcap_pam_to_flash = new Void(
        localization("popcap_pam_to_flash"),
        execution_evaluate_view("popcap_pam_to_flash").option,
        execution_evaluate_view("popcap_pam_to_flash").filter,
        execution_evaluate_view("popcap_pam_to_flash").allow,
    );
    export const popcap_flash_to_pam = new Void(
        localization("popcap_flash_to_pam"),
        execution_evaluate_view("popcap_flash_to_pam").option,
        execution_evaluate_view("popcap_flash_to_pam").filter,
        execution_evaluate_view("popcap_flash_to_pam").allow,
    );
    export const wwise_soundbank_decode = new Void(
        localization("wwise_soundbank_decode"),
        execution_evaluate_view("wwise_soundbank_decode").option,
        execution_evaluate_view("wwise_soundbank_decode").filter,
        execution_evaluate_view("wwise_soundbank_decode").allow,
    );
    export const wwise_soundbank_encode = new Void(
        localization("wwise_soundbank_encode"),
        execution_evaluate_view("wwise_soundbank_encode").option,
        execution_evaluate_view("wwise_soundbank_encode").filter,
        execution_evaluate_view("wwise_soundbank_encode").allow,
    );
    export const frame_rate_increasement = new Void(
        localization("frame_rate_increasement"),
        execution_evaluate_view("frame_rate_increasement").option,
        execution_evaluate_view("frame_rate_increasement").filter,
        execution_evaluate_view("frame_rate_increasement").allow,
    );
    export const script_evaluate = new Void(
        localization("script_evaluate"),
        execution_evaluate_view("script_evaluate").option,
        execution_evaluate_view("script_evaluate").filter,
        execution_evaluate_view("script_evaluate").allow,
    );
    export const flash_animation_resize = new Void(
        localization("flash_animation_resize"),
        execution_evaluate_view("flash_animation_resize").option,
        execution_evaluate_view("flash_animation_resize").filter,
        execution_evaluate_view("flash_animation_resize").allow,
    );
    export const popcap_pam_json_to_flash = new Void(
        localization("popcap_pam_json_to_flash"),
        execution_evaluate_view("popcap_pam_json_to_flash").option,
        execution_evaluate_view("popcap_pam_json_to_flash").filter,
        execution_evaluate_view("popcap_pam_json_to_flash").allow,
    );
    export const popcap_flash_to_pam_json = new Void(
        localization("popcap_flash_to_pam_json"),
        execution_evaluate_view("popcap_flash_to_pam_json").option,
        execution_evaluate_view("popcap_flash_to_pam_json").filter,
        execution_evaluate_view("popcap_flash_to_pam_json").allow,
    );
    export const popcap_repair_resources_path = new Void(
        localization("popcap_repair_resources_path"),
        execution_evaluate_view("popcap_repair_resources_path").option,
        execution_evaluate_view("popcap_repair_resources_path").filter,
        execution_evaluate_view("popcap_repair_resources_path").allow,
    );
    export const popcap_animation_viewer = new Void(
        localization("popcap_animation_viewer"),
        execution_evaluate_view("popcap_animation_viewer").option,
        execution_evaluate_view("popcap_animation_viewer").filter,
        execution_evaluate_view("popcap_animation_viewer").allow,
    );
    export const batch_popcap_animation_add_media_content = new Void(
        localization("batch_popcap_animation_add_media_content"),
        execution_evaluate_view("batch_popcap_animation_add_media_content").option,
        execution_evaluate_view("batch_popcap_animation_add_media_content").filter,
        execution_evaluate_view("batch_popcap_animation_add_media_content").allow,
    );
    export const popcap_rsb_disturb = new Void(
        localization("popcap_rsb_disturb"),
        execution_evaluate_view("popcap_rsb_disturb").option,
        execution_evaluate_view("popcap_rsb_disturb").filter,
        execution_evaluate_view("popcap_rsb_disturb").allow,
    );
    export const popcap_res_to_resource = new Void(
        localization("popcap_res_to_resource"),
        execution_evaluate_view("popcap_res_to_resource").option,
        execution_evaluate_view("popcap_res_to_resource").filter,
        execution_evaluate_view("popcap_res_to_resource").allow,
    );
    export const popcap_resource_to_res = new Void(
        localization("popcap_resource_to_res"),
        execution_evaluate_view("popcap_resource_to_res").option,
        execution_evaluate_view("popcap_resource_to_res").filter,
        execution_evaluate_view("popcap_resource_to_res").allow,
    );
    export const popcap_split_res_json = new Void(
        localization("popcap_split_res_json"),
        execution_evaluate_view("popcap_split_res_json").option,
        execution_evaluate_view("popcap_split_res_json").filter,
        execution_evaluate_view("popcap_split_res_json").allow,
    );
    export const popcap_merge_res_json = new Void(
        localization("popcap_merge_res_json"),
        execution_evaluate_view("popcap_merge_res_json").option,
        execution_evaluate_view("popcap_merge_res_json").filter,
        execution_evaluate_view("popcap_merge_res_json").allow,
    );

    export function DisplayItems(
        toolkit_selector_array_list: Array<number>,
        display_item_list: Void,
        is_display_data: boolean = true,
    ): void {
        if (is_display_data) {
            Console.WriteLine(display_item_list.display());
        }
        toolkit_selector_array_list.push(display_item_list.void_number_readline_argument());
        return;
    }

    export function BaseNameChecker(execute_file_dir: string, find_case_in_lower_case: string | number): boolean {
        find_case_in_lower_case =
            typeof find_case_in_lower_case === "number" ? find_case_in_lower_case.toString() : find_case_in_lower_case;
        if (fs_js.parse_fs(execute_file_dir).name.toString().toLowerCase().indexOf(find_case_in_lower_case) !== -1) {
            return true;
        }
        return false;
    }

    export const create_new_functions_view: Array<Void> = [
        javascript_evaluate,
        popcap_resources_split,
        popcap_resources_cat,
        popcap_resources_rewrite,
        popcap_old_resources_conversion_to_new_resources,
        popcap_new_resources_conversion_to_old_resources,
        popcap_resources_local_data_compare,
        popcap_resources_to_tre_info,
        popcap_resources_to_atlasinfo,
        popcap_resources_beautify,
        atlas_info_split,
        atlas_info_cat,
        atlas_info_constructor,
        popcap_atlas_split,
        popcap_atlas_merge_simple,
        popcap_texture_atlas_merge,
        popcap_texture_encode_rgba8888,
        popcap_texture_encode_argb8888,
        popcap_texture_encode_pvrtc,
        popcap_texture_encode_etc1a,
        popcap_texture_encode_etc1a_index,
        popcap_texture_decode_rgba8888,
        popcap_texture_decode_argb8888,
        popcap_texture_decode_pvrtc,
        popcap_texture_decode_etc1a,
        popcap_texture_decode_etc1a_index,
        popcap_resize_sprites_simple,
        popcap_resize_sprites,
        real_esrgan_upscaler_image,
        popcap_rsg_unpack,
        popcap_rsg_pack,
        popcap_rsb_unpack,
        popcap_rsb_pack,
        popcap_zlib_uncompress,
        popcap_zlib_compress,
        popcap_packages_json_split,
        popcap_packages_json_merge,
        json_patch,
        json_patch_generator,
        popcap_atlas_pack_cross_resolution,
        popcap_lawnstrings_diff,
        popcap_lawnstrings_convert_to_localization,
        popcap_lawnstrings_convert_from_localization,
        popcap_rton_to_json,
        popcap_json_to_rton,
        popcap_rton_decrypt_and_decode,
        popcap_rton_encode_and_encrypt,
        popcap_atlas_split_advanced,
        popcap_atlas_pack_advanced,
        popcap_rsg_unpack_simple,
        popcap_rsg_pack_simple,
        popcap_rsb_unpack_simple,
        popcap_rsb_pack_simple,
        popcap_rsb_resource_unpack,
        popcap_rsb_resource_pack,
        popcap_pam_decode,
        popcap_pam_encode,
        popcap_pam_from_gif,
        popcap_pam_to_flash,
        popcap_flash_to_pam,
        wwise_soundbank_decode,
        wwise_soundbank_encode,
        frame_rate_increasement,
        script_evaluate,
        flash_animation_resize,
        popcap_pam_json_to_flash,
        popcap_flash_to_pam_json,
        popcap_repair_resources_path,
        popcap_animation_viewer,
        batch_popcap_animation_add_media_content,
        popcap_rsb_disturb,
        popcap_res_to_resource,
        popcap_resource_to_res,
        popcap_merge_res_json,
        popcap_split_res_json,
    ];
}
