"use strict";
import Void from "./function_class.js";
import { Console } from "./console.js";
import localization from "./localization.js";
import path from "node:path";
export var Display;
(function (Display) {
    var Tre;
    (function (Tre) {
        var Function;
        (function (Function) {
            Function.tre_void_third_party_md5_hash = new Void(localization("md5_hash"), 1);
            Function.tre_void_third_party_sha1_hash = new Void(localization("sha1_hash"), 2);
            Function.tre_void_third_party_sha3_hash = new Void(localization("sha3_hash"), 3);
            Function.tre_void_third_party_sha224_hash = new Void(localization("sha224_hash"), 4);
            Function.tre_void_third_party_sha256_hash = new Void(localization("sha256_hash"), 5);
            Function.tre_void_third_party_sha384_hash = new Void(localization("sha384_hash"), 6);
            Function.tre_void_third_party_sha512_hash = new Void(localization("sha512_hash"), 7);
            Function.tre_void_third_party_xor_encrypt = new Void(localization("xor_encrypt"), 8);
            Function.tre_void_third_party_aes_encrypt = new Void(localization("aes_encrypt"), 9);
            Function.tre_void_third_party_aes_decrypt = new Void(localization("aes_decrypt"), 10);
            Function.tre_void_third_party_base64_encode = new Void(localization("base64_encode"), 11);
            Function.tre_void_third_party_base64_decode = new Void(localization("base64_decode"), 12);
            Function.tre_void_third_party_zlib_gzip_compress = new Void(localization("gzip_compress"), 12);
            Function.tre_void_third_party_zlib_gzip_decompress = new Void(localization("gzip_decompress"), 13);
            Function.tre_void_third_party_zlib_deflate_compress = new Void(localization("deflate_compress"), 14);
            Function.tre_void_third_party_zlib_deflate_decompress = new Void(localization("deflate_decompress"), 15);
            Function.tre_void_third_party_zlib_compress = new Void(localization("zlib_compress"), 16);
            Function.tre_void_third_party_zlib_decompress = new Void(localization("zlib_decompress"), 17);
            Function.tre_void_javascript_void_execute = new Void(localization("js_execute"), 18);
            Function.popcap_resources_split = new Void(localization("popcap_resources_split"), 19);
            Function.popcap_resources_cat = new Void(localization("popcap_resources_cat"), 20);
            Function.popcap_resources_rewrite = new Void(localization("popcap_resources_rewrite"), 21);
            Function.popcap_old_resources_conversion_to_new_resources = new Void(localization("popcap_old_resources_conversion_to_new_resources"), 22);
            Function.popcap_new_resources_conversion_to_old_resources = new Void(localization("popcap_new_resources_conversion_to_old_resources"), 23);
            Function.popcap_resources_local_data_compare = new Void(localization("popcap_resources_local_compare"), 24);
            Function.popcap_resources_to_tre_info = new Void(localization("popcap_resources_to_tre_info"), 25);
            Function.popcap_resources_to_atlasinfo = new Void(localization("popcap_res_to_atlasinfo"), 27);
            Function.popcap_resources_beautify = new Void(localization("popcap_res_beautify"), 28);
            Function.tre_void_atlas_info_split = new Void(localization("atlasinfo_split"), 30);
            Function.tre_void_atlas_info_cat = new Void(localization("atlasinfo_cat"), 31);
            Function.tre_void_atlas_info_constructor = new Void(localization("atlasinfo_constructor"), 32);
            Function.popcap_texture_atlas_split = new Void(localization("popcap_texture_atlas_split"), 33);
            Function.popcap_texture_atlas_cat_simple = new Void(localization("popcap_texture_max_rects_bin_pack_simple"), 34);
            Function.popcap_texture_atlas_cat = new Void(localization("popcap_texture_max_rects_bin_pack"), 35);
            Function.popcap_texture_encode_rgba8888 = new Void(`PopCap PTX RGBA8888 ${localization("encode")} (0)`, 36);
            Function.popcap_texture_encode_argb8888 = new Void(`PopCap PTX ARGB8888 ${localization("encode")} (0)`, 37);
            Function.popcap_texture_encode_pvrtc = new Void(`PopCap PTX RGB_PVRTC4_A_8 ${localization("encode")} (30)`, 38);
            Function.popcap_texture_encode_etc1a = new Void(`PopCap PTX RGB_ETC1_A_8 ${localization("encode")} (147)`, 39);
            Function.popcap_texture_encode_etc1a_index = new Void(`PopCap PTX RGB_ETC1_A_8_Index ${localization("encode")} (147)`, 40);
            Function.popcap_texture_decode_rgba8888 = new Void(`PopCap PTX RGBA8888 ${localization("decode")} (0)`, 41);
            Function.popcap_texture_decode_argb8888 = new Void(`PopCap PTX ARGB8888 ${localization("decode")} (0)`, 42);
            Function.popcap_texture_decode_pvrtc = new Void(`PopCap PTX RGB_PVRTC4_A_8 ${localization("decode")} (30)`, 43);
            Function.popcap_texture_decode_etc1a = new Void(`PopCap PTX RGB_ETC1_A_8 ${localization("decode")} (147)`, 44);
            Function.popcap_texture_decode_etc1a_index = new Void(`PopCap PTX RGB_ETC1_A_8_Index ${localization("decode")} (147)`, 45);
            Function.popcap_texture_resize_atlas_simple = new Void(localization("popcap_texture_atlas_resize_simple"), 46);
            Function.popcap_texture_resize_atlas = new Void(localization("popcap_texture_atlas_resize"), 47);
            Function.tre_void_real_esrgan_upscaler_bitmap_content = new Void(localization("third_party_real_esrgan_upscaler"), 48);
            Function.popcap_zlib_rsgp_unpack = new Void(localization("popcap_zlib_rsgp_unpack"), 49);
            Function.popcap_zlib_rsgp_pack = new Void(localization("popcap_zlib_rsgp_pack"), 50);
            Function.popcap_zlib_rsb_unpack = new Void(localization("popcap_game_data_rsb_unpack"), 51);
            Function.popcap_zlib_rsb_pack = new Void(localization("popcap_game_data_rsb_pack"), 52);
            Function.popcap_zlib_smf_decompress = new Void(localization("popcap_smf_decompress"), 53);
            Function.popcap_zlib_smf_compress = new Void(localization("popcap_smf_compress"), 54);
            Function.popcap_game_json_split = new Void(localization("popcap_game_packages_json_split"), 55);
            Function.popcap_game_json_pack = new Void(localization("popcap_game_packages_json_cat"), 56);
            Function.tre_void_json_patch_work = new Void(localization("json_patch"), 57);
            Function.tre_void_json_patch_generator = new Void(localization("json_patch_generator"), 58);
            Function.popcap_texture_atlas_pack_cross_resolution = new Void(localization("popcap_atlas_pack_cross_resolution"), 59);
            Function.popcap_lawnstrings_diff = new Void(localization("popcap_lawnstrings_diff"), 60);
            Function.popcap_lawnstrings_convert_to_localization = new Void(localization("popcap_lawnstrings_convert_to_localization"), 61);
            Function.popcap_lawnstrings_convert_from_localization = new Void(localization("popcap_lawnstrings_convert_from_localization"), 62);
            Function.popcap_zlib_rsb_repair = new Void(localization("rsb_repair"), 63);
            Function.popcap_rton_to_json = new Void(localization("rton_to_json"), 64);
            Function.popcap_json_to_rton = new Void(localization("json_to_rton"), 65);
            Function.popcap_rton_decrypt_and_decode = new Void(localization("popcap_rton_decrypt_and_decode"), 66);
            Function.popcap_rton_encode_and_encrypt = new Void(localization("popcap_rton_encode_and_encrypt"), 67);
            Function.popcap_atlas_split_experimental = new Void(localization("popcap_atlas_split_experimental"), 70);
            Function.popcap_atlas_pack_experimental = new Void(localization("popcap_atlas_pack_experimental"), 71);
            Function.popcap_rsgp_unpack_simple = new Void(localization("popcap_rsgp_unpack_simple"), 72);
            Function.popcap_rsgp_pack_simple = new Void(localization("popcap_rsgp_pack_simple"), 73);
            Function.popcap_rsb_unpack_simple = new Void(localization("popcap_rsb_unpack_simple"), 74);
            Function.popcap_rsb_pack_simple = new Void(localization("popcap_rsb_pack_simple"), 75);
            Function.popcap_rsb_resource_unpack = new Void(localization("popcap_rsb_resource_unpack"), 76);
            Function.popcap_rsb_resource_pack = new Void(localization("popcap_rsb_resource_pack"), 77);
            function DisplayItems(toolkit_selector_array_list, display_item_list, is_display_data = true) {
                if (is_display_data) {
                    Console.WriteLine(display_item_list.display());
                }
                toolkit_selector_array_list.push(display_item_list.void_number_readline_argument());
                return;
            }
            Function.DisplayItems = DisplayItems;
            function BaseNameChecker(execute_file_dir, find_case_in_lower_case) {
                find_case_in_lower_case = (typeof find_case_in_lower_case === 'number') ? find_case_in_lower_case.toString() : find_case_in_lower_case;
                if (path.parse(execute_file_dir).name.toString().toLowerCase().indexOf(find_case_in_lower_case) != -1) {
                    return true;
                }
                return false;
            }
            Function.BaseNameChecker = BaseNameChecker;
        })(Function = Tre.Function || (Tre.Function = {}));
    })(Tre = Display.Tre || (Display.Tre = {}));
})(Display || (Display = {}));
