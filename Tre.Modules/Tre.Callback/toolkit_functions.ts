"use strict";
import Void from "./function_class.js";
import { Console } from "./console.js";
import localization from "./localization.js";
import path from "node:path";
export namespace Display.Tre.Function {
    // finish
    export const tre_void_third_party_md5_hash = new Void(localization("md5_hash"), 1);
    export const tre_void_third_party_sha1_hash = new Void(localization("sha1_hash"), 2);
    export const tre_void_third_party_sha3_hash = new Void(localization("sha3_hash"), 3);
    export const tre_void_third_party_sha224_hash = new Void(localization("sha224_hash"), 4);
    export const tre_void_third_party_sha256_hash = new Void(localization("sha256_hash"), 5);
    export const tre_void_third_party_sha384_hash = new Void(localization("sha384_hash"), 6);
    export const tre_void_third_party_sha512_hash = new Void(localization("sha512_hash"), 7);
    export const tre_void_third_party_xor_encrypt = new Void(localization("xor_encrypt"), 8);
    // todo
    export const tre_void_third_party_aes_encrypt = new Void(localization("aes_encrypt"), 9);
    export const tre_void_third_party_aes_decrypt = new Void(localization("aes_decrypt"), 10);
    // finish
    export const tre_void_third_party_base64_encode = new Void(localization("base64_encode"), 11);
    export const tre_void_third_party_base64_decode = new Void(localization("base64_decode"), 12);
    export const tre_void_third_party_zlib_gzip_compress = new Void(localization("gzip_compress"), 12);
    export const tre_void_third_party_zlib_gzip_decompress = new Void(localization("gzip_decompress"), 13);
    export const tre_void_third_party_zlib_deflate_compress = new Void(localization("deflate_compress"), 14);
    export const tre_void_third_party_zlib_deflate_decompress = new Void(localization("deflate_decompress"), 15);
    export const tre_void_third_party_zlib_compress = new Void(localization("zlib_compress"), 16);
    export const tre_void_third_party_zlib_decompress = new Void(localization("zlib_decompress"), 17);
    export const tre_void_javascript_void_execute = new Void(localization("js_execute"), 18);
    // finish
    export const popcap_resources_split = new Void(localization("popcap_resources_split"), 19);
    export const popcap_resources_cat = new Void(localization("popcap_resources_cat"), 20);
    export const popcap_resources_rewrite = new Void(localization("popcap_resources_rewrite"), 21);
    //todo
    export const popcap_resources_export_packet_data = new Void(localization("popcap_resources_export_bundle_data"), 22);
    export const popcap_resources_remove_unused_texture_format = new Void(localization("popcap_resources_remove_texture_format"), 23);
    // todo
    export const popcap_resources_local_data_compare = new Void(localization("popcap_resources_local_compare"), 24);
    export const popcap_resources_to_tre_info = new Void(localization("popcap_resources_to_tre_info"), 25);
    // export const popcap_resources_cat = new Void("PopCap Resources Beautify", 26);
    // todo
    export const popcap_resources_repair = new Void(localization("popcap_resources_repair_packet"), 26);
    // finish
    export const popcap_resources_to_atlasinfo = new Void(localization("popcap_res_to_atlasinfo"), 27);
    export const popcap_resources_beautify = new Void(localization("popcap_res_beautify"), 28);
    // finish
    export const tre_void_atlas_info_split = new Void(localization("atlasinfo_split"), 30);
    export const tre_void_atlas_info_cat = new Void(localization("atlasinfo_cat"), 31);
    // todo
    export const tre_void_atlas_info_constructor = new Void(localization("atlasinfo_constructor"), 32);
    // finish
    export const popcap_texture_atlas_split = new Void(localization("popcap_texture_atlas_split"), 33);
    export const popcap_texture_atlas_cat_simple = new Void(localization("popcap_texture_max_rects_bin_pack_simple"), 34);
    export const popcap_texture_atlas_cat = new Void(localization("popcap_texture_max_rects_bin_pack"), 35);
    export const popcap_texture_encode_rgba8888 = new Void(`PopCap PTX RGBA8888 ${localization("encode")} (0)`, 36);
    export const popcap_texture_encode_argb8888 = new Void(`PopCap PTX ARGB8888 ${localization("encode")} (0)`, 37);
    export const popcap_texture_encode_pvrtc = new Void(`PopCap PTX RGB_PVRTC4_A_8 ${localization("encode")} (30)`, 38);
    export const popcap_texture_encode_etc1a = new Void(`PopCap PTX RGB_ETC1_A_8 ${localization("encode")} (147)`, 39);
    // todo
    export const popcap_texture_encode_etc1a_index = new Void(`PopCap PTX RGB_ETC1_A_8_Index ${localization("encode")} (147)`, 40);
    // finish
    export const popcap_texture_decode_rgba8888 = new Void(`PopCap PTX RGBA8888 ${localization("decode")} (0)`, 41);
    export const popcap_texture_decode_argb8888 = new Void(`PopCap PTX ARGB8888 ${localization("decode")} (0)`, 42);
    export const popcap_texture_decode_pvrtc = new Void(`PopCap PTX RGB_PVRTC4_A_8 ${localization("decode")} (30)`, 43);
    export const popcap_texture_decode_etc1a = new Void(`PopCap PTX RGB_ETC1_A_8 ${localization("decode")} (147)`, 44);
    //todo
    export const popcap_texture_decode_etc1a_index = new Void(`PopCap PTX RGB_ETC1_A_8_Index ${localization("decode")} (147)`, 45);
    // finish
    export const popcap_texture_resize_atlas_simple = new Void(localization("popcap_texture_atlas_resize_simple"), 46);
    // todo
    export const popcap_texture_resize_atlas = new Void(localization("popcap_texture_atlas_resize"), 47);
    // finish
    export const tre_void_real_esrgan_upscaler_bitmap_content = new Void(localization("third_party_real_esrgan_upscaler"), 48);
    // finish
    export const popcap_zlib_rsgp_unpack = new Void(localization("popcap_zlib_rsgp_unpack"), 49);
    export const popcap_zlib_rsgp_pack = new Void(localization("popcap_zlib_rsgp_pack"), 50);
    //finish
    export const popcap_zlib_rsb_unpack = new Void(localization("popcap_game_data_rsb_unpack"), 51);
    export const popcap_zlib_rsb_pack = new Void(localization("popcap_game_data_rsb_pack"), 52);
    //finish
    export const popcap_zlib_smf_decompress = new Void(localization("popcap_smf_decompress"), 53);
    export const popcap_zlib_smf_compress = new Void(localization("popcap_smf_compress"), 54);
    // finish
    export const popcap_game_json_split = new Void(localization("popcap_game_packages_json_split"), 55);
    export const popcap_game_json_pack = new Void(localization("popcap_game_packages_json_cat"), 56);
    // finish
    export const tre_void_json_patch_work = new Void(localization("json_patch"), 57);
    export const tre_void_json_patch_generator = new Void(localization("json_patch_generator"), 58);
    export const popcap_texture_atlas_pack_cross_resolution = new Void(localization("popcap_atlas_pack_cross_resolution"), 59);
    export const popcap_lawnstrings_diff = new Void(localization("popcap_lawnstrings_diff"), 60);
    export const popcap_lawnstrings_convert_to_localization = new Void(localization("popcap_lawnstrings_convert_to_localization"), 61);
    export const popcap_lawnstrings_convert_from_localization = new Void(localization("popcap_lawnstrings_convert_from_localization"), 62);
    export const popcap_zlib_rsb_repair = new Void(localization("rsb_repair"), 63);
    export const popcap_rton_to_json = new Void(localization("rton_to_json"), 64);
    
    export function DisplayItems(toolkit_selector_array_list: Array<number>, display_item_list: Void, is_display_data: boolean = true): void {
        if (is_display_data) {
            Console.WriteLine(display_item_list.display());
        }
        toolkit_selector_array_list.push(display_item_list.void_number_readline_argument());
        return
    }

    export function BaseNameChecker(execute_file_dir: string, find_case_in_lower_case: string | number): boolean {
        find_case_in_lower_case = (typeof find_case_in_lower_case === 'number') ? find_case_in_lower_case.toString() : find_case_in_lower_case;
        if (path.parse(execute_file_dir).name.toString().toLowerCase().indexOf(find_case_in_lower_case) != -1) {
            return true;
        }
        return false;
    }
}