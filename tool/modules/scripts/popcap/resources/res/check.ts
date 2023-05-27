"use strict";
import localization from "../../../../callback/localization.js";
import { MissingProperty, WrongDataType, WrongPropertyValue } from "../../../../implement/error.js";
abstract class check_resource {
    protected static check_integer_number(num: number, property: string, file_path: string): boolean {
        if (!Number.isInteger(num)) {
            throw new WrongPropertyValue(
                `${localization("this_property_must_be_integer")} & ${localization("received")} ${num}`,
                property,
                file_path,
            );
        }
        return true;
    }
    protected static check_whole_data(
        sub_resource_data: Resource_Structure_Template,
        file_path: string,
    ): sub_resource_data is Resource_Structure_Template {
        if (
            !("resources" in sub_resource_data) ||
            sub_resource_data.resources === undefined ||
            sub_resource_data.resources === null ||
            sub_resource_data.resources === void 0
        ) {
            throw new MissingProperty(localization("property_resources_is_null"), "resources", file_path);
        }
        if (
            !("id" in sub_resource_data) ||
            sub_resource_data.id === undefined ||
            sub_resource_data.id === null ||
            sub_resource_data.id === void 0
        ) {
            throw new MissingProperty(localization("property_id_is_null"), "id", file_path);
        }
        return true;
    }
    protected static check_official<Template extends Resources_Group_Structure_Template>(
        resources_group: Template,
        file_path: string,
    ): resources_group is Template {
        if (!("groups" in resources_group)) {
            throw new MissingProperty(localization("property_groups_is_null"), "groups", file_path);
        }
        return true;
    }
    protected static check_img_data<Resource_Template extends Resource_Structure_Template>(
        sub_resource_data: Resource_Template,
        file_path: string,
    ): sub_resource_data is Resource_Template {
        this.check_whole_data(sub_resource_data, file_path);
        if (
            !("res" in sub_resource_data) ||
            sub_resource_data.res === undefined ||
            sub_resource_data.res === null ||
            sub_resource_data.res === void 0
        ) {
            throw new MissingProperty(localization("property_res_is_null"), "res", file_path);
        }
        return true;
    }
    protected static check_res_json<Template extends res_json>(
        res_json: Template,
        file_path: string,
    ): res_json is Template {
        if (!("expand_path" in res_json)) {
            throw new MissingProperty(localization("property_expand_path_is_null"), "expand_path", file_path);
        }
        if (!(res_json.expand_path === "array") && !(res_json.expand_path === ("string" as any))) {
            throw new WrongPropertyValue(
                localization("property_expand_path_does_not_meet_requirement"),
                "expand_path",
                file_path,
                localization("expected_path_must_be_an_array_or_string"),
            );
        }
        if (!("groups" in res_json)) {
            throw new MissingProperty(localization("property_groups_is_null"), "groups", file_path);
        }
        return true;
    }
    protected static check_string(assert_test: any, data_type: string, file_input: string): assert_test is string {
        if (typeof assert_test !== "string") {
            throw new WrongDataType(localization("not_a_string"), data_type, file_input, "string");
        }
        return true;
    }
}

export default check_resource;
