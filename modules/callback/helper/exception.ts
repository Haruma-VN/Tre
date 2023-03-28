"use strict";
namespace assertation_break {


    export const ban_list: Array<string> = [
        "popcap_atlas_split_advanced",
        "popcap_texture_atlas_split",
        "start",
        "end",
        "notify",
    ];


    export const default_functions: Array<string> =
        [
            "popcap_resources_split",
            "popcap_resources_cat",
            "popcap_resources_rewrite",
            "popcap_old_resources_conversion_to_new_resources",
            "popcap_new_resources_conversion_to_old_resources",
            "popcap_resources_local_data_compare",
            "popcap_resources_to_tre_info",
            "popcap_resources_to_atlasinfo",
            "popcap_resources_beautify",
            "atlas_info_split",
            "atlas_info_cat",
            "atlas_info_constructor",
            "popcap_texture_atlas_cat_simple",
            "popcap_texture_atlas_cat",
            "popcap_texture_encode_rgba8888",
            "popcap_texture_encode_argb8888",
            "popcap_texture_encode_pvrtc",
            "popcap_texture_encode_etc1a",
            "popcap_texture_encode_etc1a_index",
            "popcap_texture_decode_rgba8888",
            "popcap_texture_decode_argb8888",
            "popcap_texture_decode_pvrtc",
            "popcap_texture_decode_etc1a",
            "popcap_texture_decode_etc1a_index",
            "popcap_texture_resize_atlas_simple",
            "popcap_texture_resize_atlas",
            "real_esrgan_upscaler_image",
            "popcap_zlib_rsgp_unpack",
            "popcap_zlib_rsgp_pack",
            "popcap_zlib_rsb_unpack",
            "popcap_zlib_rsb_pack",
            "popcap_zlib_smf_decompress",
            "popcap_zlib_smf_compress",
            "popcap_game_json_split",
            "popcap_game_json_pack",
            "json_patch",
            "json_patch_generator",
            "popcap_texture_atlas_pack_cross_resolution",
            "popcap_lawnstrings_diff",
            "popcap_lawnstrings_convert_to_localization",
            "popcap_lawnstrings_convert_from_localization",
            "popcap_rton_to_json",
            "popcap_json_to_rton",
            "popcap_rton_decrypt_and_decode",
            "popcap_rton_encode_and_encrypt",
            "popcap_atlas_pack_advanced",
            "popcap_rsgp_unpack_simple",
            "popcap_rsgp_pack_simple",
            "popcap_rsb_unpack_simple",
            "popcap_rsb_pack_simple",
            "popcap_rsb_resource_unpack",
            "popcap_rsb_resource_pack",
            "popcap_pam_decode",
            "popcap_pam_encode",
            "popcap_pam_from_gif",
            "popcap_pam_to_flash",
            "popcap_flash_to_pam",
            "wwise_media_decode",
            "wwise_media_encode",
            "frame_rate_increasement",
            "popcap_pam_json_to_flash",
            "popcap_flash_to_pam_json",
        ];

    export const scrapped_lists: Array<string> = [
        "popcap_rsb_disturb",
    ]

    export const allowance_lists: Array<string> =
        [
            ...default_functions,
            ...scrapped_lists,
        ]



}

export default assertation_break;