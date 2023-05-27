"use strict";
import localization from "../../../../callback/localization.js";
import { WrongDataType } from "../../../../implement/error.js";
import fs_js from "../../../../library/fs/implement.js";
import check_resource from "./check.js";

class resource_conversion extends check_resource {
    public static check_path_type<Template extends Resources_Group_Structure_Template>(
        resource_json: Template,
        file_path: string,
    ): "array" | "string" {
        for (let index: number = 0; index < resource_json.groups.length; ++index) {
            if ("resources" in resource_json.groups[index]) {
                for (let j_index: number = 0; j_index < resource_json.groups[index].resources.length; ++j_index) {
                    if (
                        "path" in resource_json.groups[index].resources[j_index] &&
                        Array.isArray(resource_json.groups[index].resources[j_index])
                    ) {
                        return "array";
                    } else {
                        return "string";
                    }
                }
            }
        }
        throw new WrongDataType(
            localization("path_is_invalid"),
            "path",
            file_path,
            localization("expected_path_must_be_an_array_or_string"),
        );
    }
    private static convert_file<Template extends Resource_Structure_Template, Value extends subgroup_children>(
        sub_resource_data: Template,
        file_path: string,
    ): Value {
        this.check_whole_data(sub_resource_data, file_path);
        const res_json_conversion: Value = {
            [sub_resource_data.id]: {
                type: null,
                packet: {
                    type: "File",
                    data: {},
                },
            },
        } as any;
        for (let index: number = 0; index < sub_resource_data.resources?.length; ++index) {
            (res_json_conversion[sub_resource_data.id].packet.data as any)[sub_resource_data.resources[index].id] =
                sub_resource_data.resources[index].srcpath !== undefined &&
                sub_resource_data.resources[index].srcpath !== null &&
                sub_resource_data.resources[index].srcpath !== void 0 &&
                (Array.isArray(sub_resource_data.resources[index].srcpath) ||
                    typeof sub_resource_data.resources[index].srcpath === "string")
                    ? {
                          type: sub_resource_data.resources[index].type as string,
                          path: Array.isArray(sub_resource_data.resources[index].path)
                              ? sub_resource_data.resources[index].path
                              : ((sub_resource_data.resources[index].path as string).split("\\") as Array<string> &
                                    any),
                          forceOriginalVectorSymbolSize:
                              sub_resource_data.resources[index].forceOriginalVectorSymbolSize,
                          srcpath: Array.isArray(sub_resource_data.resources[index].srcpath)
                              ? sub_resource_data.resources[index].srcpath
                              : ((sub_resource_data.resources[index].srcpath as string).split("\\") as Array<string> &
                                    any),
                      }
                    : {
                          type: sub_resource_data.resources[index].type as string,
                          path: Array.isArray(sub_resource_data.resources[index].path)
                              ? sub_resource_data.resources[index].path
                              : ((sub_resource_data.resources[index].path as string).split("\\") as Array<string> &
                                    any),
                          forceOriginalVectorSymbolSize:
                              sub_resource_data.resources[index].forceOriginalVectorSymbolSize,
                      };
        }
        return res_json_conversion;
    }
    private static convert_img<Template extends Resource_Structure_Template>(
        sub_resource_data: Template,
        file_path: string,
    ): sprite_data {
        this.check_img_data<Resource_Structure_Template>(sub_resource_data, file_path);
        const res_json_conversion: sprite_data = {
            [sub_resource_data.id]: {
                type: sub_resource_data.res !== undefined ? (sub_resource_data.res as resolution) : null,
                packet: {},
            },
        };
        for (let index: number = 0; index < sub_resource_data.resources.length; ++index) {
            if ("atlas" in sub_resource_data.resources[index]) {
                res_json_conversion[sub_resource_data.id].packet[sub_resource_data.resources[index].id] = {
                    type: sub_resource_data.resources[index].type,
                    path: Array.isArray(sub_resource_data.resources[index].path)
                        ? sub_resource_data.resources[index].path
                        : ((sub_resource_data.resources[index].path as string).split("\\") as Array<string> & any),
                    dimension: {
                        width: sub_resource_data.resources[index].width,
                        height: sub_resource_data.resources[index].height,
                    },
                    data: {},
                } as any;
                for (let j_index: number = 0; j_index < sub_resource_data.resources.length; ++j_index) {
                    if (sub_resource_data.resources[j_index].parent === sub_resource_data.resources[index].id) {
                        res_json_conversion[sub_resource_data.id].packet[sub_resource_data.resources[index].id].data[
                            sub_resource_data.resources[j_index].id
                        ] = {
                            default: {
                                ax:
                                    sub_resource_data.resources[j_index].ax !== undefined &&
                                    sub_resource_data.resources[j_index].ax !== null &&
                                    sub_resource_data.resources[j_index].ax !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].ax as number,
                                        "ax",
                                        file_path,
                                    ) &&
                                    (sub_resource_data.resources[j_index].ax as number) > 0
                                        ? sub_resource_data.resources[j_index].ax
                                        : Math.abs(sub_resource_data.resources[j_index].ax as number),
                                ay:
                                    sub_resource_data.resources[j_index].ay !== undefined &&
                                    sub_resource_data.resources[j_index].ay !== null &&
                                    sub_resource_data.resources[j_index].ay !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].ay as number,
                                        "ay",
                                        file_path,
                                    ) &&
                                    (sub_resource_data.resources[j_index].ay as number) > 0
                                        ? sub_resource_data.resources[j_index].ay
                                        : Math.abs(sub_resource_data.resources[j_index].ay as number),
                                aw:
                                    sub_resource_data.resources[j_index].aw !== undefined &&
                                    sub_resource_data.resources[j_index].aw !== null &&
                                    sub_resource_data.resources[j_index].aw !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].aw as number,
                                        "aw",
                                        file_path,
                                    ) &&
                                    (sub_resource_data.resources[j_index].aw as number) > 0
                                        ? sub_resource_data.resources[j_index].aw
                                        : Math.abs(sub_resource_data.resources[j_index].aw as number),
                                ah:
                                    sub_resource_data.resources[j_index].ah !== undefined &&
                                    sub_resource_data.resources[j_index].ah !== null &&
                                    sub_resource_data.resources[j_index].ah !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].ah as number,
                                        "ah",
                                        file_path,
                                    ) &&
                                    (sub_resource_data.resources[j_index].ah as number) > 0
                                        ? sub_resource_data.resources[j_index].ah
                                        : Math.abs(sub_resource_data.resources[j_index].ah as number),
                                x:
                                    sub_resource_data.resources[j_index].x !== undefined &&
                                    sub_resource_data.resources[j_index].x !== null &&
                                    sub_resource_data.resources[j_index].x !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].x as number,
                                        "x",
                                        file_path,
                                    )
                                        ? sub_resource_data.resources[j_index].x
                                        : 0,
                                y:
                                    sub_resource_data.resources[j_index].y !== undefined &&
                                    sub_resource_data.resources[j_index].y !== null &&
                                    sub_resource_data.resources[j_index].y !== void 0 &&
                                    this.check_integer_number(
                                        sub_resource_data.resources[j_index].y as number,
                                        "y",
                                        file_path,
                                    )
                                        ? sub_resource_data.resources[j_index].y
                                        : 0,
                                cols: sub_resource_data.resources[j_index].cols,
                            },
                            path: Array.isArray(sub_resource_data.resources[j_index].path)
                                ? sub_resource_data.resources[j_index].path
                                : ((sub_resource_data.resources[j_index].path as string).split("\\") as Array<string> &
                                      any),
                            type: sub_resource_data.resources[j_index].type as string,
                        };
                    }
                }
            }
        }
        return res_json_conversion;
    }
    public static do_process_whole<Template extends Resources_Group_Structure_Template, Value_Return extends res_json>(
        resources_group: Template,
        file_path: string,
    ): Value_Return {
        this.check_official<Template>(resources_group, file_path);
        const res_json: Value_Return = {
            expand_path: this.check_path_type<Resources_Group_Structure_Template>(resources_group, file_path),
            groups: {},
        } as Value_Return;
        const subgroups_parent_containers: Array<{
            [x: string]: Array<{
                name: string;
                image: null | "1536" | "768" | "384" | "640" | "1200";
            }>;
        }> = new Array();
        const subgroups_independent_construct: Array<string> = new Array();
        for (let index: number = 0; index < resources_group.groups.length; ++index) {
            if ("subgroups" in resources_group.groups[index]) {
                const subgroup_template_container_parent: Array<{
                    name: string;
                    image: null | "1536" | "768" | "384" | "640" | "1200";
                }> = new Array();
                for (let j_index: number = 0; j_index < resources_group.groups[index].subgroups.length; ++j_index) {
                    subgroup_template_container_parent.push({
                        name: resources_group.groups[index].subgroups[j_index].id as string,
                        image:
                            resources_group.groups[index].subgroups[j_index].res !== undefined &&
                            resources_group.groups[index].subgroups[j_index].res !== null &&
                            resources_group.groups[index].subgroups[j_index].res !== void 0 &&
                            typeof resources_group.groups[index].subgroups[j_index].res === "string"
                                ? (resources_group.groups[index].subgroups[j_index].res as
                                      | "1536"
                                      | "768"
                                      | "384"
                                      | "640"
                                      | "1200")
                                : null,
                    });
                }
                subgroups_parent_containers.push({
                    [resources_group.groups[index].id]: subgroup_template_container_parent,
                });
            }
            if (!("parent" in resources_group.groups[index]) && !("subgroups" in resources_group.groups[index])) {
                subgroups_independent_construct.push(resources_group.groups[index].id);
            }
        }
        for (let index: number = 0; index < subgroups_parent_containers.length; ++index) {
            const current_subgroup_name: string = Object.keys(subgroups_parent_containers[index])[0];
            res_json.groups[current_subgroup_name] = {
                is_composite: true,
                subgroup: {},
            };
            const subgroup_list: Array<
                Array<{
                    name: string;
                    image: null | "1536" | "768" | "384" | "640" | "1200";
                }>
            > = Object.values(subgroups_parent_containers[index]);
            for (let j_index: number = 0; j_index < subgroup_list.length; ++j_index) {
                for (let k_index: number = 0; k_index < subgroup_list[j_index].length; ++k_index) {
                    res_json.groups[current_subgroup_name].subgroup[subgroup_list[j_index][k_index].name] =
                        subgroup_list[j_index][k_index].image !== null
                            ? Object.values(
                                  this.convert_img(
                                      resources_group.groups.filter(
                                          (res) => res.id === subgroup_list[j_index][k_index].name,
                                      )[0] as any,
                                      file_path,
                                  ),
                              )[0]
                            : (Object.values(
                                  this.convert_file(
                                      resources_group.groups.filter(
                                          (res) => res.id === subgroup_list[j_index][k_index].name,
                                      )[0] as any,
                                      file_path,
                                  ) as any,
                              )[0] as any);
                }
            }
        }
        for (let index: number = 0; index < subgroups_independent_construct.length; ++index) {
            res_json.groups[subgroups_independent_construct[index]] = {
                is_composite: false,
                subgroup: {},
            };
            res_json.groups[subgroups_independent_construct[index]].subgroup = this.convert_file(
                resources_group.groups.filter((res) => res.id === subgroups_independent_construct[index])[0],
                file_path,
            );
        }
        return res_json;
    }
    public static create_conversion<
        Required_Template extends Resources_Group_Structure_Template,
        Res_JSON_Structure extends res_json,
    >(file_input: string, not_notify: boolean, output_file: string = `${fs_js.dirname(file_input)}/res.json`): void {
        const resource_json: Required_Template = fs_js.read_json(file_input) as Required_Template;
        fs_js.write_json(
            output_file,
            this.do_process_whole<Required_Template, Res_JSON_Structure>(resource_json, file_input),
            not_notify,
        );
    }
}

export default resource_conversion;
