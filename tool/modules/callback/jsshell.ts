"use strict";
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
import { Console } from "./console.js";
import { atlas_info_cat, atlas_info_split, atlasinfo_conduct } from "../scripts/default/atlas_info/util.js";
import * as color from "../library/color/color.js";
import ban from "./public/js_evaluate/ban.js";
import applyPatch from "../library/json/patch.js";
import generatePatch from "../library/json/generate_patch.js";
import * as ImagesUtilities from "../library/img/util.js";
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
import { popcap_bnk_decode, popcap_bnk_encode } from "../scripts/popcap/wwise/util.js";
import { create_evaluate } from "./helper/util.js";
import popcap_resource_to_res from "../scripts/popcap/resources/res/encode.js";
import popcap_res_to_resource from "../scripts/popcap/resources/res/to_official.js";
import vm from "node:vm";
import merge_res_json from "../scripts/popcap/resources/res/merge/merge.js";
import split_res_json from "../scripts/popcap/resources/res/split/split.js";

export default async function js_evaluate(execute_file_dir: string): Promise<void> {
    const js_shell_string_await_for_executor: string = fs_js.read_file(execute_file_dir, "utf8");
    let javascript_shell_allow_this_funcction: boolean = ban(
        [
            "eval",
            "exec",
            "execSync",
            "spawn",
            "setTimeout",
            "setInterval",
            "require",
            "import",
            "export",
            "node:fs",
            "window",
            "interface",
            "abstract",
            "with",
            "var",
            "readline",
            "fetch",
            "document",
            "vm",
            "console",
        ],
        js_shell_string_await_for_executor,
    );
    if (javascript_shell_allow_this_funcction) {
        const injector_script: vm.Script = new vm.Script(js_shell_string_await_for_executor);
        let old_to_new_conversion: AdaptPvZ2InternationalResPath.res_conversion =
            new AdaptPvZ2InternationalResPath.res_conversion();
        const context = {
            Console: Console,
            javascript_evaluate: js_evaluate,
            popcap_resources_split: res_split,
            popcap_resources_cat: res_pack,
            popcap_resources_rewrite: res_rewrite,
            /**
             * @param 1: old -> new
             * @param 2: new -> old
             */
            popcap_resources_conversion: old_to_new_conversion.write_fs_js_json,
            popcap_resources_local_data_compare: LocalResourcesCompare,
            fs_js: fs_js,
            popcap_resources_to_manifest: RSBInfo.Tre.Utilities.create_tre_rsb_info,
            popcap_resources_to_atlasinfo: restoAtlasinfo,
            popcap_resources_beautify: small_res_beautify,
            atlas_info_split: atlas_info_split,
            atlas_info_cat: atlas_info_cat,
            atlas_info_constructor: atlasinfo_conduct,
            /**
             * @param - async await function please catch it
             */
            popcap_atlas_split: atlas_split,
            popcap_atlas_merge: atlas_cat,
            popcap_resize_sprites: resize_atlas,
            real_esrgan_upscaler_image: ImagesUtilities.real_esrgan,
            popcap_packages_json_split: PopCapPackages.Json.Split,
            popcap_packages_json_merge: PopCapPackages.Json.CatToFile,
            json_patch: applyPatch,
            json_patch_generator: generatePatch,
            popcap_atlas_pack_cross_resolution: cross_resolution,
            popcap_lawnstrings_diff: Lawnstrings.popcap.WriteDiffJSON,
            popcap_lawnstrings_convert_to_localization: Lawnstrings.popcap.WriteLocalizationJSON,
            popcap_lawnstrings_convert_from_localization:
                Lawnstrings.popcap.WritePopCapLawnstringsFromLocalizationLawnstrings,
            popcap_rton_to_json: popcap_rton_to_json,
            popcap_json_to_rton: popcap_json_to_rton,
            popcap_rton_decrypt_and_decode: rton_decrypt_and_decode_to_json,
            popcap_rton_encode_and_encrypt: popcap_json_to_rton_and_encrypt,
            popcap_atlas_split_advanced: atlas_split_advanced,
            popcap_atlas_pack_advanced: atlas_pack_advanced,
            popcap_pam_decode: popcap_pam_decode,
            popcap_pam_encode: popcap_pam_encode,
            popcap_pam_from_gif: gif_to_pam,
            popcap_pam_to_flash: popcap_pam_to_flash,
            popcap_flash_to_pam: popcap_flash_to_pam,
            wwise_soundbank_decode: popcap_bnk_decode,
            wwise_soundbank_encode: popcap_bnk_encode,
            frame_rate_increasement: frame_rate_increasement,
            popcap_pam_json_to_flash: popcap_pam_json_to_flash,
            popcap_flash_to_pam_json: popcap_flash_to_pam_json,
            script_evaluate: create_evaluate,
            flash_animation_resize: flash_animation_resize,
            popcap_repair_resources_path: RepairPvZ2CResourcesPath,
            batch_popcap_animation_add_media_content: add_content,
            popcap_resource_to_res: popcap_resource_to_res,
            popcap_res_to_resource: popcap_res_to_resource,
            color: color,
            popcap_pam_to_json_obj: read_pam,
            localization: localization,
            js_checker: js_checker,
            popcap_split_res_json: split_res_json.create_conversion,
            popcap_merge_res_json: merge_res_json.create_conversion,
        };
        const sandbox = vm.createContext(context);
        await injector_script.runInContext(sandbox);
    } else {
        return;
    }
}
