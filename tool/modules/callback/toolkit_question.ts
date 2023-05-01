"use strict";
import localization from "./localization.js";

export namespace Argument.Tre.Packages {
    export const tre_all_module_have_been_loaded: str = `◉ ${localization("module_loaded")}`;
    export const command_execute_in_progress: str = `◉ ${localization("module_start_execution")}`;
    export const module_available: str = `◉ ${localization("module_await_for_command")}`;
    export const js_shell_error: str = `${localization("js_shell_error")}`;
    export const concat_mode_argument_res: str = `◉ ${localization("execution_argument")}: ${localization(
        "concat_mode",
    )}`;
    export const concat_mode_argument_rton: str = `◉ ${localization("execution_argument")}: ${localization(
        "encode_rton",
    )}`;
    export const concat_atlas_width_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "concat_width",
    )}`;
    export const concat_atlas_height_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "concat_height",
    )}`;
    export const decode_width: str = `◉ ${localization("execution_argument")}: ${localization("decode_width")}`;
    export const decode_height: str = `◉ ${localization("execution_argument")}: ${localization("decode_height")}`;
    export const concat_atlas_subgroup_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "concat_subgroup",
    )}`;
    export const popcap_atlas_member_resize_original_quality: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("orig_texture_quality")}`;
    export const popcap_atlas_member_resize_modifier_after_quality: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("new_texture_quality")}`;
    export const method_split_popcap_atlas_texture: str = `◉ ${localization("execution_argument")}: ${localization(
        "method_split",
    )}`;
    export const tre_execution_time_after_process: str = `◉ ${localization("execution_time")}:`;
    export const unknown_reason: str = `${localization("unknown")}`;
    export const error_syntax: str = `${localization("error")}`;
    export const cannot_load_any_modules: str = `◉ ${localization("execution_failed")}: ${localization(
        "assert_no_module_notify",
    )}`;
    export const no_string_has_been_passed: str = `◉ ${localization("execution_failed")}: ${localization(
        "assert_no_module_loaded_notify",
    )}`;
    export const display_cipher_key_readline_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "cipher_key",
    )}`;
    export const execute_all_files_in_queue: str = `◉ ${localization("execution_argument")}: ${localization(
        "execute_all_files_in_queue",
    )}`;
    export const execute_status_finish: str = `◉ ${localization("execution_status")}: ${localization("finish")}`;
    export const execute_file_size: str = `◉ ${localization("execution_size")}:`;
    export const execute_error_log: str = `◉ ${localization("execution_error")}:`;
    export const execute_error_not_valid_directory_path: str = `${localization("not_a_directory")}`;
    export const execute_error_not_valid_file_path: str = `${localization("not_a_valid_file_path")}`;
    export const execute_reminder_quick_tip: str = `◉ ${localization("execution_reminder")}: ${localization(
        "pass_me_an_empty_string_to_stop",
    )}`;
    export const execute_when_there_is_no_directory_passes_in_tre: str = `◉ ${localization(
        "execution_warning",
    )}: ${localization("no_args_found")}`;
    export const skip_this_argument_to_take_folder_name_as_file_name: str = `◉ ${localization(
        "execution_reminder",
    )}: ${localization("skip_this_argument_to_take_folder_name_as_file_name")}`;
    export const execution_warning_log: str = `◉ ${localization("execution_warning")}:`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info = `${localization("not_atlas_info")}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo: str = `${localization(
        "cannot_find_groups_array",
    )}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info: str = `${localization(
        "cannot_find_subgroup_key_string",
    )}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info: str = `${localization(
        "cannot_find_method_key_string",
    )}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info: str = `${localization(
        "cannot_get_res_data",
    )}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups: str = `${localization(
        "cannot_find_res_data_indicated_in_subgroup",
    )}`;
    export const popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void: str = `◉ ${localization(
        "execution_count",
    )}: `;
    export const popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_smart_pack: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("smart_packing_area")}`;
    export const popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_pot: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("pot")}`;
    export const popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_iz_square: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("square_area")}`;
    export const popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_can_be_allow_for_rotation: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("allow_rotation")}`;
    export const popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("padding_size")}`;
    export const popcap_game_zlib_compression_rsg_unpack_boolean_decode_ptx_for_ptx_rsg: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("decode_ptx")}`;
    export const popcap_game_rewrite_mode: str = `◉ ${localization("execution_argument")}: ${localization(
        "rewrite_mode",
    )}`;
    export const popcap_resources_to_atlasinfo_notify_atlas_info_method: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("atlasinfo_method_split")}`;
    export const json_patch_ask_drag_file: str = `◉ ${localization("execution_argument")}: ${localization(
        "json_patch_drag_json_apply_patch",
    )}`;
    export const json_patch_finish_apply_patch: str = `◉ ${localization("execution_finish")}: ${localization(
        "json_patch_applied_patch",
    )}`;
    export const json_patch_generator_execution_received: str = `◉ ${localization(
        "execution_received",
    )}: ${localization("old_json")}`;
    export const json_patch_generator_new_execution_generator: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("new_json")}`;
    export const json_patch_finish_write_patch: str = `◉ ${localization("execution_finish")}: ${localization(
        "generated_patch",
    )}`;
    export const upscaler_real_esrgan_upscale_model: str = `◉ ${localization("execution_argument")}: ${localization(
        "upscale_model",
    )}`;
    export const upscaler_real_esrgan_upscale_ratio: str = `◉ ${localization("execution_argument")}: ${localization(
        "upscale_ratio",
    )}`;
    export const res_cat_concat_mode_safe: str = `      1. ${localization("res_cat_concat_mode_safe")}`;
    export const res_cat_concat_mode_safe_fix: str = `      2. ${localization("res_cat_concat_mode_safe_fix")}`;
    export const res_cat_concat_no_encode_rton: str = `      0. ${localization("res_cat_concat_no_encode_rton")}`;
    export const res_cat_concat_encode_rton: str = `      1. ${localization("res_cat_concat_encode_rton")}`;
    export const default_boolean_with_false: str = `      0. ${localization("default_boolean_with_false")}`;
    export const default_boolean_with_true: str = `      1. ${localization("default_boolean_with_true")}`;
    export const method_split_popcap_atlas_texture_with_path_extension: str = `      1. ${localization(
        "method_split_popcap_atlas_texture_with_path_extension",
    )}`;
    export const method_split_popcap_atlas_texture_with_id_extension: str = `      2. ${localization(
        "method_split_popcap_atlas_texture_with_id_extension",
    )}`;
    export const method_resources_local_compare_drag_input: str = `◉ ${localization(
        "execution_argument",
    )}: ${localization("local_compare_bundle_input_argument")}`;
    export const local_compare_received: str = `◉ ${localization("execution_received")}: ${localization(
        "popcap_resources_local_data_compare_vanilla_res",
    )}`;
    export const popcap_lawnstring_old_obtained: str = `◉ ${localization("execution_received")}: ${localization(
        "popcap_lawnstrings_old_obtained",
    )}`;
    export const popcap_lawnstrings_new_require: str = `◉ ${localization("execution_argument")}: ${localization(
        "popcap_lawnstrings_new_require",
    )}`;
    export const res_rewrite_mode_safe: str = `      1. ${localization("res_rewrite_mode_safe")}`;
    export const res_rewrite_mode_safe_fix: str = `      2. ${localization("res_rewrite_mode_safe_fix")}`;
    export const old_popcap_support: str = `      1. ${localization("old_popcap_support")}`;
    export const new_popcap_support: str = `      2. ${localization("new_popcap_support")}`;
    export const popcap_resource_support_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "popcap_resource_support_argument",
    )}`;
    export const popcap_support_trim: str = `◉ ${localization("execution_argument")}: ${localization(
        "is_trimming_mode",
    )}`;
    export const popcap_flash_animation_resize: str = `◉ ${localization("execution_argument")}: ${localization(
        "flash_animation_resize",
    )}`;
    export const popcap_flash_animation_resize_detail: str = `◉ ${localization(
        "execution_information",
    )}: ${localization("flash_animation_resize_detail")}`;
    export const popcap_packages_json_split_argument: str = `◉ ${localization("execution_argument")}: ${localization(
        "json_split_mode",
    )}`;
    export const windows_explorer_open_reminder: str = `◉ ${localization("execution_reminder")}: ${localization(
        "windows_explorer_open_reminder",
    )}`;
    export const windows_explorer_found_nothing: str = `◉ ${localization("execution_warning")}: ${localization(
        "windows_explorer_found_nothing",
    )}`;
}
