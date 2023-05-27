"use strict";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../../callback/localization.js";
import js_checker from "../../../callback/default/checker.js";
import { readline_normal } from "../../../readline/util.js";
import { MissingProperty } from "../../../implement/error.js";

function conduct_atlas_info(
    folder_system_as_string: string,
    resource_build_location: string,
    file_system_output_as_string?: string,
    read_resource_build: any = fs_js.read_json(`${folder_system_as_string}/resource_build.json`) as resource_build,
    is_return_mode: boolean = false,
    subgroup_name?: string,
): void | {
    method: string;
    subgroup: string;
    expand_path: string;
    trim: boolean;
    groups: Array<{
        id: string;
        path: Array<string>;
        x: number;
        y: number;
    }>;
} {
    if (
        file_system_output_as_string === undefined ||
        file_system_output_as_string === null ||
        file_system_output_as_string === void 0
    ) {
        file_system_output_as_string = `${fs_js.dirname(folder_system_as_string)}/Atlasinfo.json`;
    }
    if (!("extend_id" in read_resource_build) || !(typeof read_resource_build.extend_id === "string")) {
        throw new MissingProperty(localization("not_found_extend_id"), "extend_id", resource_build_location);
    }
    if (!("extend_path" in read_resource_build) || !js_checker.is_array(read_resource_build.extend_path)) {
        throw new MissingProperty(localization("not_found_extend_path"), "extend_path", resource_build_location);
    }
    if (!("popcap_resource_x" in read_resource_build)) {
        throw new MissingProperty(
            localization("not_found_popcap_resource_x"),
            "popcap_resource_x",
            resource_build_location,
        );
    }
    if (!("popcap_resource_y" in read_resource_build)) {
        throw new MissingProperty(
            localization("not_found_popcap_resource_y"),
            "popcap_resource_y",
            resource_build_location,
        );
    }
    if (
        !("popcap_resource_path_type" in read_resource_build) &&
        typeof read_resource_build.popcap_resource_path_type === "string"
    ) {
        throw new MissingProperty(
            localization("not_found_popcap_expand_path"),
            "popcap_resource_path_type",
            resource_build_location,
        );
    }
    if (!("trim" in read_resource_build)) {
        throw new MissingProperty(localization("not_found_trim"), "trim", resource_build_location);
    }
    const atlas_storage: string[] = new Array();
    fs_js.one_reader(folder_system_as_string).forEach((image) => {
        if (fs_js.parse_fs(image).ext.toString().toLowerCase() === ".png") {
            atlas_storage.push(fs_js.parse_fs(image).name);
        }
    });
    if (subgroup_name === undefined || subgroup_name === null || subgroup_name === void 0) {
        fs_js.execution_notify("argument", localization("concat_subgroup"));
        subgroup_name = readline_normal();
        while (true) {
            if (
                subgroup_name.indexOf("_1536") !== -1 ||
                subgroup_name.indexOf("_768") !== -1 ||
                subgroup_name.indexOf("_384") !== -1 ||
                subgroup_name.indexOf("_1200") !== -1 ||
                subgroup_name.indexOf("_640") !== -1
            ) {
                break;
            }
            fs_js.execution_notify("failed", localization("subgroup_does_not_contain"));
            subgroup_name = readline_normal();
        }
    }
    const extend_id: string = read_resource_build.extend_id;
    const extend_path: Array<string> = read_resource_build.extend_path;
    const popcap_resource_x: number = read_resource_build.popcap_resource_x;
    const popcap_resource_y: number = read_resource_build.popcap_resource_y;
    const popcap_support_trim: boolean = read_resource_build.trim;
    const popcap_resource_path_type: string = read_resource_build.popcap_resource_path_type;
    const create_atlas_info: {
        method: string;
        subgroup: string;
        expand_path: string;
        trim: boolean;
        groups: Array<{
            id: string;
            path: Array<string>;
            x: number;
            y: number;
        }>;
    } = {
        method: "path",
        subgroup: subgroup_name,
        expand_path: popcap_resource_path_type,
        trim: popcap_support_trim,
        groups: [],
    };
    for (let i: number = 0; i < atlas_storage.length; ++i) {
        const create_clone_path_array: Array<string> = [...extend_path];
        create_clone_path_array.push(atlas_storage[i]);
        create_atlas_info.groups.push({
            id: `${extend_id + atlas_storage[i].toUpperCase()}`,
            path: create_clone_path_array,
            x: popcap_resource_x,
            y: popcap_resource_y,
        });
    }
    if (!is_return_mode) {
        fs_js.write_json(file_system_output_as_string, create_atlas_info, false);
        return;
    }
    return create_atlas_info;
}

export default conduct_atlas_info;
