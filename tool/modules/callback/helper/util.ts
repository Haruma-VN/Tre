"use strict";
import evaluate_script from "./script.js";
import fs_js from "../../library/fs/implement.js";
import localization from "../localization.js";
import { PropertyHasNotBeenDefined, WrongDataType } from "../../implement/error.js";

export async function create_evaluate(file_system_input_as_str: string) {
    const json_script = fs_js.read_json(file_system_input_as_str) as evaluate_script;
    if (json_script.notify === null || json_script.notify === void 0 || json_script.notify === undefined) {
        throw new PropertyHasNotBeenDefined(
            `${localization("notify_is_not_defined")}`,
            "notify",
            file_system_input_as_str,
        );
    }
    if (!(typeof json_script.notify === "boolean")) {
        throw new WrongDataType(`the_expected_data_type_is_wrong`, `notify`, file_system_input_as_str, "boolean");
    }
    if (
        json_script.modules === null ||
        json_script.modules === void 0 ||
        json_script.modules === undefined ||
        !Array.isArray(json_script.modules)
    ) {
        throw new PropertyHasNotBeenDefined(
            `${localization("modules_is_not_defined")}`,
            "modules",
            file_system_input_as_str,
        );
    }
    await evaluate_script(json_script);
}
