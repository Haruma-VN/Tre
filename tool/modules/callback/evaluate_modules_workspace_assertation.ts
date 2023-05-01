"use strict";
import animation_viewer from "../scripts/popcap/pam/animation_viewer/generate_animation.js";
import {
    decode_argb8888,
    decode_rgba8888,
    encode_argb8888,
    encode_rgba8888,
    encode_etc1a,
    encode_pvrtc,
    decode_etc1a,
    decode_pvrtc,
    decode_etc1alpha_palette,
    encode_etc1alpha_palette,
} from "../library/img/util.js";
import {
    res_pack,
    res_split,
    res_rewrite,
    LocalResourcesCompare,
    small_res_beautify,
    AdaptPvZ2InternationalResPath,
    RepairPvZ2CResourcesPath,
} from "../scripts/popcap/resources/util.js";
import {
    atlas_split,
    atlas_cat,
    resize_atlas,
    restoAtlasinfo,
    cross_resolution,
    atlas_split_advanced,
    atlas_pack_advanced,
} from "../scripts/popcap/atlas/util.js";
import { Argument } from "./toolkit_question.js";
import { Console } from "./console.js";
import { atlas_info_cat, atlas_info_split, atlasinfo_conduct } from "../scripts/default/atlas_info/util.js";
import * as color from "../library/color/color.js";
import { unpack_rsg, pack_rsg } from "../scripts/popcap/rsg/util.js";
import readline_for_json from "./public/input/readline_for_json.js";
import applyPatch from "../library/json/patch.js";
import generatePatch from "../library/json/generate_patch.js";
import * as ImagesUtilities from "../library/img/util.js";
import * as popcap_game_content_edit from "../scripts/popcap/rsb/util.js";
import { Lawnstrings } from "../scripts/popcap/localization/lawnstrings.js";
import PopCapPackages from "../scripts/popcap/json/util.js";
import RSBInfo from "../scripts/default/support/util.js";
import {
    popcap_rton_to_json,
    popcap_json_to_rton,
    rton_decrypt_and_decode_to_json,
    popcap_json_to_rton_and_encrypt,
} from "../scripts/popcap/rton/util.js";
import js_checker from "./default/checker.js";
import localization from "./localization.js";
import fs_js from "../library/fs/implement.js";
import {
    popcap_pam_decode,
    popcap_pam_encode,
    gif_to_pam,
    popcap_flash_to_pam,
    popcap_pam_to_flash,
    frame_rate_increasement,
    popcap_flash_to_pam_json,
    popcap_pam_json_to_flash,
    flash_animation_resize,
    add_content,
    read_pam,
} from "../scripts/popcap/pam/utilitity.js";
import { evaluate_test, sort_atlas_area } from "../scripts/helper/utility.js";
import input_set from "./public/suggestion/input.js";
import { popcap_bnk_decode, popcap_bnk_encode } from "../scripts/popcap/wwise/util.js";
import { create_evaluate } from "./helper/util.js";
import popcap_rsb_disturb from "../scripts/default/scrapped/disturb.js";
import input_img from "./public/img/input_img.js";
import popcap_resource_to_res from "../scripts/popcap/resources/res/encode.js";
import popcap_res_to_resource from "../scripts/popcap/resources/res/to_official.js";
import js_evaluate from "./jsshell.js";
import merge_res_json from "../scripts/popcap/resources/res/merge/merge.js";
import split_res_json from "../scripts/popcap/resources/res/split/split.js";

/**
 *
 * @param {*} evaluate_js_modules_workspace_assertation
 *  - Evaluate the function being called
 * @param {*} execute_file_dir -
 *  Pass an argument or file path here
 * @param method - Pass in the methods & arguments to start
 * @returns - evaluate success
 */

async function evaluate_js_modules_workspace_assertation(
    /**
     * @param {*} execute_file_dir -
     * Pass an argument or file path here
     */
    execute_file_dir: string | string[],
    /**
     * @param {*} method - Pass an method to evaluate here
     */
    method: string,
): Promise<void> {
    /**
     * @param {*} width - Reusable variable, obtains for width
     */
    let width: number = 0;
    /**
     * @param {*} height - Reusable variable, obtains for height
     */
    let height: number = 0;
    /**
     * @param {*} check_if_the_directories_iz_folder -
     * Check if the argument passed is a string or an folder
     * @param - If it's a folder, evaluate everything inside it,
     *  perhaps
     */
    const check_if_the_directories_iz_folder: boolean =
        !js_checker.is_array(execute_file_dir) && fs_js.is_file(execute_file_dir) ? false : true;
    /**
     * @param {*} arguments_default_modifier -
     * Parse the JSON in "/extension/settings/functions.json"
     * @error - Throw an error if the json is invalid
     * @param - If the parsing success, loads modules
     */
    const arguments_default_modifier: any = fs_js.read_json(fs_js.functions_json_location as string, true);
    fs_js.execution_start(localization(method));
    // todo -> adding configuration for popcap_pam_resolution
    switch (method as str) {
        case "popcap_resource_to_res" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_resource_to_res.create_conversion(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    popcap_resource_to_res.create_conversion(file);
                });
            }
            break;
        case "popcap_split_res_json" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                split_res_json.create_conversion(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    split_res_json.create_conversion(file);
                });
            }
            break;
        case "popcap_merge_res_json" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                merge_res_json.create_conversion(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    merge_res_json.create_conversion(file);
                });
            }
            break;
        case "popcap_res_to_resource" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_res_to_resource.create_conversion(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    popcap_res_to_resource.create_conversion(file);
                });
            }
            break;
        case "batch_popcap_animation_add_media_content" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const images_add: Array<string> = await input_img();
                Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                fs_js.flash_anim_resize_notify();
                const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                await add_content(images_add, execute_file_dir, popcap_pam_resolution as 1536 | 768 | 384 | 640 | 1200);
            } else {
                execute_file_dir.forEach(async (file) => {
                    const images_add: Array<string> = await input_img();
                    Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                    Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                    fs_js.flash_anim_resize_notify();
                    const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                    await add_content(images_add, file, popcap_pam_resolution as 1536 | 768 | 384 | 640 | 1200);
                });
            }
            break;
        case "flash_animation_resize" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                fs_js.flash_anim_resize_notify();
                const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                await flash_animation_resize(execute_file_dir, popcap_pam_resolution);
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                    Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                    fs_js.flash_anim_resize_notify();
                    const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                    await flash_animation_resize(file, popcap_pam_resolution);
                });
            }
            break;
        case "flash_animation_resize" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                fs_js.flash_anim_resize_notify();
                const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                await flash_animation_resize(execute_file_dir, popcap_pam_resolution);
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                    Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                    fs_js.flash_anim_resize_notify();
                    const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                    await flash_animation_resize(file, popcap_pam_resolution);
                });
            }
            break;
        case "popcap_flash_to_pam_json" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_flash_to_pam_json(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await popcap_flash_to_pam_json(file);
                });
            }
            break;
        case "popcap_repair_resources_path" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                RepairPvZ2CResourcesPath(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    RepairPvZ2CResourcesPath(file);
                });
            }
            break;
        case "popcap_pam_json_to_flash" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                fs_js.flash_anim_resize_notify();
                const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                await popcap_pam_json_to_flash(execute_file_dir, popcap_pam_resolution);
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                    Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                    fs_js.flash_anim_resize_notify();
                    const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                    await popcap_pam_json_to_flash(file, popcap_pam_resolution);
                });
            }
            break;
        case "popcap_pam_from_gif" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await gif_to_pam(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await gif_to_pam(file);
                });
            }
            break;
        case "frame_rate_increasement" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_encoding: 0 | 4 | 2 | 3 =
                    arguments_default_modifier.frame_rate_increasement.arguments.ratio !== undefined &&
                    arguments_default_modifier.frame_rate_increasement.arguments.ratio !== null &&
                    arguments_default_modifier.frame_rate_increasement.arguments.ratio !== void 0 &&
                    (typeof arguments_default_modifier.frame_rate_increasement.arguments.ratio === "string" ||
                        Number.isInteger(arguments_default_modifier.frame_rate_increasement.arguments.ratio)) &&
                    arguments_default_modifier.frame_rate_increasement.arguments.ratio !== "?" &&
                    (parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 2 ||
                        parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 3 ||
                        parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 4)
                        ? (parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) as 2 | 3 | 4)
                        : 0;
                if (argument_checker_for_encoding === 0) {
                    fs_js.execution_notify("argument", localization("frame_rate_increasement_detail"));
                    Console.WriteLine(input_set.create_instant_void("notify", 2, localization("frame_rate_ratio_x2")));
                    Console.WriteLine(input_set.create_instant_void("notify", 3, localization("frame_rate_ratio_x3")));
                    Console.WriteLine(input_set.create_instant_void("notify", 4, localization("frame_rate_ratio_x4")));
                } else {
                    let execution_message: string;
                    switch (argument_checker_for_encoding) {
                        case 2:
                            execution_message = localization("frame_rate_ratio_x2");
                            break;
                        case 3:
                            execution_message = localization("frame_rate_ratio_x3");
                            break;
                        case 4:
                            execution_message = localization("frame_rate_ratio_x4");
                            break;
                        default:
                            throw new Error(`${localization("failed_to_read_frame_rate_argument")}`) as never;
                    }
                    fs_js.execution_auto(`${localization("frame_rate_increasement")} ~ ${execution_message}`);
                }
                const ratio: number =
                    argument_checker_for_encoding === 0 ? Console.IntegerReadLine(2, 4) : argument_checker_for_encoding;
                await frame_rate_increasement(execute_file_dir, ratio as 2 | 3 | 4);
            } else {
                execute_file_dir.forEach(async (file) => {
                    const argument_checker_for_encoding: 0 | 4 | 2 | 3 =
                        arguments_default_modifier.frame_rate_increasement.arguments.ratio !== undefined &&
                        arguments_default_modifier.frame_rate_increasement.arguments.ratio !== null &&
                        arguments_default_modifier.frame_rate_increasement.arguments.ratio !== void 0 &&
                        (typeof arguments_default_modifier.frame_rate_increasement.arguments.ratio === "string" ||
                            Number.isInteger(arguments_default_modifier.frame_rate_increasement.arguments.ratio)) &&
                        arguments_default_modifier.frame_rate_increasement.arguments.ratio !== "?" &&
                        (parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 2 ||
                            parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 3 ||
                            parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) === 4)
                            ? (parseInt(arguments_default_modifier.frame_rate_increasement.arguments.ratio) as
                                  | 2
                                  | 3
                                  | 4)
                            : 0;
                    if (argument_checker_for_encoding === 0) {
                        fs_js.execution_notify("argument", localization("frame_rate_increasement_detail"));
                        Console.WriteLine(
                            input_set.create_instant_void("notify", 2, localization("frame_rate_ratio_x2")),
                        );
                        Console.WriteLine(
                            input_set.create_instant_void("notify", 3, localization("frame_rate_ratio_x3")),
                        );
                        Console.WriteLine(
                            input_set.create_instant_void("notify", 4, localization("frame_rate_ratio_x4")),
                        );
                    } else {
                        let execution_message: string;
                        switch (argument_checker_for_encoding) {
                            case 2:
                                execution_message = localization("frame_rate_ratio_x2");
                                break;
                            case 3:
                                execution_message = localization("frame_rate_ratio_x3");
                                break;
                            case 4:
                                execution_message = localization("frame_rate_ratio_x4");
                                break;
                            default:
                                throw new Error(`${localization("failed_to_read_frame_rate_argument")}`) as never;
                        }
                        fs_js.execution_auto(`${localization("frame_rate_increasement")} ~ ${execution_message}`);
                    }
                    const ratio: number =
                        argument_checker_for_encoding === 0
                            ? Console.IntegerReadLine(2, 4)
                            : argument_checker_for_encoding;
                    await frame_rate_increasement(file, ratio as 2 | 3 | 4);
                });
            }
            break;
        case "popcap_rton_to_json" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_rton_to_json(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    popcap_rton_to_json(file);
                });
            }
            break;
        case "popcap_rton_to_json" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_rton_to_json(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    popcap_rton_to_json(file);
                });
            }
            break;
        case "popcap_rsb_disturb" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const popcap_rsb_disturbed_finish: Buffer = popcap_rsb_disturb(
                    fs_js.read_file(execute_file_dir, "buffer"),
                );
                const output_argument_set = `${execute_file_dir}/../${fs_js.parse_fs(execute_file_dir).base}.disturb`;
                fs_js.write_file(output_argument_set, popcap_rsb_disturbed_finish);
                fs_js.execution_out(output_argument_set);
            } else {
                execute_file_dir.forEach((file) => {
                    const popcap_rsb_disturbed_finish: Buffer = popcap_rsb_disturb(fs_js.read_file(file, "buffer"));
                    const output_argument_set = `${file}/../${fs_js.parse_fs(file).base}.disturb`;
                    fs_js.write_file(output_argument_set, popcap_rsb_disturbed_finish);
                    fs_js.execution_out(output_argument_set);
                });
            }
            break;
        case "script_evaluate" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await create_evaluate(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await create_evaluate(file);
                });
            }
            break;
        case "popcap_flash_to_pam" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_flash_to_pam(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await popcap_rton_to_json(file);
                });
            }
            break;
        case "popcap_pam_to_flash" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                fs_js.flash_anim_resize_notify();
                const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                await popcap_pam_to_flash(execute_file_dir, popcap_pam_resolution);
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(Argument.Tre.Packages.popcap_flash_animation_resize));
                    Console.WriteLine(color.fggreen_string(Argument.Tre.Packages.popcap_flash_animation_resize_detail));
                    fs_js.flash_anim_resize_notify();
                    const popcap_pam_resolution: number = Console.TextureQualityReadLine();
                    await popcap_pam_to_flash(file, popcap_pam_resolution);
                });
            }
            break;
        case "popcap_rton_decrypt_and_decode" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                rton_decrypt_and_decode_to_json(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.js_check_extname(file, ".rton")) {
                        rton_decrypt_and_decode_to_json(file);
                    }
                });
            }
            break;
        case "popcap_pam_decode" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_pam_decode(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await popcap_pam_decode(file);
                });
            }
            break;
        case "popcap_pam_encode" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_pam_encode(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await popcap_pam_encode(file);
                });
            }
            break;
        case "javascript_evaluate" as popcap_game_edit_method:
            try {
                if (!js_checker.is_array(execute_file_dir)) {
                    await js_evaluate(execute_file_dir);
                }
            } catch (error: any) {
                throw new Error(error.message as evaluate_error);
            }
            break;
        case "popcap_texture_encode_rgba8888" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await encode_rgba8888(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file: string) => {
                    if (
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".png" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpg" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpeg"
                    ) {
                        await encode_rgba8888(file);
                    }
                });
            }
            break;
        case "popcap_texture_encode_argb8888" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await encode_argb8888(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file: string) => {
                    if (
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".png" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpg" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpeg"
                    ) {
                        await encode_argb8888(file);
                    }
                });
            }
            break;
        case "popcap_texture_encode_etc1a" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await encode_etc1a(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file: string) => {
                    if (
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".png" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpg" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpeg"
                    ) {
                        await encode_etc1a(file);
                    }
                });
            }
            break;
        case "popcap_texture_encode_etc1a_index" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await encode_etc1alpha_palette(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file: string) => {
                    if (
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".png" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpg" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpeg"
                    ) {
                        await encode_etc1alpha_palette(file);
                    }
                });
            }
            break;
        case "popcap_texture_encode_pvrtc" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await encode_pvrtc(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file: string) => {
                    if (
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".png" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpg" ||
                        fs_js.parse_fs(file).ext.toString().toLowerCase() === ".jpeg"
                    ) {
                        await encode_pvrtc(file);
                    }
                });
            }
            break;
        case "popcap_resources_split" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                res_split(execute_file_dir);
            } else {
                execute_file_dir.forEach((execution_waiting) => {
                    if (fs_js.js_check_extname(execution_waiting, ".json")) {
                        res_split(execution_waiting);
                    }
                });
            }
            break;
        case "popcap_resources_cat" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_mode: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_resources_cat.arguments.mode !== undefined &&
                    arguments_default_modifier.popcap_resources_cat.arguments.mode !== null &&
                    arguments_default_modifier.popcap_resources_cat.arguments.mode !== void 0 &&
                    (typeof arguments_default_modifier.popcap_resources_cat.arguments.mode === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_resources_cat.arguments.mode)) &&
                    arguments_default_modifier.popcap_resources_cat.arguments.mode !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) === 1 ||
                        parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) === 2)
                        ? (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) as 1 | 2)
                        : 0;
                if (argument_checker_for_mode === 0) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_res}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe_fix}`);
                }
                if (argument_checker_for_mode !== 0) {
                    const execution_information_message: string =
                        argument_checker_for_mode === 1
                            ? localization("res_cat_concat_mode_safe")
                            : localization("res_cat_concat_mode_safe_fix");
                    fs_js.execution_auto(`${localization("popcap_resources_cat")} ~ ${execution_information_message}`);
                }
                const mode: number =
                    argument_checker_for_mode !== 0 ? argument_checker_for_mode : Console.IntegerReadLine(1, 2);
                const argument_checker_for_encoding: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_resources_cat.arguments.encode !== undefined &&
                    arguments_default_modifier.popcap_resources_cat.arguments.encode !== null &&
                    arguments_default_modifier.popcap_resources_cat.arguments.encode !== void 0 &&
                    (typeof arguments_default_modifier.popcap_resources_cat.arguments.encode === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_resources_cat.arguments.encode)) &&
                    arguments_default_modifier.popcap_resources_cat.arguments.encode !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) === 1 ||
                        parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) as 0 | 1)
                        : 2;
                if (argument_checker_for_encoding === 2) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                }
                if (argument_checker_for_encoding !== 2) {
                    const execution_information_message: string =
                        argument_checker_for_encoding === 0
                            ? localization("res_cat_concat_no_encode_rton")
                            : localization("res_cat_concat_encode_rton");
                    fs_js.execution_auto(`${localization("popcap_resources_cat")} ~ ${execution_information_message}`);
                }
                const encode: number =
                    argument_checker_for_encoding === 2 ? Console.IntegerReadLine(0, 1) : argument_checker_for_encoding;
                res_pack(execute_file_dir, mode, encode);
            } else {
                execute_file_dir.forEach((execution_waiting) => {
                    if (fs_js.is_directory(execution_waiting)) {
                        const argument_checker_for_mode: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_resources_cat.arguments.mode !== undefined &&
                            arguments_default_modifier.popcap_resources_cat.arguments.mode !== null &&
                            arguments_default_modifier.popcap_resources_cat.arguments.mode !== void 0 &&
                            (typeof arguments_default_modifier.popcap_resources_cat.arguments.mode === "string" ||
                                Number.isInteger(arguments_default_modifier.popcap_resources_cat.arguments.mode)) &&
                            arguments_default_modifier.popcap_resources_cat.arguments.mode !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) === 1 ||
                                parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) === 2)
                                ? (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.mode) as 1 | 2)
                                : 0;
                        if (argument_checker_for_mode === 0) {
                            Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_res}`));
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe}`);
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe_fix}`);
                        }
                        const mode: number =
                            argument_checker_for_mode !== 0 ? argument_checker_for_mode : Console.IntegerReadLine(1, 2);
                        const argument_checker_for_encoding: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_resources_cat.arguments.encode !== undefined &&
                            arguments_default_modifier.popcap_resources_cat.arguments.encode !== null &&
                            arguments_default_modifier.popcap_resources_cat.arguments.encode !== void 0 &&
                            (typeof arguments_default_modifier.popcap_resources_cat.arguments.encode === "string" ||
                                Number.isInteger(arguments_default_modifier.popcap_resources_cat.arguments.encode)) &&
                            arguments_default_modifier.popcap_resources_cat.arguments.encode !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) === 1 ||
                                parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_resources_cat.arguments.encode) as 0 | 1)
                                : 2;
                        if (argument_checker_for_encoding === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                        }
                        const encode: number =
                            argument_checker_for_encoding === 2
                                ? Console.IntegerReadLine(0, 1)
                                : argument_checker_for_encoding;
                        res_pack(execution_waiting, mode, encode);
                    }
                });
            }
            break;
        case "popcap_texture_decode_rgba8888" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                width = Console.IntegerReadLine(1, 16384);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                height = Console.IntegerReadLine(1, 16384);
                await decode_rgba8888(execute_file_dir, width, height);
            } else {
                execute_file_dir.forEach(async (execution_waiting) => {
                    if (fs_js.js_check_extname(execution_waiting, ".ptx")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        height = Console.IntegerReadLine(1, 16384);
                        await decode_rgba8888(execution_waiting, width, height);
                    }
                });
            }
            break;
        case "popcap_texture_decode_argb8888" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                width = Console.IntegerReadLine(1, 16384);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                height = Console.IntegerReadLine(1, 16384);
                await decode_argb8888(execute_file_dir, width, height);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.js_check_extname(file, ".ptx")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        height = Console.IntegerReadLine(1, 16384);
                        await decode_argb8888(file, width, height);
                    }
                });
            }
            break;
        case "popcap_texture_decode_etc1a" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                width = Console.IntegerReadLine(1, 16384);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                height = Console.IntegerReadLine(1, 16384);
                await decode_etc1a(execute_file_dir, width, height);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.js_check_extname(file, ".ptx")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        height = Console.IntegerReadLine(1, 16384);
                        await decode_etc1a(file, width, height);
                    }
                });
            }
            break;
        case "popcap_texture_decode_etc1a_index" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                width = Console.IntegerReadLine(1, 16384);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                height = Console.IntegerReadLine(1, 16384);
                await decode_etc1alpha_palette(execute_file_dir, width, height);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.js_check_extname(file, ".ptx")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        height = Console.IntegerReadLine(1, 16384);
                        await decode_etc1alpha_palette(file, width, height);
                    }
                });
            }
            break;
        case "popcap_texture_decode_pvrtc" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                width = Console.IntegerReadLine(1, 16384);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                height = Console.IntegerReadLine(1, 16384);
                await decode_pvrtc(execute_file_dir, width, height);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.popcap_check_extname(file, ".ptx")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_width}`));
                        width = Console.IntegerReadLine(1, 16384);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.decode_height}`));
                        height = Console.IntegerReadLine(1, 16384);
                        await decode_pvrtc(file, width, height);
                    }
                });
            }
            break;
        case "popcap_rsg_unpack":
            if (!js_checker.is_array(execute_file_dir)) {
                await unpack_rsg(
                    fs_js.read_file(execute_file_dir, "buffer"),
                    `${fs_js.parse_fs(execute_file_dir).dir}/${fs_js.parse_fs(execute_file_dir).name}.packet`,
                    false,
                    false,
                    false,
                    false,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (
                        fs_js.popcap_check_extname(file, ".rsg") ||
                        fs_js.popcap_check_extname(file, ".pgsr") ||
                        fs_js.popcap_check_extname(file, ".rsg")
                    ) {
                        await unpack_rsg(
                            fs_js.read_file(file, "buffer"),
                            `${fs_js.parse_fs(file).dir}/${fs_js.parse_fs(file).name}.packet`,
                            false,
                            false,
                            false,
                            false,
                        );
                    }
                });
            }
            break;
        case "popcap_rsg_unpack_simple":
            if (!js_checker.is_array(execute_file_dir)) {
                await unpack_rsg(
                    fs_js.read_file(execute_file_dir, "buffer"),
                    `${fs_js.parse_fs(execute_file_dir).dir}/${fs_js.parse_fs(execute_file_dir).name}.packet`,
                    true,
                    true,
                    true,
                    false,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (
                        fs_js.popcap_check_extname(file, ".rsg") ||
                        fs_js.popcap_check_extname(file, ".pgsr") ||
                        fs_js.popcap_check_extname(file, ".rsg")
                    ) {
                        await unpack_rsg(
                            fs_js.read_file(file, "buffer"),
                            `${fs_js.parse_fs(file).dir}/${fs_js.parse_fs(file).name}.packet`,
                            true,
                            true,
                            true,
                            false,
                        );
                    }
                });
            }
            break;
        case "popcap_rsg_pack" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await pack_rsg(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        await pack_rsg(file);
                    }
                });
            }
            break;
        case "popcap_rsg_pack_simple" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await pack_rsg(execute_file_dir, true);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        await pack_rsg(file, true);
                    }
                });
            }
            break;
        case "atlas_info_constructor" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                atlasinfo_conduct(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    atlasinfo_conduct(file);
                });
            }
            break;
        case "popcap_resources_to_tre_info" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                RSBInfo.Tre.Utilities.create_tre_rsb_info(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        RSBInfo.Tre.Utilities.create_tre_rsb_info(file);
                    }
                });
            }
            break;
        case "popcap_atlas_merge_simple" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                if (fs_js.create_toolkit_view("smart")) {
                    fs_js.execution_auto(`${localization("popcap_atlas_merge_simple")} ~ ${localization("is_smart")}`);
                    fs_js.execution_information(localization("found_smart"));
                    const create_list_of_atlas = sort_atlas_area(await evaluate_test(execute_file_dir, 1));
                    const allowance_list: number[] = [];
                    for (let i = 0; i < create_list_of_atlas.length; ++i) {
                        if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                            break;
                        }
                        allowance_list.push(i + 1);
                        Console.WriteLine(
                            new input_set("los", i + 1).create_input(
                                create_list_of_atlas[i].width,
                                create_list_of_atlas[i].height,
                                create_list_of_atlas[i].atlas_count,
                            ),
                        );
                    }
                    const selection_smart_test: number = Console.IntegerReadLine(
                        allowance_list[0],
                        allowance_list[allowance_list.length - 1],
                    );
                    width = create_list_of_atlas[selection_smart_test - 1].width;
                    height = create_list_of_atlas[selection_smart_test - 1].height;
                } else {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    fs_js.create_dimension_view("width");
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    fs_js.create_dimension_view("height");
                    height = Console.SizeReadLine();
                }
                const create_max_padding_size: number = width > height ? height : width;
                const atlas_pack_size_view: number =
                    arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== undefined &&
                    arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== null &&
                    arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding)) &&
                    arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== "?" &&
                    parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding) >= 0 &&
                    parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding) <=
                        create_max_padding_size
                        ? parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding)
                        : -1;
                if (atlas_pack_size_view === -1) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                        ),
                    );
                    fs_js.create_padding_argument(0, create_max_padding_size);
                } else {
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_merge_simple")} ~ ${localization(
                            "padding_size",
                        )} = ${atlas_pack_size_view}`,
                    );
                }
                const atlas_cat_padding_size: number =
                    atlas_pack_size_view === -1
                        ? Console.IntegerReadLine(0, create_max_padding_size)
                        : atlas_pack_size_view;
                await atlas_cat(
                    execute_file_dir,
                    width,
                    height,
                    true,
                    Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                    true,
                    false,
                    true,
                    false,
                    atlas_cat_padding_size,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        if (fs_js.create_toolkit_view("smart")) {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_merge_simple")} ~ ${localization("is_smart")}`,
                            );
                            fs_js.execution_information(localization("found_smart"));
                            const create_list_of_atlas = sort_atlas_area(await evaluate_test(file, 1));
                            const allowance_list: number[] = [];
                            for (let i = 0; i < create_list_of_atlas.length; ++i) {
                                if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                                    break;
                                }
                                allowance_list.push(i + 1);
                                Console.WriteLine(
                                    new input_set("los", i + 1).create_input(
                                        create_list_of_atlas[i].width,
                                        create_list_of_atlas[i].height,
                                        create_list_of_atlas[i].atlas_count,
                                    ),
                                );
                            }
                            const selection_smart_test: number = Console.IntegerReadLine(
                                allowance_list[0],
                                allowance_list[allowance_list.length - 1],
                            );
                            width = create_list_of_atlas[selection_smart_test - 1].width;
                            height = create_list_of_atlas[selection_smart_test - 1].height;
                        } else {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`),
                            );
                            fs_js.create_dimension_view("width");
                            width = Console.SizeReadLine();
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`),
                            );
                            fs_js.create_dimension_view("height");
                            height = Console.SizeReadLine();
                        }
                        const create_max_padding_size: number = width > height ? height : width;
                        const atlas_pack_size_view: number =
                            arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== undefined &&
                            arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== null &&
                            arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== void 0 &&
                            (typeof arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding,
                                )) &&
                            arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding !== "?" &&
                            parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding) >= 0 &&
                            parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding) <=
                                create_max_padding_size
                                ? parseInt(arguments_default_modifier.popcap_atlas_merge_simple.arguments.padding)
                                : -1;
                        if (atlas_pack_size_view === -1) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                                ),
                            );
                            fs_js.create_padding_argument(0, create_max_padding_size);
                        } else {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_merge_simple")} ~ ${localization(
                                    "padding_size",
                                )} = ${atlas_pack_size_view}`,
                            );
                        }
                        const atlas_cat_padding_size: number =
                            atlas_pack_size_view === -1
                                ? Console.IntegerReadLine(0, create_max_padding_size)
                                : atlas_pack_size_view;
                        await atlas_cat(
                            file,
                            width,
                            height,
                            true,
                            Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                            true,
                            false,
                            true,
                            false,
                            atlas_cat_padding_size,
                        );
                    }
                });
            }
            break;
        case "popcap_atlas_pack_advanced" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                fs_js.create_dimension_view("width");
                width = Console.SizeReadLine();
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                fs_js.create_dimension_view("height");
                height = Console.SizeReadLine();
                const subgroup_name_argument_check =
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== undefined &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== null &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== void 0 &&
                    typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup === "string" &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup === "$"
                        ? true
                        : false;
                if (!subgroup_name_argument_check) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_subgroup_argument}`));
                    Console.WriteLine(
                        color.yellow_string(
                            `${Argument.Tre.Packages.skip_this_argument_to_take_folder_name_as_file_name}`,
                        ),
                    );
                } else {
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_advanced")} ~ ${localization("get_subgroup_name")}`,
                    );
                }
                let popcap_subgroup_name: string = !subgroup_name_argument_check ? Console.ReadLine() : "";
                const popcap_support_multiple_version: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.support_pvz2_int_new_version !==
                        undefined &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.support_pvz2_int_new_version !==
                        null &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.support_pvz2_int_new_version !==
                        void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                        .support_pvz2_int_new_version === "string" ||
                        Number.isInteger(
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version,
                        )) &&
                    (parseInt(
                        arguments_default_modifier.popcap_atlas_pack_advanced.arguments.support_pvz2_int_new_version,
                    ) === 1 ||
                        parseInt(
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version,
                        ) === 2)
                        ? (parseInt(
                              arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                  .support_pvz2_int_new_version,
                          ) as 1 | 2)
                        : 0;
                if (popcap_support_multiple_version === 0) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_resource_support_argument}`));
                    Console.WriteLine(`${Argument.Tre.Packages.old_popcap_support}`);
                    Console.WriteLine(`${Argument.Tre.Packages.new_popcap_support}`);
                } else {
                    const generate_new_console_message: string =
                        (popcap_support_multiple_version as 1 | 2) === 1
                            ? localization("support_old_version")
                            : localization("support_new_version");
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_advanced")} ~ ${generate_new_console_message}`,
                    );
                }
                let popcap_support_utilities_for_new_pvz2_international: boolean | number =
                    popcap_support_multiple_version === 0
                        ? Console.IntegerReadLine(1, 2)
                        : popcap_support_multiple_version;
                popcap_support_utilities_for_new_pvz2_international =
                    popcap_support_utilities_for_new_pvz2_international === 2 ? true : false;
                const popcap_support_trim_for_argb8888: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== undefined &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== null &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim)) &&
                    (parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) === 1 ||
                        parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) as 1 | 0)
                        : 2;
                if (popcap_support_trim_for_argb8888 === 2) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_support_trim}`));
                } else {
                    const generate_new_console_message: string =
                        (popcap_support_trim_for_argb8888 as 0 | 1) === 1
                            ? localization("auto_trim")
                            : localization("no_trim");
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_advanced")} ~ ${generate_new_console_message}`,
                    );
                }
                let popcap_support_trimming_mode_for_pvz2_texfmt_0: boolean | number =
                    popcap_support_trim_for_argb8888 === 2
                        ? Console.IntegerReadLine(0, 1)
                        : (popcap_support_trim_for_argb8888 as 1 | 0);
                popcap_support_trimming_mode_for_pvz2_texfmt_0 =
                    popcap_support_trimming_mode_for_pvz2_texfmt_0 === 1 ? true : false;
                const create_max_padding_size: number = Math.min(width, height);
                const atlas_pack_size_view: number =
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== undefined &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== null &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding)) &&
                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== "?" &&
                    parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding) >= 0 &&
                    parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding) <=
                        create_max_padding_size
                        ? parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding)
                        : -1;
                if (atlas_pack_size_view === -1) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                        ),
                    );
                    fs_js.create_padding_argument(0, create_max_padding_size);
                } else {
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_advanced")} ~ ${localization(
                            "padding_size",
                        )} = ${atlas_pack_size_view}`,
                    );
                }
                const atlas_cat_padding_size: number =
                    atlas_pack_size_view === -1
                        ? Console.IntegerReadLine(0, create_max_padding_size)
                        : atlas_pack_size_view;
                await atlas_pack_advanced(
                    execute_file_dir,
                    width,
                    height,
                    popcap_subgroup_name,
                    popcap_support_utilities_for_new_pvz2_international,
                    popcap_support_trimming_mode_for_pvz2_texfmt_0,
                    atlas_cat_padding_size,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                        fs_js.create_dimension_view("width");
                        width = Console.SizeReadLine();
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                        fs_js.create_dimension_view("height");
                        height = Console.SizeReadLine();
                        const subgroup_name_argument_check =
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== undefined &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== null &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup !== void 0 &&
                            typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup ===
                                "string" &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.subgroup === "$"
                                ? true
                                : false;
                        if (!subgroup_name_argument_check) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_subgroup_argument}`),
                            );
                            Console.WriteLine(
                                color.yellow_string(
                                    `${Argument.Tre.Packages.skip_this_argument_to_take_folder_name_as_file_name}`,
                                ),
                            );
                        } else {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_advanced")} ~ ${localization("get_subgroup_name")}`,
                            );
                        }
                        let popcap_subgroup_name: string = !subgroup_name_argument_check ? Console.ReadLine() : "";
                        const popcap_support_multiple_version: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version !== undefined &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version !== null &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version !== void 0 &&
                            (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                .support_pvz2_int_new_version === "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                        .support_pvz2_int_new_version,
                                )) &&
                            (parseInt(
                                arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                    .support_pvz2_int_new_version,
                            ) === 1 ||
                                parseInt(
                                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                        .support_pvz2_int_new_version,
                                ) === 2)
                                ? (parseInt(
                                      arguments_default_modifier.popcap_atlas_pack_advanced.arguments
                                          .support_pvz2_int_new_version,
                                  ) as 1 | 2)
                                : 0;
                        if (popcap_support_multiple_version === 0) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.popcap_resource_support_argument}`),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.old_popcap_support}`);
                            Console.WriteLine(`${Argument.Tre.Packages.new_popcap_support}`);
                        } else {
                            const generate_new_console_message: string =
                                (popcap_support_multiple_version as 1 | 2) === 1
                                    ? localization("support_old_version")
                                    : localization("support_new_version");
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_advanced")} ~ ${generate_new_console_message}`,
                            );
                        }
                        let popcap_support_utilities_for_new_pvz2_international: boolean | number =
                            popcap_support_multiple_version === 0
                                ? Console.IntegerReadLine(1, 2)
                                : popcap_support_multiple_version;
                        popcap_support_utilities_for_new_pvz2_international =
                            popcap_support_utilities_for_new_pvz2_international === 2 ? true : false;
                        const popcap_support_trim_for_argb8888: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== undefined &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== null &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim !== void 0 &&
                            (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim === "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim,
                                )) &&
                            (parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) === 1 ||
                                parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.trim) as
                                      | 1
                                      | 0)
                                : 2;
                        if (popcap_support_trim_for_argb8888 === 2) {
                            Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_support_trim}`));
                        } else {
                            const generate_new_console_message: string =
                                (popcap_support_trim_for_argb8888 as 0 | 1) === 1
                                    ? localization("auto_trim")
                                    : localization("no_trim");
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_advanced")} ~ ${generate_new_console_message}`,
                            );
                        }
                        let popcap_support_trimming_mode_for_pvz2_texfmt_0: boolean | number =
                            popcap_support_trim_for_argb8888 === 2
                                ? Console.IntegerReadLine(0, 1)
                                : (popcap_support_trim_for_argb8888 as 1 | 0);
                        popcap_support_trimming_mode_for_pvz2_texfmt_0 =
                            popcap_support_trimming_mode_for_pvz2_texfmt_0 === 1 ? true : false;
                        const create_max_padding_size: number = Math.min(width, height);
                        const atlas_pack_size_view: number =
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== undefined &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== null &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== void 0 &&
                            (typeof arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding,
                                )) &&
                            arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding !== "?" &&
                            parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding) >= 0 &&
                            parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding) <=
                                create_max_padding_size
                                ? parseInt(arguments_default_modifier.popcap_atlas_pack_advanced.arguments.padding)
                                : -1;
                        if (atlas_pack_size_view === -1) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                                ),
                            );
                            fs_js.create_padding_argument(0, create_max_padding_size);
                        } else {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_advanced")} ~ ${localization(
                                    "padding_size",
                                )} = ${atlas_pack_size_view}`,
                            );
                        }
                        const atlas_cat_padding_size: number =
                            atlas_pack_size_view === -1
                                ? Console.IntegerReadLine(0, create_max_padding_size)
                                : atlas_pack_size_view;
                        await atlas_pack_advanced(
                            file,
                            width,
                            height,
                            popcap_subgroup_name,
                            popcap_support_utilities_for_new_pvz2_international,
                            popcap_support_trimming_mode_for_pvz2_texfmt_0,
                            atlas_cat_padding_size,
                        );
                    }
                });
            }
            break;
        case "popcap_atlas_pack_cross_resolution" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                if (fs_js.create_toolkit_view("smart")) {
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_cross_resolution")} ~ ${localization("is_smart")}`,
                    );
                    fs_js.execution_information(localization("found_smart"));
                    const create_list_of_atlas = sort_atlas_area(await evaluate_test(execute_file_dir, 1));
                    const allowance_list: number[] = [];
                    for (let i = 0; i < create_list_of_atlas.length; ++i) {
                        if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                            break;
                        }
                        allowance_list.push(i + 1);
                        Console.WriteLine(
                            new input_set("los", i + 1).create_input(
                                create_list_of_atlas[i].width,
                                create_list_of_atlas[i].height,
                                create_list_of_atlas[i].atlas_count,
                            ),
                        );
                    }
                    const selection_smart_test: number = Console.IntegerReadLine(
                        allowance_list[0],
                        allowance_list[allowance_list.length - 1],
                    );
                    width = create_list_of_atlas[selection_smart_test - 1].width;
                    height = create_list_of_atlas[selection_smart_test - 1].height;
                } else {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    fs_js.create_dimension_view("width");
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    fs_js.create_dimension_view("height");
                    height = Console.SizeReadLine();
                }
                const create_max_padding_size = Math.min(width, height);
                const atlas_pack_size_view: number =
                    arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== undefined &&
                    arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== null &&
                    arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding ===
                        "string" ||
                        Number.isInteger(
                            arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding,
                        )) &&
                    arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== "?" &&
                    parseInt(arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding) >= 0 &&
                    parseInt(arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding) <= width
                        ? parseInt(arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding)
                        : -1;
                if (atlas_pack_size_view === -1) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                        ),
                    );
                    fs_js.create_padding_argument(0, create_max_padding_size);
                } else {
                    fs_js.execution_auto(
                        `${localization("popcap_atlas_pack_cross_resolution")} ~ ${localization(
                            "padding_size",
                        )} = ${atlas_pack_size_view}`,
                    );
                }
                const atlas_cat_padding_size: number =
                    atlas_pack_size_view === -1
                        ? Console.IntegerReadLine(0, create_max_padding_size)
                        : atlas_pack_size_view;
                await cross_resolution(
                    execute_file_dir,
                    width,
                    height,
                    Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                    atlas_cat_padding_size,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        if (fs_js.create_toolkit_view("smart")) {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_cross_resolution")} ~ ${localization("is_smart")}`,
                            );
                            fs_js.execution_information(localization("found_smart"));
                            const create_list_of_atlas = sort_atlas_area(await evaluate_test(file, 1));
                            const allowance_list: number[] = [];
                            for (let i = 0; i < create_list_of_atlas.length; ++i) {
                                if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                                    break;
                                }
                                allowance_list.push(i + 1);
                                Console.WriteLine(
                                    new input_set("los", i + 1).create_input(
                                        create_list_of_atlas[i].width,
                                        create_list_of_atlas[i].height,
                                        create_list_of_atlas[i].atlas_count,
                                    ),
                                );
                            }
                            const selection_smart_test: number = Console.IntegerReadLine(
                                allowance_list[0],
                                allowance_list[allowance_list.length - 1],
                            );
                            width = create_list_of_atlas[selection_smart_test - 1].width;
                            height = create_list_of_atlas[selection_smart_test - 1].height;
                        } else {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`),
                            );
                            fs_js.create_dimension_view("width");
                            width = Console.SizeReadLine();
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`),
                            );
                            fs_js.create_dimension_view("height");
                            height = Console.SizeReadLine();
                        }
                        const create_max_padding_size = Math.min(width, height);
                        const atlas_pack_size_view: number =
                            arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !==
                                undefined &&
                            arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== null &&
                            arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !==
                                void 0 &&
                            (typeof arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding,
                                )) &&
                            arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding !== "?" &&
                            parseInt(arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding) >=
                                0 &&
                            parseInt(arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding) <=
                                width
                                ? parseInt(
                                      arguments_default_modifier.popcap_atlas_pack_cross_resolution.arguments.padding,
                                  )
                                : -1;
                        if (atlas_pack_size_view === -1) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                                ),
                            );
                            fs_js.create_padding_argument(0, create_max_padding_size);
                        } else {
                            fs_js.execution_auto(
                                `${localization("popcap_atlas_pack_cross_resolution")} ~ ${localization(
                                    "padding_size",
                                )} = ${atlas_pack_size_view}`,
                            );
                        }
                        const atlas_cat_padding_size: number =
                            atlas_pack_size_view === -1
                                ? Console.IntegerReadLine(0, create_max_padding_size)
                                : atlas_pack_size_view;
                        await cross_resolution(
                            file,
                            width,
                            height,
                            Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                            atlas_cat_padding_size,
                        );
                    }
                });
            }
            break;
        case "popcap_resources_local_data_compare" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.local_compare_received}`));
                Console.WriteLine(execute_file_dir);
                Console.WriteLine(
                    color.fgcyan_string(`${Argument.Tre.Packages.method_resources_local_compare_drag_input}`),
                );
                let local_new_res_to_compare: string = await Console.ReadPath();
                LocalResourcesCompare(execute_file_dir, local_new_res_to_compare);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.local_compare_received}`));
                        Console.WriteLine(execute_file_dir);
                        Console.WriteLine(
                            color.fgcyan_string(`${Argument.Tre.Packages.method_resources_local_compare_drag_input}`),
                        );
                        let local_new_res_to_compare: string = await Console.ReadPath();
                        LocalResourcesCompare(file, local_new_res_to_compare);
                    }
                });
            }
            break;
        case "popcap_texture_atlas_merge" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                if (fs_js.create_toolkit_view("smart")) {
                    fs_js.execution_auto(`${localization("popcap_texture_atlas_merge")} ~ ${localization("is_smart")}`);
                    fs_js.execution_information(localization("found_smart"));
                    const create_list_of_atlas = sort_atlas_area(await evaluate_test(execute_file_dir, 1));
                    const allowance_list: number[] = [];
                    for (let i = 0; i < create_list_of_atlas.length; ++i) {
                        if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                            break;
                        }
                        allowance_list.push(i + 1);
                        Console.WriteLine(
                            new input_set("los", i + 1).create_input(
                                create_list_of_atlas[i].width,
                                create_list_of_atlas[i].height,
                                create_list_of_atlas[i].atlas_count,
                            ),
                        );
                    }
                    const selection_smart_test: number = Console.IntegerReadLine(
                        allowance_list[0],
                        allowance_list[allowance_list.length - 1],
                    );
                    width = create_list_of_atlas[selection_smart_test - 1].width;
                    height = create_list_of_atlas[selection_smart_test - 1].height;
                } else {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    fs_js.create_dimension_view("width");
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    fs_js.create_dimension_view("height");
                    height = Console.SizeReadLine();
                }
                const create_max_padding_size = Math.min(width, height);
                const support_smart_pack: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== undefined &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== null &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== void 0 &&
                    (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart)) &&
                    (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) === 1 ||
                        parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) as 1 | 0)
                        : 2;
                if (support_smart_pack === 2) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_smart_pack}`,
                        ),
                    );
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                } else {
                    const create_new_print_message: boolean = (support_smart_pack as 1 | 0) === 1 ? true : false;
                    fs_js.execution_auto(
                        `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                            "smart_packing_area",
                        )} = ${create_new_print_message}`,
                    );
                }
                let atlas_cat_smart_option_area: number | boolean =
                    support_smart_pack === 2 ? Console.IntegerReadLine(0, 1) : support_smart_pack;
                atlas_cat_smart_option_area = atlas_cat_smart_option_area === 1 ? true : false;
                const support_pack_pot: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== undefined &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== null &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== void 0 &&
                    (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot)) &&
                    (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) === 1 ||
                        parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) as 1 | 0)
                        : 2;
                if (support_pack_pot === 2) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_pot}`,
                        ),
                    );
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                } else {
                    const create_new_print_message: boolean = (support_pack_pot as 1 | 0) === 1 ? true : false;
                    fs_js.execution_auto(
                        `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                            "pot",
                        )} = ${create_new_print_message}`,
                    );
                }
                let atlas_cat_pot_option_area: number | boolean =
                    support_pack_pot === 2 ? Console.IntegerReadLine(0, 1) : support_pack_pot;
                atlas_cat_pot_option_area = atlas_cat_pot_option_area === 1 ? true : false;
                const support_pack_square: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== undefined &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== null &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== void 0 &&
                    (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.square === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square)) &&
                    (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) === 1 ||
                        parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) as 1 | 0)
                        : 2;
                if (support_pack_square === 2) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_iz_square}`,
                        ),
                    );
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                } else {
                    const create_new_print_message: boolean = (support_pack_square as 1 | 0) === 1 ? true : false;
                    fs_js.execution_auto(
                        `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                            "square_area",
                        )} = ${create_new_print_message}`,
                    );
                }
                let atlas_cat_square_option_area_force: number | boolean =
                    support_pack_square === 2 ? Console.IntegerReadLine(0, 1) : support_pack_square;
                atlas_cat_square_option_area_force = atlas_cat_square_option_area_force === 1 ? true : false;
                const support_pack_rotation: 1 | 2 | 0 =
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== undefined &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== null &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== void 0 &&
                    (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation)) &&
                    (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation) === 1 ||
                        parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation) as 1 | 0)
                        : 2;
                if (support_pack_rotation === 2) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_can_be_allow_for_rotation}`,
                        ),
                    );
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                } else {
                    const create_new_print_message: boolean = (support_pack_rotation as 1 | 0) === 1 ? true : false;
                    fs_js.execution_auto(
                        `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                            "allow_rotation",
                        )} = ${create_new_print_message}`,
                    );
                }
                let atlas_cat_allow_rotation_option_area_force: number | boolean =
                    support_pack_rotation === 2 ? Console.IntegerReadLine(0, 1) : support_pack_rotation;
                atlas_cat_allow_rotation_option_area_force =
                    atlas_cat_allow_rotation_option_area_force === 1 ? true : false;
                const atlas_pack_size_view: number =
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== undefined &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== null &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== void 0 &&
                    (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding)) &&
                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== "?" &&
                    parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding) >= 0 &&
                    parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding) <=
                        create_max_padding_size
                        ? parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding)
                        : -1;
                if (atlas_pack_size_view === -1) {
                    Console.WriteLine(
                        color.fgcyan_string(
                            `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                        ),
                    );
                    fs_js.create_padding_argument(0, create_max_padding_size);
                } else {
                    fs_js.execution_auto(
                        `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                            "padding_size",
                        )} = ${atlas_pack_size_view}`,
                    );
                }
                const atlas_cat_padding_size: number =
                    atlas_pack_size_view === -1
                        ? Console.IntegerReadLine(0, create_max_padding_size)
                        : atlas_pack_size_view;
                await atlas_cat(
                    execute_file_dir,
                    width,
                    height,
                    false,
                    Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                    Argument.Tre.Packages
                        .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                    atlas_cat_smart_option_area,
                    atlas_cat_pot_option_area,
                    atlas_cat_square_option_area_force,
                    atlas_cat_allow_rotation_option_area_force,
                    atlas_cat_padding_size,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        if (fs_js.create_toolkit_view("smart")) {
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization("is_smart")}`,
                            );
                            fs_js.execution_information(localization("found_smart"));
                            const create_list_of_atlas = sort_atlas_area(await evaluate_test(file, 1));
                            const allowance_list: number[] = [];
                            for (let i = 0; i < create_list_of_atlas.length; ++i) {
                                if (i === fs_js.create_toolkit_view("smart_allowance_area")) {
                                    break;
                                }
                                allowance_list.push(i + 1);
                                Console.WriteLine(
                                    new input_set("los", i + 1).create_input(
                                        create_list_of_atlas[i].width,
                                        create_list_of_atlas[i].height,
                                        create_list_of_atlas[i].atlas_count,
                                    ),
                                );
                            }
                            const selection_smart_test: number = Console.IntegerReadLine(
                                allowance_list[0],
                                allowance_list[allowance_list.length - 1],
                            );
                            width = create_list_of_atlas[selection_smart_test - 1].width;
                            height = create_list_of_atlas[selection_smart_test - 1].height;
                        } else {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`),
                            );
                            fs_js.create_dimension_view("width");
                            width = Console.SizeReadLine();
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`),
                            );
                            fs_js.create_dimension_view("height");
                            height = Console.SizeReadLine();
                        }
                        const create_max_padding_size = Math.min(width, height);
                        const support_smart_pack: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== undefined &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== null &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart !== void 0 &&
                            (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart,
                                )) &&
                            (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) === 1 ||
                                parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.smart) as
                                      | 1
                                      | 0)
                                : 2;
                        if (support_smart_pack === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_smart_pack}`,
                                ),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                        } else {
                            const create_new_print_message: boolean =
                                (support_smart_pack as 1 | 0) === 1 ? true : false;
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                                    "smart_packing_area",
                                )} = ${create_new_print_message}`,
                            );
                        }
                        let atlas_cat_smart_option_area: number | boolean =
                            support_smart_pack === 2 ? Console.IntegerReadLine(0, 1) : support_smart_pack;
                        atlas_cat_smart_option_area = atlas_cat_smart_option_area === 1 ? true : false;
                        const support_pack_pot: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== undefined &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== null &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot !== void 0 &&
                            (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot === "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot,
                                )) &&
                            (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) === 1 ||
                                parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.pot) as
                                      | 1
                                      | 0)
                                : 2;
                        if (support_pack_pot === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_pot}`,
                                ),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                        } else {
                            const create_new_print_message: boolean = (support_pack_pot as 1 | 0) === 1 ? true : false;
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                                    "pot",
                                )} = ${create_new_print_message}`,
                            );
                        }
                        let atlas_cat_pot_option_area: number | boolean =
                            support_pack_pot === 2 ? Console.IntegerReadLine(0, 1) : support_pack_pot;
                        atlas_cat_pot_option_area = atlas_cat_pot_option_area === 1 ? true : false;
                        const support_pack_square: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== undefined &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== null &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.square !== void 0 &&
                            (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.square ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.square,
                                )) &&
                            (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) === 1 ||
                                parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.square) as
                                      | 1
                                      | 0)
                                : 2;
                        if (support_pack_square === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_iz_square}`,
                                ),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                        } else {
                            const create_new_print_message: boolean =
                                (support_pack_square as 1 | 0) === 1 ? true : false;
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                                    "square_area",
                                )} = ${create_new_print_message}`,
                            );
                        }
                        let atlas_cat_square_option_area_force: number | boolean =
                            support_pack_square === 2 ? Console.IntegerReadLine(0, 1) : support_pack_square;
                        atlas_cat_square_option_area_force = atlas_cat_square_option_area_force === 1 ? true : false;
                        const support_pack_rotation: 1 | 2 | 0 =
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== undefined &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== null &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation !== void 0 &&
                            (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation,
                                )) &&
                            (parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation) === 1 ||
                                parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation) ===
                                    0)
                                ? (parseInt(
                                      arguments_default_modifier.popcap_texture_atlas_merge.arguments.rotation,
                                  ) as 1 | 0)
                                : 2;
                        if (support_pack_rotation === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_iz_thiz_pack_can_be_allow_for_rotation}`,
                                ),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                            Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                        } else {
                            const create_new_print_message: boolean =
                                (support_pack_rotation as 1 | 0) === 1 ? true : false;
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                                    "allow_rotation",
                                )} = ${create_new_print_message}`,
                            );
                        }
                        let atlas_cat_allow_rotation_option_area_force: number | boolean =
                            support_pack_rotation === 2 ? Console.IntegerReadLine(0, 1) : support_pack_rotation;
                        atlas_cat_allow_rotation_option_area_force =
                            atlas_cat_allow_rotation_option_area_force === 1 ? true : false;
                        const atlas_pack_size_view: number =
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== undefined &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== null &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== void 0 &&
                            (typeof arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding,
                                )) &&
                            arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding !== "?" &&
                            parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding) >= 0 &&
                            parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding) <=
                                create_max_padding_size
                                ? parseInt(arguments_default_modifier.popcap_texture_atlas_merge.arguments.padding)
                                : -1;
                        if (atlas_pack_size_view === -1) {
                            Console.WriteLine(
                                color.fgcyan_string(
                                    `${Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`,
                                ),
                            );
                            fs_js.create_padding_argument(0, create_max_padding_size);
                        } else {
                            fs_js.execution_auto(
                                `${localization("popcap_texture_atlas_merge")} ~ ${localization(
                                    "padding_size",
                                )} = ${atlas_pack_size_view}`,
                            );
                        }
                        const atlas_cat_padding_size: number =
                            atlas_pack_size_view === -1
                                ? Console.IntegerReadLine(0, create_max_padding_size)
                                : atlas_pack_size_view;
                        await atlas_cat(
                            file,
                            width,
                            height,
                            false,
                            Argument.Tre.Packages.popcap_texture_atlas_merge_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_find_method_in_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_not_found_res_indicated_in_subgroups,
                            Argument.Tre.Packages
                                .popcap_texture_atlas_merge_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                            atlas_cat_smart_option_area,
                            atlas_cat_pot_option_area,
                            atlas_cat_square_option_area_force,
                            atlas_cat_allow_rotation_option_area_force,
                            atlas_cat_padding_size,
                        );
                    }
                });
            }
            break;
        case "popcap_resize_sprites_simple" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(
                    color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_original_quality}`),
                );
                fs_js.create_texture_quality_argument();
                let orig: number = Console.TextureQualityReadLine();
                Console.WriteLine(
                    color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_modifier_after_quality}`),
                );
                fs_js.create_texture_quality_argument();
                let mod: number = Console.TextureQualityReadLine();
                await resize_atlas(execute_file_dir, orig, mod);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        Console.WriteLine(
                            color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_original_quality}`),
                        );
                        fs_js.create_texture_quality_argument();
                        let orig: number = Console.TextureQualityReadLine();
                        Console.WriteLine(
                            color.fgcyan_string(
                                `${Argument.Tre.Packages.popcap_atlas_member_resize_modifier_after_quality}`,
                            ),
                        );
                        fs_js.create_texture_quality_argument();
                        let mod: number = Console.TextureQualityReadLine();
                        await resize_atlas(file, orig, mod);
                    }
                });
            }
            break;
        case "popcap_json_to_rton" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_json_to_rton(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    popcap_json_to_rton(file);
                });
            }
            break;
        case "popcap_rton_encode_and_encrypt" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_json_to_rton_and_encrypt(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        popcap_json_to_rton_and_encrypt(file);
                    }
                });
            }
            break;
        case "popcap_resources_rewrite" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_mode: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== undefined &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== null &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== void 0 &&
                    (typeof arguments_default_modifier.popcap_resources_rewrite.arguments.mode === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_resources_rewrite.arguments.mode)) &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) === 1 ||
                        parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) === 2)
                        ? (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) as 1 | 2)
                        : 0;
                if (argument_checker_for_mode === 0) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_game_rewrite_mode}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe_fix}`);
                }
                if (argument_checker_for_mode !== 0) {
                    const execution_information_message: string =
                        argument_checker_for_mode === 1
                            ? localization("res_rewrite_mode_safe")
                            : localization("res_rewrite_mode_safe_fix");
                    fs_js.execution_auto(
                        `${localization("popcap_resources_rewrite")} ~ ${execution_information_message}`,
                    );
                }
                const mode_for_res_rewriter: number =
                    argument_checker_for_mode !== 0 ? argument_checker_for_mode : Console.IntegerReadLine(1, 2);
                const argument_checker_for_encoding: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== undefined &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== null &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== void 0 &&
                    (typeof arguments_default_modifier.popcap_resources_rewrite.arguments.encode === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_resources_rewrite.arguments.encode)) &&
                    arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) === 1 ||
                        parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) as 0 | 1)
                        : 2;
                if (argument_checker_for_encoding === 2) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                }
                if (argument_checker_for_encoding !== 2) {
                    const execution_information_message: string =
                        argument_checker_for_encoding === 0
                            ? localization("res_cat_concat_no_encode_rton")
                            : localization("res_cat_concat_encode_rton");
                    fs_js.execution_auto(
                        `${localization("popcap_resources_rewrite")} ~ ${execution_information_message}`,
                    );
                }
                const encode_for_res_rewriter: number =
                    argument_checker_for_encoding === 2 ? Console.IntegerReadLine(0, 1) : argument_checker_for_encoding;
                res_rewrite(execute_file_dir, mode_for_res_rewriter, encode_for_res_rewriter);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        const argument_checker_for_mode: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== undefined &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== null &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== void 0 &&
                            (typeof arguments_default_modifier.popcap_resources_rewrite.arguments.mode === "string" ||
                                Number.isInteger(arguments_default_modifier.popcap_resources_rewrite.arguments.mode)) &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.mode !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) === 1 ||
                                parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) === 2)
                                ? (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.mode) as
                                      | 1
                                      | 2)
                                : 0;
                        if (argument_checker_for_mode === 0) {
                            Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_game_rewrite_mode}`));
                            Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe}`);
                            Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe_fix}`);
                        }
                        if (argument_checker_for_mode !== 0) {
                            const execution_information_message: string =
                                argument_checker_for_mode === 1
                                    ? localization("res_rewrite_mode_safe")
                                    : localization("res_rewrite_mode_safe_fix");
                            fs_js.execution_auto(
                                `${localization("popcap_resources_rewrite")} ~ ${execution_information_message}`,
                            );
                        }
                        const mode_for_res_rewriter: number =
                            argument_checker_for_mode !== 0 ? argument_checker_for_mode : Console.IntegerReadLine(1, 2);
                        const argument_checker_for_encoding: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== undefined &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== null &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== void 0 &&
                            (typeof arguments_default_modifier.popcap_resources_rewrite.arguments.encode === "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_resources_rewrite.arguments.encode,
                                )) &&
                            arguments_default_modifier.popcap_resources_rewrite.arguments.encode !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) === 1 ||
                                parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_resources_rewrite.arguments.encode) as
                                      | 0
                                      | 1)
                                : 2;
                        if (argument_checker_for_encoding === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                        }
                        if (argument_checker_for_encoding !== 2) {
                            const execution_information_message: string =
                                argument_checker_for_encoding === 0
                                    ? localization("res_cat_concat_no_encode_rton")
                                    : localization("res_cat_concat_encode_rton");
                            fs_js.execution_auto(
                                `${localization("popcap_resources_rewrite")} ~ ${execution_information_message}`,
                            );
                        }
                        const encode_for_res_rewriter: number =
                            argument_checker_for_encoding === 2
                                ? Console.IntegerReadLine(0, 1)
                                : argument_checker_for_encoding;
                        res_rewrite(file, mode_for_res_rewriter, encode_for_res_rewriter);
                    }
                });
            }
            break;
        case "popcap_packages_json_split" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_encoding: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_packages_json_split.arguments.method !== undefined &&
                    arguments_default_modifier.popcap_packages_json_split.arguments.method !== null &&
                    arguments_default_modifier.popcap_packages_json_split.arguments.method !== void 0 &&
                    (typeof arguments_default_modifier.popcap_packages_json_split.arguments.method === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_packages_json_split.arguments.method)) &&
                    arguments_default_modifier.popcap_packages_json_split.arguments.method !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) === 1 ||
                        parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) === 2)
                        ? (parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) as 1 | 2)
                        : 0;
                if (argument_checker_for_encoding === 0) {
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.popcap_packages_json_split_argument}`),
                    );
                    Console.WriteLine(`      1. ${localization("split_by_aliases")}`);
                    Console.WriteLine(`      2. ${localization("split_by_typename")}`);
                } else {
                    const execution_information_message: string =
                        argument_checker_for_encoding === 2
                            ? localization("split_by_typename")
                            : localization("split_by_aliases");
                    fs_js.execution_auto(
                        `${localization("popcap_packages_json_split")} ~ ${execution_information_message}`,
                    );
                }
                const popcap_json_split_mode_selector: number =
                    argument_checker_for_encoding === 0 ? Console.IntegerReadLine(1, 2) : argument_checker_for_encoding;
                PopCapPackages.Json.Split(execute_file_dir, popcap_json_split_mode_selector);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        const argument_checker_for_encoding: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_packages_json_split.arguments.method !== undefined &&
                            arguments_default_modifier.popcap_packages_json_split.arguments.method !== null &&
                            arguments_default_modifier.popcap_packages_json_split.arguments.method !== void 0 &&
                            (typeof arguments_default_modifier.popcap_packages_json_split.arguments.method ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_packages_json_split.arguments.method,
                                )) &&
                            arguments_default_modifier.popcap_packages_json_split.arguments.method !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) === 1 ||
                                parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) === 2)
                                ? (parseInt(arguments_default_modifier.popcap_packages_json_split.arguments.method) as
                                      | 1
                                      | 2)
                                : 0;
                        if (argument_checker_for_encoding === 0) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.popcap_packages_json_split_argument}`),
                            );
                            Console.WriteLine(`      1. ${localization("split_by_aliases")}`);
                            Console.WriteLine(`      2. ${localization("split_by_typename")}`);
                        } else {
                            const execution_information_message: string =
                                argument_checker_for_encoding === 2
                                    ? localization("split_by_typename")
                                    : localization("split_by_aliases");
                            fs_js.execution_auto(
                                `${localization("popcap_packages_json_split")} ~ ${execution_information_message}`,
                            );
                        }
                        const popcap_json_split_mode_selector: number =
                            argument_checker_for_encoding === 0
                                ? Console.IntegerReadLine(1, 2)
                                : argument_checker_for_encoding;
                        PopCapPackages.Json.Split(file, popcap_json_split_mode_selector);
                    }
                });
            }
            break;
        case "popcap_packages_json_merge" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_encoding: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== undefined &&
                    arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== null &&
                    arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== void 0 &&
                    (typeof arguments_default_modifier.popcap_packages_json_merge.arguments.encode === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_packages_json_merge.arguments.encode)) &&
                    arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) === 1 ||
                        parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) === 0)
                        ? (parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) as 0 | 1)
                        : 2;
                if (argument_checker_for_encoding === 2) {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                }
                if (argument_checker_for_encoding !== 2) {
                    const execution_information_message: string =
                        argument_checker_for_encoding === 0
                            ? localization("res_cat_concat_no_encode_rton")
                            : localization("res_cat_concat_encode_rton");
                    fs_js.execution_auto(
                        `${localization("popcap_packages_json_merge")} ~ ${execution_information_message}`,
                    );
                }
                const encode: number =
                    argument_checker_for_encoding === 2 ? Console.IntegerReadLine(0, 1) : argument_checker_for_encoding;
                PopCapPackages.Json.CatToFile(execute_file_dir, encode === 1 ? "rton" : "json");
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.is_directory(file)) {
                        const argument_checker_for_encoding: 0 | 1 | 2 =
                            arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== undefined &&
                            arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== null &&
                            arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== void 0 &&
                            (typeof arguments_default_modifier.popcap_packages_json_merge.arguments.encode ===
                                "string" ||
                                Number.isInteger(
                                    arguments_default_modifier.popcap_packages_json_merge.arguments.encode,
                                )) &&
                            arguments_default_modifier.popcap_packages_json_merge.arguments.encode !== "?" &&
                            (parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) === 1 ||
                                parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) === 0)
                                ? (parseInt(arguments_default_modifier.popcap_packages_json_merge.arguments.encode) as
                                      | 0
                                      | 1)
                                : 2;
                        if (argument_checker_for_encoding === 2) {
                            Console.WriteLine(
                                color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`),
                            );
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                            Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                        }
                        if (argument_checker_for_encoding !== 2) {
                            const execution_information_message: string =
                                argument_checker_for_encoding === 0
                                    ? localization("res_cat_concat_no_encode_rton")
                                    : localization("res_cat_concat_encode_rton");
                            fs_js.execution_auto(
                                `${localization("popcap_packages_json_merge")} ~ ${execution_information_message}`,
                            );
                        }
                        const encode: number =
                            argument_checker_for_encoding === 2
                                ? Console.IntegerReadLine(0, 1)
                                : argument_checker_for_encoding;
                        PopCapPackages.Json.CatToFile(file, encode === 1 ? "rton" : "json");
                    }
                });
            }
            break;
        case "popcap_old_resources_conversion_to_new_resources" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                let old_to_new_conversion: AdaptPvZ2InternationalResPath.res_conversion =
                    new AdaptPvZ2InternationalResPath.res_conversion();
                old_to_new_conversion.write_fs_js_json(execute_file_dir, 1);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        let old_to_new_conversion: AdaptPvZ2InternationalResPath.res_conversion =
                            new AdaptPvZ2InternationalResPath.res_conversion();
                        old_to_new_conversion.write_fs_js_json(file, 1);
                    }
                });
            }
            break;
        case "popcap_new_resources_conversion_to_old_resources" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                let old_to_new_conversion: AdaptPvZ2InternationalResPath.res_conversion =
                    new AdaptPvZ2InternationalResPath.res_conversion();
                old_to_new_conversion.write_fs_js_json(execute_file_dir, 2);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        let old_to_new_conversion: AdaptPvZ2InternationalResPath.res_conversion =
                            new AdaptPvZ2InternationalResPath.res_conversion();
                        old_to_new_conversion.write_fs_js_json(file, 2);
                    }
                });
            }
            break;
        case "popcap_resources_beautify" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                small_res_beautify(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        small_res_beautify(file);
                    }
                });
            }
            break;
        case "popcap_resources_to_atlasinfo" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(
                    color.fgcyan_string(
                        `${Argument.Tre.Packages.popcap_resources_to_atlasinfo_notify_atlas_info_method}`,
                    ),
                );
                Console.WriteLine(Argument.Tre.Packages.method_split_popcap_atlas_texture_with_path_extension);
                Console.WriteLine(Argument.Tre.Packages.method_split_popcap_atlas_texture_with_id_extension);
                let method_for_res_to_atlas_info: number | string = Console.IntegerReadLine(1, 2);
                method_for_res_to_atlas_info = method_for_res_to_atlas_info === 1 ? "path" : "id";
                restoAtlasinfo(method_for_res_to_atlas_info, execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        Console.WriteLine(
                            color.fgcyan_string(
                                `${Argument.Tre.Packages.popcap_resources_to_atlasinfo_notify_atlas_info_method}`,
                            ),
                        );
                        Console.WriteLine(Argument.Tre.Packages.method_split_popcap_atlas_texture_with_path_extension);
                        Console.WriteLine(Argument.Tre.Packages.method_split_popcap_atlas_texture_with_id_extension);
                        let method_for_res_to_atlas_info: number | string = Console.IntegerReadLine(1, 2);
                        method_for_res_to_atlas_info = method_for_res_to_atlas_info === 1 ? "path" : "id";
                        restoAtlasinfo(method_for_res_to_atlas_info, file);
                    }
                });
            }
            break;
        case "popcap_atlas_split" as popcap_game_edit_method:
            if (js_checker.is_array(execute_file_dir)) {
                const argument_checker_for_splitting_method: 0 | 1 | 2 =
                    arguments_default_modifier.popcap_atlas_split.arguments.split !== undefined &&
                    arguments_default_modifier.popcap_atlas_split.arguments.split !== null &&
                    arguments_default_modifier.popcap_atlas_split.arguments.split !== void 0 &&
                    (typeof arguments_default_modifier.popcap_atlas_split.arguments.split === "string" ||
                        Number.isInteger(arguments_default_modifier.popcap_atlas_split.arguments.split)) &&
                    arguments_default_modifier.popcap_atlas_split.arguments.split !== "?" &&
                    (parseInt(arguments_default_modifier.popcap_atlas_split.arguments.split) === 1 ||
                        parseInt(arguments_default_modifier.popcap_atlas_split.arguments.split) === 2)
                        ? (parseInt(arguments_default_modifier.popcap_atlas_split.arguments.split) as 1 | 2)
                        : 0;
                if (argument_checker_for_splitting_method === 0) {
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.method_split_popcap_atlas_texture}`),
                    );
                    Console.WriteLine(`${Argument.Tre.Packages.method_split_popcap_atlas_texture_with_path_extension}`);
                    Console.WriteLine(`${Argument.Tre.Packages.method_split_popcap_atlas_texture_with_id_extension}`);
                } else {
                    const create_new_message_console_out: string =
                        argument_checker_for_splitting_method === 1
                            ? localization("method_split_popcap_atlas_texture_with_path_extension")
                            : localization("method_split_popcap_atlas_texture_with_id_extension");
                    fs_js.execution_auto(localization("popcap_atlas_split") + " ~ " + create_new_message_console_out);
                }
                let atlas_split_method: number =
                    argument_checker_for_splitting_method === 0
                        ? Console.IntegerReadLine(1, 2)
                        : argument_checker_for_splitting_method;
                await atlas_split(atlas_split_method as 1 | 2, execute_file_dir);
            }
            break;
        case "popcap_atlas_split_advanced" as popcap_game_edit_method:
            if (js_checker.is_array(execute_file_dir) && execute_file_dir.length >= 2) {
                await atlas_split_advanced(execute_file_dir);
            } else {
                throw new Error(`Split atlas requires to have at least 1 json & 1 png`);
            }
            break;
        case "atlas_info_split" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                atlas_info_split(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        atlas_info_split(file);
                    }
                });
            }
            break;
        case "atlas_info_cat" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                atlas_info_cat(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.is_directory(file)) {
                        atlas_info_cat(file);
                    }
                });
            }
            break;
        case "popcap_rsb_unpack" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_unpack(execute_file_dir, false, false);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (
                        fs_js.popcap_check_extname(file, ".rsb") ||
                        fs_js.popcap_check_extname(file, ".obb") ||
                        fs_js.popcap_check_extname(file, ".rsb1")
                    ) {
                        await popcap_game_content_edit.rsb_unpack(file, false, false);
                    }
                });
            }
            break;
        case "popcap_rsb_unpack_simple" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_unpack(execute_file_dir, true, false);
            } else {
                execute_file_dir.forEach(async (file) => {
                    await popcap_game_content_edit.rsb_unpack(file, true, false);
                });
            }
            break;
        case "popcap_rsb_resource_unpack" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_unpack(execute_file_dir, false, true);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (
                        fs_js.popcap_check_extname(file, ".rsb") ||
                        fs_js.popcap_check_extname(file, ".obb") ||
                        fs_js.popcap_check_extname(file, ".rsb1")
                    ) {
                        await popcap_game_content_edit.rsb_unpack(file, false, true);
                    }
                });
            }
            break;
        case "popcap_rsb_pack" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_pack(execute_file_dir, false, false);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        await popcap_game_content_edit.rsb_pack(file, false, false);
                    }
                });
            }
            break;
        case "popcap_rsb_resource_pack" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_pack(execute_file_dir, false, true);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        await popcap_game_content_edit.rsb_pack(file, false, true);
                    }
                });
            }
            break;
        case "popcap_rsb_pack_simple" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.rsb_pack(execute_file_dir, true, false);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_directory(file)) {
                        await popcap_game_content_edit.rsb_pack(file, true, false);
                    }
                });
            }
            break;
        case "popcap_zlib_zlib_compress" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.zlib_compress(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_file(file)) {
                        await popcap_game_content_edit.zlib_compress(file);
                    }
                });
            }
            break;
        case "popcap_lawnstrings_convert_to_localization" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Lawnstrings.popcap.WriteLocalizationJSON(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        Lawnstrings.popcap.WriteLocalizationJSON(file);
                    }
                });
            }
            break;
        case "popcap_lawnstrings_convert_from_localization" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Lawnstrings.popcap.WritePopCapLawnstringsFromLocalizationLawnstrings(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    if (fs_js.popcap_check_extname(file, ".json")) {
                        Lawnstrings.popcap.WritePopCapLawnstringsFromLocalizationLawnstrings(file);
                    }
                });
            }
            break;
        case "popcap_zlib_uncompress" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                await popcap_game_content_edit.zlib_uncompress(execute_file_dir);
            } else {
                execute_file_dir.forEach(async (file) => {
                    if (fs_js.is_file(file)) {
                        await popcap_game_content_edit.zlib_uncompress(file);
                    }
                });
            }
            break;
        case "json_patch" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.json_patch_ask_drag_file}`));
                fs_js.execution_notify("received", execute_file_dir);
                let json_apply_path: string = await readline_for_json(execute_file_dir);
                let apply_patch: any = fs_js.read_json(execute_file_dir);
                apply_patch = JSON.stringify(apply_patch) === "{}" ? { loop: false, patch: [] } : apply_patch;
                const finish_apply_patch_json = await applyPatch(fs_js.read_json(json_apply_path), apply_patch);
                fs_js.write_json(
                    `${json_apply_path}/../${fs_js.parse_fs(json_apply_path).name}.patched.json`,
                    finish_apply_patch_json,
                );
                Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                        `${json_apply_path}/../${fs_js.parse_fs(json_apply_path).name}.patched.json`,
                    )}`,
                );
                Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.json_patch_finish_apply_patch}`));
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.json_patch_ask_drag_file}`));
                    fs_js.execution_notify("received", file);
                    let json_apply_path: string = await readline_for_json(file);
                    let apply_patch: any = fs_js.read_json(file);
                    apply_patch = JSON.stringify(apply_patch) === "{}" ? { loop: false, patch: [] } : apply_patch;
                    const finish_apply_patch_json = await applyPatch(fs_js.read_json(json_apply_path), apply_patch);
                    fs_js.write_json(
                        `${json_apply_path}/../${fs_js.parse_fs(json_apply_path).name}.patched.json`,
                        finish_apply_patch_json,
                    );
                    Console.WriteLine(
                        `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                            `${json_apply_path}/../${fs_js.parse_fs(json_apply_path).name}.patched.json`,
                        )}`,
                    );
                    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.json_patch_finish_apply_patch}`));
                });
            }
            break;
        case "json_patch_generator" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(
                    color.fgcyan_string(`${Argument.Tre.Packages.json_patch_generator_execution_received}`),
                );
                fs_js.execution_notify("received", execute_file_dir);
                Console.WriteLine(
                    color.fgcyan_string(`${Argument.Tre.Packages.json_patch_generator_new_execution_generator}`),
                );
                fs_js.execution_information(localization("drag_the_json_to_compare_and_generate_patch"));
                let json_new_file_compare_diff: string = await readline_for_json(execute_file_dir);
                fs_js.write_json(
                    `${json_new_file_compare_diff}/../${fs_js.parse_fs(json_new_file_compare_diff).name}_patch.json`,
                    generatePatch(fs_js.read_json(execute_file_dir), fs_js.read_json(json_new_file_compare_diff)),
                );
                Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                        `${json_new_file_compare_diff}/../${
                            fs_js.parse_fs(json_new_file_compare_diff).name
                        }_patch.json`,
                    )}`,
                );
                Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.json_patch_finish_write_patch}`));
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.json_patch_generator_execution_received}`),
                    );
                    fs_js.execution_notify("received", file);
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.json_patch_generator_new_execution_generator}`),
                    );
                    fs_js.execution_information(localization("drag_the_json_to_compare_and_generate_patch"));
                    let json_new_file_compare_diff: string = await readline_for_json(file);
                    fs_js.write_json(
                        `${json_new_file_compare_diff}/../${
                            fs_js.parse_fs(json_new_file_compare_diff).name
                        }_patch.json`,
                        generatePatch(fs_js.read_json(file), fs_js.read_json(json_new_file_compare_diff)),
                    );
                    Console.WriteLine(
                        `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                            `${json_new_file_compare_diff}/../${
                                fs_js.parse_fs(json_new_file_compare_diff).name
                            }_patch.json`,
                        )}`,
                    );
                    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.json_patch_finish_write_patch}`));
                });
            }
            break;
        case "wwise_soundbank_encode" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_bnk_encode(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    popcap_bnk_encode(file);
                });
            }
            break;
        case "wwise_soundbank_decode" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                popcap_bnk_decode(execute_file_dir);
            } else {
                execute_file_dir.forEach((file) => {
                    popcap_bnk_decode(file);
                });
            }
            break;
        case "popcap_lawnstrings_diff" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstring_old_obtained}`));
                Console.WriteLine(execute_file_dir);
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstrings_new_require}`));
                let new_compare_json_diff: string = await readline_for_json(execute_file_dir);
                Lawnstrings.popcap.WriteDiffJSON(execute_file_dir, new_compare_json_diff);
            } else {
                execute_file_dir.forEach(async (file) => {
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstring_old_obtained}`));
                    Console.WriteLine(execute_file_dir);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstrings_new_require}`));
                    let new_compare_json_diff: string = await readline_for_json(file);
                    Lawnstrings.popcap.WriteDiffJSON(file, new_compare_json_diff);
                });
            }
            break;
        case "popcap_animation_viewer" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir)) {
                fs_js.execution_notify("argument", color.fgcyan_string(`${localization("provide_media_directory")}`));
                const media_path = await Console.ReadDir();
                await animation_viewer(
                    read_pam(fs_js.read_file(execute_file_dir, "buffer")),
                    execute_file_dir,
                    media_path,
                );
            } else {
                execute_file_dir.forEach(async (file) => {
                    fs_js.execution_notify(
                        "argument",
                        color.fgcyan_string(`${localization("provide_media_directory")}`),
                    );
                    const media_path = await Console.ReadDir();
                    await animation_viewer(fs_js.read_file(file, "buffer"), file, media_path);
                });
            }
            break;
        case "real_esrgan_upscaler_image" as popcap_game_edit_method:
            if (!js_checker.is_array(execute_file_dir) && !check_if_the_directories_iz_folder) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.upscaler_real_esrgan_upscale_model}`));
                fs_js.execution_information(localization("realesr-animevideov3_preview"));
                fs_js.execution_information(localization("realesrgan-x4plus-anime_preview"));
                Console.WriteLine(input_set.create_instant_void("notify", 1, "realesr-animevideov3"));
                Console.WriteLine(input_set.create_instant_void("notify", 2, "realesrgan-x4plus-anime"));
                let upscale_model: number | string = Console.IntegerReadLine(1, 2);
                upscale_model = upscale_model === 1 ? "realesr-animevideov3" : "realesrgan-x4plus-anime";
                let upscale_data: number;
                if (upscale_model !== "realesrgan-x4plus-anime") {
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.upscaler_real_esrgan_upscale_ratio}`),
                    );
                    fs_js.execution_information(localization("realesr-animevideov3_detail"));
                    Console.WriteLine(input_set.create_instant_void("notify", 2, "realesr-animevideov3-x2"));
                    Console.WriteLine(input_set.create_instant_void("notify", 3, "realesr-animevideov3-x3"));
                    Console.WriteLine(input_set.create_instant_void("notify", 4, "realesr-animevideov3-x4"));
                    upscale_data = Console.IntegerReadLine(2, 4);
                } else {
                    upscale_data = 4;
                }
                await ImagesUtilities.real_esrgan(
                    execute_file_dir,
                    upscale_model,
                    upscale_data,
                    `${execute_file_dir}/../${fs_js.parse_fs(execute_file_dir).name}_x${upscale_data}.png`,
                );
                Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                        `${execute_file_dir}/../${fs_js.parse_fs(execute_file_dir).name}_x${upscale_data}.png`,
                    )}`,
                );
            } else if (!js_checker.is_array(execute_file_dir) && check_if_the_directories_iz_folder) {
                Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.upscaler_real_esrgan_upscale_model}`));
                fs_js.execution_information(localization("realesr-animevideov3_preview"));
                fs_js.execution_information(localization("realesrgan-x4plus-anime_preview"));
                Console.WriteLine(input_set.create_instant_void("notify", 1, "realesr-animevideov3"));
                Console.WriteLine(input_set.create_instant_void("notify", 2, "realesrgan-x4plus-anime"));
                let upscale_model: number | string = Console.IntegerReadLine(1, 2);
                upscale_model = upscale_model === 1 ? "realesr-animevideov3" : "realesrgan-x4plus-anime";
                let upscale_data: number;
                if (upscale_model !== "realesrgan-x4plus-anime") {
                    Console.WriteLine(
                        color.fgcyan_string(`${Argument.Tre.Packages.upscaler_real_esrgan_upscale_ratio}`),
                    );
                    fs_js.execution_information(localization("realesr-animevideov3_detail"));
                    Console.WriteLine(input_set.create_instant_void("notify", 2, "realesr-animevideov3-x2"));
                    Console.WriteLine(input_set.create_instant_void("notify", 3, "realesr-animevideov3-x3"));
                    Console.WriteLine(input_set.create_instant_void("notify", 4, "realesr-animevideov3-x4"));
                    upscale_data = Console.IntegerReadLine(2, 4);
                } else {
                    upscale_data = 4;
                }
                const new_folder_contain_upscale_images: string = `${execute_file_dir}_x${upscale_data}`;
                fs_js.create_directory(new_folder_contain_upscale_images);
                Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${fs_js.resolve(
                        `${new_folder_contain_upscale_images}`,
                    )}`,
                );
                await ImagesUtilities.real_esrgan(
                    execute_file_dir,
                    upscale_model,
                    upscale_data,
                    new_folder_contain_upscale_images,
                    true,
                );
            }
            break;
        default:
            break;
    }
    return;
}
export default evaluate_js_modules_workspace_assertation;
