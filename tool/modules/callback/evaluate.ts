"use strict";
import { ModuleNotFound } from "../implement/error.js";
import evaluate_modules_workspace_assertation from "./evaluate_modules_workspace_assertation.js";
import localization from "./localization.js";
import { Display } from "./toolkit_functions.js";
async function create_evaluate_argument(
    execute_file_dir: string | Array<string>,
    input_argument_as_number: number,
): Promise<void> {
    switch (input_argument_as_number) {
        case Display.ToolKit.Function.popcap_rton_to_json.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rton_to_json" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rton_decrypt_and_decode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rton_decrypt_and_decode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.javascript_evaluate.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "javascript_evaluate" as js_evaluate,
            );
            break;
        case Display.ToolKit.Function.popcap_texture_encode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_texture_encode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_split.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_split" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_cat.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_cat" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_texture_decode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_texture_decode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsg_unpack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsg_unpack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsg_unpack_simple.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsg_unpack_simple" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsg_pack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsg_pack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsg_pack_simple.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsg_pack_simple" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_to_tre_info.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_to_tre_info" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_atlas_merge_simple.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_atlas_merge_simple" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_atlas_pack_advanced.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_atlas_pack_advanced" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_atlas_pack_cross_resolution.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_atlas_pack_cross_resolution" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_local_data_compare.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_local_data_compare" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_texture_atlas_merge.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_texture_atlas_merge" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resize_sprites_simple.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resize_sprites_simple" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_json_to_rton.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_json_to_rton" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rton_encode_and_encrypt.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rton_encode_and_encrypt" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_rewrite.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_rewrite" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_packages_json_split.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_packages_json_split" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_packages_json_merge.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_packages_json_merge" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_old_resources_conversion_to_new_resources.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_old_resources_conversion_to_new_resources" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_beautify.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_beautify" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resources_to_atlasinfo.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resources_to_atlasinfo" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_atlas_split.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_atlas_split" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_atlas_split_advanced.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_atlas_split_advanced" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.atlas_info_split.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "atlas_info_split" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.atlas_info_cat.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "atlas_info_cat" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsb_unpack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsb_unpack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsb_resource_unpack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsb_resource_unpack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsb_pack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsb_pack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsb_resource_pack.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsb_resource_pack" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_zlib_compress.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_zlib_compress" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_lawnstrings_convert_to_localization.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_lawnstrings_convert_to_localization" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_lawnstrings_convert_from_localization.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_lawnstrings_convert_from_localization" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_zlib_uncompress.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_zlib_uncompress" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.json_patch.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "json_patch" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.json_patch_generator.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "json_patch_generator" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_lawnstrings_diff.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_lawnstrings_diff" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.real_esrgan_upscaler_image.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "real_esrgan_upscaler_image" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_pam_encode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_pam_encode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_pam_decode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_pam_decode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_pam_from_gif.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_pam_from_gif" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_pam_to_flash.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_pam_to_flash" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_flash_to_pam.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_flash_to_pam" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.wwise_soundbank_decode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "wwise_soundbank_decode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.wwise_soundbank_encode.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "wwise_soundbank_encode" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.frame_rate_increasement.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "frame_rate_increasement" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.script_evaluate.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "script_evaluate" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_new_resources_conversion_to_old_resources.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_new_resources_conversion_to_old_resources" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_flash_to_pam_json.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_flash_to_pam_json" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.flash_animation_resize.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "flash_animation_resize" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_pam_json_to_flash.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_pam_json_to_flash" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_repair_resources_path.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_repair_resources_path" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_animation_viewer.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_animation_viewer" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.batch_popcap_animation_add_media_content.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "batch_popcap_animation_add_media_content" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_rsb_disturb.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_rsb_disturb" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_res_to_resource.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_res_to_resource" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_resource_to_res.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_resource_to_res" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_split_res_json.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_split_res_json" as popcap_game_edit_method,
            );
            break;
        case Display.ToolKit.Function.popcap_merge_res_json.void_number_readline_argument() as evaluate_method:
            await evaluate_modules_workspace_assertation(
                execute_file_dir as assertation_argument,
                "popcap_merge_res_json" as popcap_game_edit_method,
            );
            break;
        default:
            throw new ModuleNotFound(`${localization("cannot_find_module")}`, "undefined") as never;
    }
    return;
}
export default create_evaluate_argument;
