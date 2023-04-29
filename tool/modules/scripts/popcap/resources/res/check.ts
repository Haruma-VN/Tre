"use strict";
import localization from "../../../../callback/localization.js";
abstract class check_resource {
    protected static check_integer_number(num: number): boolean {
        if (!Number.isInteger(num)) {
            throw new Error(`${localization("this_property_must_be_integer")}, ${localization("received")} ${num}`);
        }
        return true;
    }
    protected static check_whole_data(
        sub_resource_data: Resource_Structure_Template,
    ): sub_resource_data is Resource_Structure_Template {
        if (
            !("resources" in sub_resource_data) ||
            sub_resource_data.resources === undefined ||
            sub_resource_data.resources === null ||
            sub_resource_data.resources === void 0
        ) {
            throw new Error(localization("property_resources_is_null"));
        }
        if (
            !("id" in sub_resource_data) ||
            sub_resource_data.id === undefined ||
            sub_resource_data.id === null ||
            sub_resource_data.id === void 0
        ) {
            throw new Error(localization("property_id_is_null"));
        }
        return true;
    }
    protected static check_official<Template extends Resources_Group_Structure_Template>(
        resources_group: Template,
    ): resources_group is Template {
        if (!("groups" in resources_group)) {
            throw new Error(localization("property_groups_is_null"));
        }
        return true;
    }
    protected static check_img_data<Resource_Template extends Resource_Structure_Template>(
        sub_resource_data: Resource_Template,
    ): sub_resource_data is Resource_Template {
        this.check_whole_data(sub_resource_data);
        if (
            !("res" in sub_resource_data) ||
            sub_resource_data.res === undefined ||
            sub_resource_data.res === null ||
            sub_resource_data.res === void 0
        ) {
            throw new Error(localization("property_res_is_null"));
        }
        return true;
    }
    protected static check_res_json<Template extends res_json>(res_json: Template): res_json is Template {
        if (!("expand_path" in res_json)) {
            throw new Error(localization("property_expand_path_is_null"));
        }
        if (!(res_json.expand_path === "array") && !(res_json.expand_path === ("string" as any))) {
            throw new Error(localization("property_expand_path_does_not_meet_requirement"));
        }
        if (!("groups" in res_json)) {
            throw new Error(localization("property_groups_is_null"));
        }
        return true;
    }
    protected static check_string(assert_test: any): assert_test is string {
        if (typeof assert_test !== "string") {
            throw new Error(localization("not_a_string"));
        }
        return true;
    }
}

export default check_resource;
