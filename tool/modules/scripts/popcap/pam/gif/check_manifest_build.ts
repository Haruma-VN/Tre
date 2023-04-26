import { readline_normal } from "../../../../readline/util.js";
import fs_js from "../../../../library/fs/implement.js";
import * as color from "../../../../library/color/color.js";
import js_checker from "../../../../callback/default/checker.js";
import localization from "../../../../callback/localization.js";
import { Console } from "../../../../callback/console.js";

/**
 *
 * @param file_system_output_path_for_gif_to_pam - Pass an argument here to test
 * @returns - If passed all the test case, valid
 */

function check_manifest_build(
    file_system_output_path_for_gif_to_pam: string
): resource_build {
    fs_js.copy_manifest(file_system_output_path_for_gif_to_pam);
    let create_readline_interface: string = readline_normal();
    while (true) {
        if (create_readline_interface === "") {
            break;
        }
        Console.WriteLine(
            color.yellow_string(
                `◉ ${localization("execution_warning")}: ${localization(
                    "pass_an_empty_str"
                )}`
            )
        );
        create_readline_interface = readline_normal();
    }
    const read_resource_build: any = fs_js.read_json(
        `${file_system_output_path_for_gif_to_pam}/resource_build.json`
    ) as resource_build;
    if (
        !("extend_id" in read_resource_build) ||
        !(typeof read_resource_build.extend_id === "string")
    ) {
        throw new Error(localization("not_found_extend_id"));
    }
    if (
        !("extend_path" in read_resource_build) ||
        !js_checker.is_array(read_resource_build.extend_path)
    ) {
        throw new Error(localization("not_found_extend_path"));
    }
    if (!("position_x" in read_resource_build)) {
        throw new Error(localization("not_found_position_x"));
    }
    if (!("position_y" in read_resource_build)) {
        throw new Error(localization("not_found_position_y"));
    }
    if (!("popcap_resource_x" in read_resource_build)) {
        throw new Error(localization("not_found_popcap_resource_x"));
    }
    if (!("popcap_resource_y" in read_resource_build)) {
        throw new Error(localization("not_found_popcap_resource_y"));
    }
    if (!("frame_rate" in read_resource_build)) {
        throw new Error(localization("not_found_frame_rate"));
    }
    if (
        !("version" in read_resource_build) ||
        parseInt(read_resource_build.version) > 6 ||
        parseInt(read_resource_build) < 1
    ) {
        throw new Error(localization("not_found_version"));
    }
    if (
        !("position" in read_resource_build) ||
        !js_checker.is_array(read_resource_build.position)
    ) {
        throw new Error(localization("not_found_position"));
    }
    if (
        !("popcap_resource_path_type" in read_resource_build) &&
        typeof read_resource_build.popcap_resource_path_type === "string"
    ) {
        throw new Error(localization("not_found_popcap_expand_path"));
    }
    if (!("trim" in read_resource_build)) {
        throw new Error(localization("not_found_trim"));
    }
    if (!("scale_ratio" in read_resource_build)) {
        throw new Error(localization("not_found_scale_ratio"));
    }
    return read_resource_build;
}

export default check_manifest_build;
