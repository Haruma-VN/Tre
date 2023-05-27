"use strict";
import check_resource from "../check.js";
import fs_js from "../../../../../library/fs/implement.js";

class split_res_json extends check_resource {
    private static set_info<Template extends res_json, Value extends Output_Value>(
        res_json: Template,
        file_path: string,
    ): Value | Output_Value {
        this.check_res_json(res_json, file_path);
        const info_json: Output_Value | Value = {
            information: {
                expand_path: res_json.expand_path as "string" | "array",
            },
            groups: Object.keys(res_json.groups),
        };
        return info_json;
    }
    private static create_subgroup<Template extends res_json_children, Value extends small_bundle_info_json>(
        res_json: Template,
    ): Value | small_bundle_info_json {
        const info_json: Value | small_bundle_info_json = {
            is_composite: res_json.is_composite,
            subgroups: Object.keys(res_json.subgroup),
        };
        return info_json;
    }
    private static create_whole_directory<Template extends Output_Value>(
        save_directory: string,
        info_json: Template,
    ): void {
        for (const directory of info_json.groups) {
            fs_js.create_directory(`${save_directory}/${directory}`, true);
        }
        return;
    }
    public static do_process_whole<Template extends res_json>(
        file_path: string,
        save_directory: string = `${fs_js.dirname(file_path)}/${fs_js.parse_fs(file_path).name}.info`,
    ): void {
        const groups_directory: string = `${save_directory}/groups`;
        const res_json: Template = fs_js.read_json(file_path) as Template;
        const info_json: Output_Value = this.set_info<Template, Output_Value>(res_json, file_path);
        fs_js.create_directory(`${save_directory}`, true);
        fs_js.write_json(`${save_directory}/info.json`, info_json, true);
        fs_js.create_directory(groups_directory, true);
        this.create_whole_directory<Output_Value>(groups_directory, info_json);
        for (let index: number = 0; index < info_json.groups.length; ++index) {
            const subgroup_info_json: small_bundle_info_json = this.create_subgroup<
                res_json_children,
                small_bundle_info_json
            >(res_json.groups[info_json.groups[index]]);
            fs_js.write_json(`${groups_directory}/${info_json.groups[index]}/data.json`, subgroup_info_json, true);
            const directory_contain_whole_subgroups: string = `${groups_directory}/${info_json.groups[index]}/subgroup`;
            fs_js.create_directory(directory_contain_whole_subgroups, true);
            const subgroup_keys: Array<string> = Object.keys(res_json.groups[info_json.groups[index]].subgroup);
            for (let j_index: number = 0; j_index < subgroup_keys.length; ++j_index) {
                fs_js.write_json(
                    `${directory_contain_whole_subgroups}/${subgroup_keys[j_index]}.json`,
                    res_json.groups[info_json.groups[index]].subgroup[subgroup_keys[j_index]],
                    true,
                );
            }
        }
        return;
    }
    /**
     *
     * @param file_path - Pass file, etc: ".json"
     * @param output_dir - Pass output directory, skip is fine
     * @returns
     */
    public static create_conversion(file_path: string, output_dir?: string): void {
        this.do_process_whole<res_json>(file_path, output_dir);
        return;
    }
}

export default split_res_json;
