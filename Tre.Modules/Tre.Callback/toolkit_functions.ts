"use strict";
import Void from "./function_class.js";
import { Console } from "./console.js";
import path from "node:path";
export namespace Display.Tre.Function {
    // finish
    export const tre_void_third_party_md5_hash = new Void("MD5 Hash", 1);
    export const tre_void_third_party_sha1_hash = new Void("Sha1 Hash", 2);
    export const tre_void_third_party_sha3_hash = new Void("Sha3 Hash", 3);
    export const tre_void_third_party_sha224_hash = new Void("Sha224 Hash", 4);
    export const tre_void_third_party_sha256_hash = new Void("Sha256 Hash", 5);
    export const tre_void_third_party_sha384_hash = new Void("Sha384 Hash", 6);
    export const tre_void_third_party_sha512_hash = new Void("Sha512 Hash", 7);
    export const tre_void_third_party_xor_encrypt = new Void("XOR Encrypt", 8);
    // todo
    export const tre_void_third_party_aes_encrypt = new Void("AES Encrypt", 9);
    export const tre_void_third_party_aes_decrypt = new Void("AES Decrypt", 10);
    // finish
    export const tre_void_third_party_base64_encode = new Void("Base64 Encode", 11);
    export const tre_void_third_party_base64_decode = new Void("Base64 Decode", 12);
    export const tre_void_third_party_zlib_gzip_compress = new Void("GZip Compress", 12);
    export const tre_void_third_party_zlib_gzip_decompress = new Void("GZip Decompress", 13);
    export const tre_void_third_party_zlib_deflate_compress = new Void("Deflate Compress", 14);
    export const tre_void_third_party_zlib_deflate_decompress = new Void("Deflate Decompress", 15);
    export const tre_void_third_party_zlib_compress = new Void("Zlib Compress", 16);
    export const tre_void_third_party_zlib_decompress = new Void("Zlib Decompress", 17);
    export const tre_void_javascript_void_execute = new Void("JavaScript Void Execute", 18);
    // finish
    export const popcap_resources_split = new Void("PopCap Resources Split", 19);
    export const popcap_resources_cat = new Void("PopCap Resources Concat", 20);
    export const popcap_resources_rewrite = new Void("PopCap Resources Rewrite", 21);
    //todo
    export const popcap_resources_export_packet_data = new Void("PopCap Resources Export Packet", 22);
    export const popcap_resources_remove_unused_texture_format = new Void("PopCap Resources Remove Texture Format", 23);
    // missing?
    // export const popcap_resources_cat = new Void("PopCap Resources Concat", 24);
    // export const popcap_resources_cat = new Void("PopCap Resources Concat", 25);
    // export const popcap_resources_cat = new Void("PopCap Resources Concat", 26);
    // finish
    // exception as this.awaiting_for_finish
    export const popcap_resources_repair = new Void("PopCap Resources Repair Packet", 26);
    // finish
    export const popcap_resources_to_atlasinfo = new Void("PopCap Res to AtlasInfo", 27);
    export const popcap_resources_beautify = new Void("PopCap Res Beautify", 28);
    // finish
    export const tre_void_atlas_info_split = new Void("AtlasInfo Split", 30);
    export const tre_void_atlas_info_cat = new Void("AtlasInfo Cat", 31);
    // todo
    export const tre_void_atlas_info_constructor = new Void("AtlasInfo Constructor", 32);
    // finish
    export const popcap_texture_atlas_split = new Void("PopCap Atlas Split", 33);
    export const popcap_texture_atlas_cat_simple = new Void("PopCap Atlas Max-Rects-Bin-Pack Simple", 34);
    export const popcap_texture_atlas_cat = new Void("PopCap Atlas Max-Rects-Bin-Pack", 35);
    export const popcap_texture_encode_rgba8888 = new Void("PopCap PTX RGBA8888 Encode (0)", 36);
    export const popcap_texture_encode_argb8888 = new Void("PopCap PTX ARGB8888 Encode (0)", 37);
    export const popcap_texture_encode_pvrtc = new Void("PopCap PTX RGB_PVRTC4_A_8 Encode (30)", 38);
    export const popcap_texture_encode_etc1a = new Void("PopCap PTX RGB_ETC1_A_8 Encode (147)", 39);
    // todo
    export const popcap_texture_encode_etc1a_index = new Void("PopCap PTX RGB_ETC1_A_8_Index Encode (147)", 40);
    // finish
    export const popcap_texture_decode_rgba8888 = new Void("PopCap PTX RGBA8888 Decode (0)", 41);
    export const popcap_texture_decode_argb8888 = new Void("PopCap PTX ARGB8888 Decode (0)", 42);
    export const popcap_texture_decode_pvrtc = new Void("PopCap PTX RGB_PVRTC4_A_8 Decode (30)", 43);
    export const popcap_texture_decode_etc1a = new Void("PopCap PTX RGB_ETC1_A_8 Decode (147)", 44);
    //todo
    export const popcap_texture_decode_etc1a_index = new Void("PopCap PTX RGB_ETC1_A_8_Index Decode (147)", 45);
    // finish
    export const popcap_texture_resize_atlas_simple = new Void("PopCap Atlas Resize Simple", 46);
    // todo
    export const popcap_texture_resize_atlas = new Void("PopCap Atlas Resize", 47);
    // finish
    export const tre_void_real_esrgan_upscaler_bitmap_content = new Void("Real-ESRGAN Upscaler", 48);
    // finish
    export const popcap_zlib_rsgp_unpack = new Void("PopCap RSGP Unpack", 49);
    export const popcap_zlib_rsgp_pack = new Void("PopCap RSGP Pack", 50);
    //finish
    export const popcap_zlib_rsb_unpack = new Void("PopCap RSB Unpack", 51);
    // todo
    export const popcap_zlib_rsb_pack = new Void("PopCap RSB Pack", 52);
    // todo
    export const popcap_game_json_split = new Void("PopCap JSON Split", 53);
    export const popcap_game_json_pack = new Void("PopCap JSON Concat", 54);
    // finish
    export const tre_void_json_patch_work = new Void("JSON Patch", 55);
    export const tre_void_json_patch_generator = new Void("JSON Patch Generate", 56)
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