"use strict";
import unpack_rsb_core from "./unpack/unpack_rsb.js";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../../callback/localization.js";
import { Console } from "../../../callback/console.js";
import * as color from "../../../library/color/color.js";
import { readline_integer } from "../../../readline/prompt/util.js";
const arguments_default_modifier: any = fs_js.read_json(fs_js.functions_json_location, true);
function unpack_rsb_simple(rsb_path: string) {
    let decode_rtons: boolean = false;
    const popcap_packages_unpack =
        arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== undefined &&
        arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== null &&
        arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== void 0 &&
        (typeof arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion === "string" ||
            Number.isInteger(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion)) &&
        (parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion) === 1 ||
            parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion) === 0)
            ? parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion)
            : 2;
    if (popcap_packages_unpack === 2) {
        Console.WriteLine(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("extract_packages")}`));
        fs_js.execution_boolean_view();
    } else {
        const create_new_print_message = popcap_packages_unpack === 1 ? localization("extract_packages") : localization("no_extract_packages");
        fs_js.execution_auto(`${localization("popcap_rsb_unpack")} ~ ${create_new_print_message}`);
    }
    const create_new_empty_viewer_for_packages = popcap_packages_unpack === 2 ? readline_integer(0, 1) : popcap_packages_unpack;
    const unpack_packages: boolean = create_new_empty_viewer_for_packages === 1 ? true : false;
    if (unpack_packages) {
        const popcap_packages_conversion =
            arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== undefined &&
            arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== null &&
            arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion !== void 0 &&
            (typeof arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion === "string" ||
                Number.isInteger(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion)) &&
            (parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion) === 1 ||
                parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion) === 0)
                ? parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.packages_conversion)
                : 2;
        if (popcap_packages_conversion === 2) {
            Console.WriteLine(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("decode_rtons")}`));
            fs_js.execution_boolean_view();
        } else {
            const create_new_print_message = popcap_packages_conversion === 1 ? localization("decode_rtons") : localization("no_decode_rtons");
            fs_js.execution_auto(`${localization("popcap_rsb_unpack")} ~ ${create_new_print_message}`);
        }
        const create_new_empty_viewer = popcap_packages_conversion === 2 ? readline_integer(0, 1) : popcap_packages_conversion;
        decode_rtons = create_new_empty_viewer === 1 ? true : false;
    }
    const support_popcap_resources_conversion =
        arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources !== undefined &&
        arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources !== null &&
        arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources !== void 0 &&
        (typeof arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources === "string" ||
            Number.isInteger(arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources)) &&
        (parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources) === 1 ||
            parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources) === 0)
            ? parseInt(arguments_default_modifier.popcap_rsb_unpack.arguments.split_popcap_resources)
            : 2;
    if (support_popcap_resources_conversion === 2) {
        Console.WriteLine(color.fgcyan_string(`◉ ${localization("execution_argument")}: ${localization("split_res")}`));
        fs_js.execution_boolean_view();
    } else {
        const create_new_print_message = support_popcap_resources_conversion === 1 ? localization("split_popcap_res") : localization("no_split_res");
        fs_js.execution_auto(`${localization("popcap_rsb_unpack")} ~ ${create_new_print_message}`);
    }
    const split_res_boolean = support_popcap_resources_conversion === 2 ? readline_integer(0, 1) : support_popcap_resources_conversion;
    const split_res_json: boolean = split_res_boolean === 1 ? true : false;
    unpack_rsb_core(rsb_path, false, unpack_packages, decode_rtons, split_res_json);
}


export namespace rsb_functions {
    export function unpack_rsb(rsb_path: string) {
        unpack_rsb_simple(rsb_path);
    }
    export function unpack_rsb_resources(rsb_path: string) {
        unpack_rsb_core(rsb_path, true);
    }
}
