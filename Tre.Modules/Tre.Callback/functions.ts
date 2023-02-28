"use strict";
import { decode_argb8888, decode_rgba8888, encode_argb8888, encode_rgba8888, encode_etc1a, encode_pvrtc, decode_etc1a, decode_pvrtc } from "../Tre.Libraries/Tre.Images/util.js";
import { res_pack, res_split, res_rewrite, res_beautify, LocalResourcesCompare, small_res_beautify } from '../../Tre.Modules/Tre.Scripts/PopCap/resources/util.js';
import { atlas_split, atlas_cat, resize_atlas, restoAtlasinfo, cross_resolution } from '../../Tre.Modules/Tre.Scripts/PopCap/atlas/util.js';
import { TreErrorMessage } from '../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { readjson, readfile, writefile, writejson, check_is_file, file_stats, readfilebuffer, makefolder, delete_file, read_dir, read_single_folder } from "../Tre.Libraries/Tre.FileSystem/util.js";
import { Display } from './toolkit_functions.js';
import { Argument } from "./toolkit_question.js";
import { extname, basename } from '../Tre.Libraries/Tre.Basename/util.js';
import { Console } from "./console.js";
import { atlasinfo_cat, atlasinfo_split } from "../../Tre.Modules/Tre.Scripts/Tre/AtlasInfo/util.js";
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import extra_system from '../Tre.Libraries/Tre.Extra/outfile.js';
import path, { dirname } from "node:path";
import { unpack_rsgp, pack_rsgp } from '../Tre.Scripts/PopCap/rsgp/util.js';
import readline_for_json from "./Public/ReadLine/readline_for_json.js";
import ban from "./Public/JSExecutor/ban.js";
import applyPatch from "../../Tre.Modules/Tre.Libraries/Tre.JSONSystem/patch.js";
import generatePatch from "../Tre.Libraries/Tre.JSONSystem/generate_patch.js";
import * as ImagesUtilities from "../Tre.Libraries/Tre.Images/util.js";
import * as popcap_game_content_edit from "../Tre.Scripts/PopCap/rsb/utilities.js";
import { Lawnstrings } from "../../Tre.Modules/Tre.Scripts/PopCap/localization/lawnstrings.js";
import PopCapPackages from "../Tre.Scripts/PopCap/json/utilities.js";
import RSBInfo from "../Tre.Scripts/Tre/Support/utilities.js";
import { rton_to_json } from "../Tre.Scripts/PopCap/rton/util.js";
import resolveFilePath from "./Public/FilePath/path_result.js";
import js_checker from "./Default/checker.js";
import localization from "./localization.js";
export interface configAtlas {
    display: {
        disable_display_full_path_execution: boolean,
    }
}
export default async function (execute_file_count: number, execute_file_dir: string | string[], execute_file_length: number, mode: number): Promise<void> {
    if (typeof execute_file_dir === "string") {
        execute_file_dir = resolveFilePath(execute_file_dir);
    }
    else if (Array.isArray(execute_file_dir)) {
        for (let i: number = 0; i < execute_file_dir.length; ++i) {
            if (typeof execute_file_dir[i] === "string") {
                execute_file_dir[i] = resolveFilePath(execute_file_dir[i]);
            }
        }
    }
    const json_config: any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_all_module_have_been_loaded}`));
    execute_file_count = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer: number = Date.now();
    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.command_execute_in_progress} (${execute_file_count}/${execute_file_length})`));
    if (Array.isArray(execute_file_dir)) {
        execute_file_dir.forEach((child_file_bundle: string, index: number) => {
            if (json_config.display.disable_display_full_path_execution) {
                if (index === (execute_file_dir.length - 1)) {
                    Console.WriteLine(`${path.basename(child_file_bundle)}\n`);
                }
                else {
                    Console.WriteLine(`${path.basename(child_file_bundle)}\n`);
                };
            }
            else {
                if (index === (execute_file_dir.length - 1)) {
                    Console.WriteLine(`${((child_file_bundle))}\n`);
                }
                else {
                    Console.WriteLine(`${(child_file_bundle)}`);
                };

            }
        })
    }
    else {
        if (json_config.display.disable_display_full_path_execution) {
            Console.WriteLine(`${path.basename(execute_file_dir)}\n`);
        }
        else {
            Console.WriteLine(`${execute_file_dir}\n`);
        }
    }
    const tre_selector: Array<number> = new Array();
    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.module_available}`));
    if (json_config.extension.use_other_voids) {
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_md5_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha1_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha3_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha224_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha256_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha384_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_sha512_hash);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_xor_encrypt);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_aes_encrypt);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_aes_decrypt);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_base64_encode);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_base64_decode);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_gzip_compress);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_gzip_decompress);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_deflate_compress);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_deflate_decompress);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_compress);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_third_party_zlib_decompress);
    };
    const checkfile: boolean = (Array.isArray(execute_file_dir)) ? false : check_is_file(execute_file_dir);
    if (mode === 0 && typeof (execute_file_dir) === 'string') {
        if (checkfile === true) {
            switch (extname(execute_file_dir).toString().toLowerCase()) {
                case ".js":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_javascript_void_execute);
                    break;
                case ".json":
                    if (Display.Tre.Function.BaseNameChecker(execute_file_dir, 'resources')) {
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_split);
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_rewrite);
                    }
                    if (Display.Tre.Function.BaseNameChecker(execute_file_dir, 'atlasinfo')) {
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_atlas_info_split);
                    }
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_to_atlasinfo);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_beautify);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_game_json_split);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_json_patch_work);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_json_patch_generator);
                    if (Display.Tre.Function.BaseNameChecker(execute_file_dir, 'lawnstrings')) {
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_lawnstrings_diff);
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_lawnstrings_convert_to_localization);
                        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_lawnstrings_convert_from_localization);
                    }
                    break;
                case ".jpg":
                case ".png":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_rgba8888);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_argb8888);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_pvrtc);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_etc1a);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_real_esrgan_upscaler_bitmap_content);
                    break;
                case ".ptx":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_decode_rgba8888);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_decode_argb8888);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_decode_pvrtc);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_decode_etc1a);
                    break;
                case ".rsgp":
                case ".rsg":
                case ".pgsr":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_rsgp_unpack);
                    break;
                case ".rsb":
                case ".obb":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_rsb_unpack);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_smf_compress);
                    break;
                case ".smf":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_smf_decompress);
                    break;
                case ".rton":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_rton_to_json);
                default:
                    break;
            }
        }
        else {
            switch (extname(execute_file_dir).toString().toLowerCase()) {
                case ".res":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_cat);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_local_data_compare);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_resources_to_tre_info);
                    break;
                case ".spg":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_atlas_info_constructor);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_atlas_cat_simple);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_atlas_cat);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_resize_atlas_simple);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_resize_atlas);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_real_esrgan_upscaler_bitmap_content);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_atlas_pack_cross_resolution);
                    break;
                case ".atlasinfo":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_atlas_info_cat);
                    break;
                case ".rsg":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_rsgp_pack);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_zlib_rsb_pack);
                    break;
                case ".pgj":
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_game_json_pack);
                    break;
                default:
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_atlas_info_constructor);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_resize_atlas_simple);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_resize_atlas);
                    Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.tre_void_real_esrgan_upscaler_bitmap_content);
                    break;
            }
        }
    }
    else {
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_atlas_split);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_rgba8888);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_argb8888);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_pvrtc);
        Display.Tre.Function.DisplayItems(tre_selector, Display.Tre.Function.popcap_texture_encode_etc1a);
    }
    if (tre_selector.length === 0) {
        Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.cannot_load_any_modules}`));
    }
    else {
        const option: number = Console.ExpandReadLine(tre_selector);
        async function execute_function_from_core(execute_file_dir: string | string[]): Promise<void> {
            let width: number;
            let height: number;
            let encryption_key: string;
            const check_if_the_directories_iz_folder: boolean = (!Array.isArray(execute_file_dir) && check_is_file(execute_file_dir)) ? false : true;
            switch (option) {
                case Display.Tre.Function.tre_void_third_party_md5_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "md5");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha1_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha1");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha3_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha3");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha224_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha224");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha256_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha256");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha384_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha384");
                    break;
                case Display.Tre.Function.tre_void_third_party_sha512_hash.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "sha512");
                    break;
                case Display.Tre.Function.popcap_rton_to_json.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        rton_to_json(execute_file_dir);
                    };
                    break;
                case Display.Tre.Function.tre_void_third_party_xor_encrypt.void_number_readline_argument():
                    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.display_cipher_key_readline_argument}`));
                    encryption_key = Console.ReadLine();
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "xor", encryption_key.toString());
                    break;
                case Display.Tre.Function.tre_void_javascript_void_execute.void_number_readline_argument():
                    try {
                        if (!Array.isArray(execute_file_dir)) {
                            const js_shell_string_await_for_executor: string = (readfile(execute_file_dir));
                            let javascript_shell_allow_this_funcction: boolean = ban(["eval", "exec", "spawn", "setTimeout", "console", "setInterval", "require", "import", "export", "fs", "window", "interface", "abstract", "with", "var", "readline", "JSON", "fetch", "document"], js_shell_string_await_for_executor);
                            if (javascript_shell_allow_this_funcction) {
                                await eval(js_shell_string_await_for_executor);
                            }
                            else {
                                return
                            }
                        }
                    } catch (error: any) {
                        TreErrorMessage({ error: `${Argument.Tre.Packages.error_syntax}`, reason: `${Argument.Tre.Packages.unknown_reason}`, system: error.toString() }, `${Argument.Tre.Packages.js_shell_error}\n${error}`)
                    }
                    break;
                case Display.Tre.Function.popcap_texture_encode_rgba8888.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await encode_rgba8888(execute_file_dir);
                    }
                    else {
                        execute_file_dir.forEach(async (file: string) => {
                            await encode_rgba8888(file);
                        })
                    }
                    break;
                case Display.Tre.Function.popcap_texture_encode_argb8888.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await encode_argb8888(execute_file_dir);
                    }
                    else {
                        execute_file_dir.forEach(async (file: string) => {
                            await encode_argb8888(file);
                        })
                    }
                    break;
                case Display.Tre.Function.popcap_texture_encode_etc1a.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await encode_etc1a(execute_file_dir);
                    }
                    else {
                        execute_file_dir.forEach(async (file: string) => {
                            await encode_etc1a(file);
                        })
                    }
                    break;
                case Display.Tre.Function.popcap_texture_encode_pvrtc.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await encode_pvrtc(execute_file_dir);
                    }
                    else {
                        execute_file_dir.forEach(async (file: string) => {
                            await encode_pvrtc(file);
                        })
                    }
                    break;
                case Display.Tre.Function.popcap_resources_split.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await res_split(execute_file_dir)
                    }
                    break;
                case Display.Tre.Function.popcap_resources_cat.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_res}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_mode_safe_fix}`);
                    let mode: number = Console.IntegerReadLine(1, 2);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                    let encode: number = Console.IntegerReadLine(0, 1);
                    if (!Array.isArray(execute_file_dir)) {
                        res_pack(execute_file_dir, mode, encode);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_decode_rgba8888.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.IntegerReadLine(1, 16384);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.IntegerReadLine(1, 16384);
                    if (!Array.isArray(execute_file_dir)) {
                        await decode_rgba8888(execute_file_dir, width, height);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_decode_argb8888.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.IntegerReadLine(1, 16384);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.IntegerReadLine(1, 16384);
                    if (!Array.isArray(execute_file_dir)) {
                        await decode_argb8888(execute_file_dir, width, height);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_decode_etc1a.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.IntegerReadLine(1, 16384);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.IntegerReadLine(1, 16384);
                    if (!Array.isArray(execute_file_dir)) {
                        await decode_etc1a(execute_file_dir, width, height);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_decode_pvrtc.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.IntegerReadLine(1, 16384);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.IntegerReadLine(1, 16384);
                    if (!Array.isArray(execute_file_dir)) {
                        await decode_pvrtc(execute_file_dir, width, height);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_rsgp_unpack.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await unpack_rsgp(readfilebuffer(execute_file_dir), `${path.parse(execute_file_dir).dir}/${path.parse(execute_file_dir).name}.rsg`, false, false, false);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_rsgp_pack.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await pack_rsgp(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_resources_to_tre_info.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        RSBInfo.Tre.Utilities.create_tre_rsb_info(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_atlas_cat_simple.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.SizeReadLine();
                    if (!Array.isArray(execute_file_dir)) {
                        await atlas_cat(execute_file_dir, (width), (height), true, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_method_in_atlas_info, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_found_res_indicated_in_subgroups, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_total_sprites_sheet_process_in_this_void).finally(() => { });
                    }
                    break;
                case Display.Tre.Function.popcap_texture_atlas_pack_cross_resolution.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.SizeReadLine();
                    if (!Array.isArray(execute_file_dir)) {
                        await cross_resolution(execute_file_dir, (width), (height), Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_method_in_atlas_info, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_found_res_indicated_in_subgroups, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_total_sprites_sheet_process_in_this_void).finally(() => { });
                    }
                    break;
                case Display.Tre.Function.popcap_resources_local_data_compare.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.local_compare_received}`));
                        Console.WriteLine(execute_file_dir);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.method_resources_local_compare_drag_input}`));
                        let local_new_res_to_compare: string = Console.ReadPath();
                        LocalResourcesCompare(execute_file_dir, local_new_res_to_compare);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_atlas_cat.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    width = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    height = Console.SizeReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_boolean_question_iz_thiz_pack_smart_pack}`));
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                    let atlas_cat_smart_option_area: number | boolean = Console.IntegerReadLine(0, 1);
                    atlas_cat_smart_option_area = (atlas_cat_smart_option_area === 1) ? true : false;
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_boolean_question_iz_thiz_pack_pot}`));
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                    let atlas_cat_pot_option_area: number | boolean = Console.IntegerReadLine(0, 1);
                    atlas_cat_pot_option_area = (atlas_cat_pot_option_area === 1) ? true : false;
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_boolean_question_iz_thiz_pack_iz_square}`));
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                    let atlas_cat_square_option_area_force: number | boolean = Console.IntegerReadLine(0, 1);
                    atlas_cat_square_option_area_force = (atlas_cat_square_option_area_force === 1) ? true : false;
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_boolean_question_iz_thiz_pack_can_be_allow_for_rotation}`));
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_false}`);
                    Console.WriteLine(`${Argument.Tre.Packages.default_boolean_with_true}`);
                    let atlas_cat_allow_rotation_option_area_force: number | boolean = Console.IntegerReadLine(0, 1);
                    atlas_cat_allow_rotation_option_area_force = (atlas_cat_allow_rotation_option_area_force === 1) ? true : false;
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_boolean_question_padding_size_for_max_rects_bin}`));
                    let atlas_cat_padding_size: number | boolean = Console.IntegerReadLine(0, width);
                    if (!Array.isArray(execute_file_dir)) {
                        await atlas_cat(execute_file_dir, (width), (height), false, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_groups_array_in_atlasinfo, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_subgroup_in_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_find_method_in_atlas_info, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_cannot_get_res_data_from_this_atlas_info,
                            Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_not_found_res_indicated_in_subgroups, Argument.Tre.Packages.popcap_texture_atlas_cat_max_rects_bin_display_total_sprites_sheet_process_in_this_void,
                            atlas_cat_smart_option_area, atlas_cat_pot_option_area, atlas_cat_square_option_area_force, atlas_cat_allow_rotation_option_area_force, atlas_cat_padding_size
                        )
                    };
                    break;
                case Display.Tre.Function.popcap_texture_resize_atlas_simple.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_original_quality}`));
                    let orig: number = Console.TextureQualityReadLine();
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_modifier_after_quality}`));
                    let mod: number = Console.TextureQualityReadLine();
                    if (!Array.isArray(execute_file_dir)) {
                        await resize_atlas(execute_file_dir, orig, mod);
                    }
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_gzip_compress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "gzip-compress");
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_gzip_decompress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "gzip-decompress");
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_deflate_compress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "deflate-compress");
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_deflate_decompress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "deflate-decompress");
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_compress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "zlib-compress");
                    break;
                case Display.Tre.Function.tre_void_third_party_zlib_decompress.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "zlib-decompress");
                    break;
                case Display.Tre.Function.tre_void_third_party_base64_encode.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "base64-encode");
                    break;
                case Display.Tre.Function.tre_void_third_party_base64_decode.void_number_readline_argument():
                    extra_system(execute_file_dir, check_if_the_directories_iz_folder, "base64-decode");
                    break;
                case Display.Tre.Function.popcap_resources_rewrite.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_game_rewrite_mode}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_rewrite_mode_safe_fix}`);
                    let mode_for_res_rewriter = Console.IntegerReadLine(1, 2);
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_no_encode_rton}`);
                    Console.WriteLine(`${Argument.Tre.Packages.res_cat_concat_encode_rton}`);
                    let encode_for_res_rewriter = Console.IntegerReadLine(0, 1);
                    if (!Array.isArray(execute_file_dir)) {
                        res_rewrite(execute_file_dir, mode_for_res_rewriter, encode_for_res_rewriter);
                    }
                    break;
                case Display.Tre.Function.popcap_game_json_split.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_game_rewrite_mode}`));
                    const popcap_json_split_mode_selector: number = Console.IntegerReadLine(1, 2);
                    if (!Array.isArray(execute_file_dir)) {
                        PopCapPackages.Json.Split(execute_file_dir, popcap_json_split_mode_selector);
                    }
                    break;
                case Display.Tre.Function.popcap_game_json_pack.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        PopCapPackages.Json.CatToFile(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_resources_beautify.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        small_res_beautify(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_resources_to_atlasinfo.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_res_to_atlasinfo_notify_atlas_info_method}`));
                    let method_for_res_to_atlas_info: number | string = Console.IntegerReadLine(1, 2);
                    method_for_res_to_atlas_info = (method_for_res_to_atlas_info === 1) ? "path" : "id";
                    if (!Array.isArray(execute_file_dir)) {
                        restoAtlasinfo(method_for_res_to_atlas_info, execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_texture_atlas_split.void_number_readline_argument():
                    Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.method_split_popcap_atlas_texture}`));
                    Console.WriteLine((`${Argument.Tre.Packages.method_split_popcap_atlas_texture_with_path_extension}`));
                    Console.WriteLine((`${Argument.Tre.Packages.method_split_popcap_atlas_texture_with_id_extension}`));
                    let atlas_split_method: any = Console.IntegerReadLine(1, 2);
                    if (Array.isArray(execute_file_dir)) {
                        await atlas_split(parseInt(atlas_split_method));
                    }
                    break;
                case Display.Tre.Function.tre_void_atlas_info_split.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        console.log('hello')
                        atlasinfo_split(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.tre_void_atlas_info_cat.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        atlasinfo_cat(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_rsb_unpack.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await popcap_game_content_edit.rsb_unpack(execute_file_dir, false);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_rsb_pack.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await popcap_game_content_edit.rsb_pack(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_smf_compress.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await popcap_game_content_edit.smf_compress(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_lawnstrings_convert_to_localization.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Lawnstrings.PopCap.WriteLocalizationJSON(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_lawnstrings_convert_from_localization.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Lawnstrings.PopCap.WritePopCapLawnstringsFromLocalizationLawnstrings(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.popcap_zlib_smf_decompress.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        await popcap_game_content_edit.smf_decompress(execute_file_dir);
                    }
                    break;
                case Display.Tre.Function.tre_void_json_patch_work.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_json_patch_ask_drag_file}`));
                        let json_apply_path: string = readline_for_json(execute_file_dir);
                        let apply_patch: any = readjson(execute_file_dir);
                        apply_patch = (JSON.stringify(apply_patch) === "{}") ? { loop: false, patch: [] } : apply_patch;
                        if (apply_patch.loop != undefined && apply_patch.patch != undefined) {
                            const finish_apply_patch_json = await applyPatch(readjson(json_apply_path), apply_patch);
                            writejson(`${json_apply_path}/../${path.parse(json_apply_path).name}.patched.json`, finish_apply_patch_json);
                            console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${json_apply_path}/../${path.parse(json_apply_path).name}.patched.json`)}`);
                            Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_void_json_patch_finish_apply_patch}`));
                        }
                    }
                    break;
                case Display.Tre.Function.tre_void_json_patch_generator.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_json_patch_generator_execution_received}`));
                        Console.WriteLine(execute_file_dir);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_json_patch_generator_new_execution_generator}`));
                        let json_new_file_compare_diff: string = readline_for_json(execute_file_dir);
                        writejson(`${json_new_file_compare_diff}/../${path.parse(json_new_file_compare_diff).name}_patch.json`, generatePatch(readjson(execute_file_dir), readjson(json_new_file_compare_diff)));
                        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${json_new_file_compare_diff}/../${path.parse(json_new_file_compare_diff).name}_patch.json`)}`);
                        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_void_json_patch_finish_write_patch}`));
                    }
                    break;
                case Display.Tre.Function.popcap_lawnstrings_diff.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir)) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstring_old_obtained}`));
                        Console.WriteLine(execute_file_dir);
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.popcap_lawnstrings_new_require}`));
                        let new_compare_json_diff: string = readline_for_json(execute_file_dir);
                        Lawnstrings.PopCap.WriteDiffJSON(execute_file_dir, new_compare_json_diff);
                    }
                    break;
                case Display.Tre.Function.tre_void_real_esrgan_upscaler_bitmap_content.void_number_readline_argument():
                    if (!Array.isArray(execute_file_dir) && !check_if_the_directories_iz_folder) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_upscaler_real_esrgan_upscale_model}`));
                        Console.WriteLine("     1.realesr-animevideov3");
                        Console.WriteLine("     2.realesrgan-x4plus-anime");
                        let upscale_model: number | string = Console.IntegerReadLine(1, 2);
                        upscale_model = (upscale_model === 1) ? "realesr-animevideov3" : "realesrgan-x4plus-anime";
                        let upscale_data: number;
                        if (upscale_model != "realesrgan-x4plus-anime") {
                            Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_upscaler_real_esrgan_upscale_ratio}`));
                            Console.WriteLine("     2.realesr-animevideov3-x2");
                            Console.WriteLine("     3.realesr-animevideov3-x3");
                            Console.WriteLine("     4.realesr-animevideov3-x4");
                            upscale_data = Console.IntegerReadLine(2, 4);
                        }
                        else {
                            upscale_data = 4;
                        }
                        await ImagesUtilities.real_esrgan(execute_file_dir, upscale_model, upscale_data, `${execute_file_dir}/../${path.parse(execute_file_dir).name}_x${upscale_data}.png`);
                        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${execute_file_dir}/../${path.parse(execute_file_dir).name}_x${upscale_data}.png`)}`);
                    }
                    else if (!Array.isArray(execute_file_dir) && check_if_the_directories_iz_folder) {
                        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_upscaler_real_esrgan_upscale_model}`));
                        Console.WriteLine("     1.realesr-animevideov3");
                        Console.WriteLine("     2.realesrgan-x4plus-anime");
                        let upscale_model: number | string = Console.IntegerReadLine(1, 2);
                        upscale_model = (upscale_model === 1) ? "realesr-animevideov3" : "realesrgan-x4plus-anime";
                        let upscale_data: number;
                        if (upscale_model != "realesrgan-x4plus-anime") {
                            Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.tre_void_upscaler_real_esrgan_upscale_ratio}`));
                            Console.WriteLine("     2.realesr-animevideov3-x2");
                            Console.WriteLine("     3.realesr-animevideov3-x3");
                            Console.WriteLine("     4.realesr-animevideov3-x4");
                            upscale_data = Console.IntegerReadLine(2, 4);
                        }
                        else {
                            upscale_data = 4;
                        }
                        const new_folder_contain_upscale_images: string = `${execute_file_dir}_x${upscale_data}`;
                        makefolder(new_folder_contain_upscale_images);
                        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${new_folder_contain_upscale_images}`)}`);
                        await ImagesUtilities.real_esrgan(execute_file_dir, upscale_model, upscale_data, new_folder_contain_upscale_images, true);
                    }
                    break;
            }
            return;
        }
        if (typeof execute_file_dir === "string") {
            await execute_function_from_core(execute_file_dir);
        }
        else if (typeof execute_file_dir === "object" && option != 33) {
            execute_file_dir.forEach(async (file_in_this_directory) => {
                await execute_function_from_core(file_in_this_directory);
            })
        }
        else if (typeof execute_file_dir === "object" && option === 33) {
            await execute_function_from_core(execute_file_dir);
        }
    }
    const end_timer: number = Date.now();
    return Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} `) + `${(end_timer - start_timer) / 1000}s`);
}
export {
    writefile,
    writejson,
    basename,
    delete_file,
    read_single_folder,
    read_dir,
    readfilebuffer,
    js_checker,
    file_stats,
}