"use strict";
import evaluate_script from "./script.js";
import fs_js from "../../library/fs/implement.js";
import localization from "../localization.js";

export async function create_evaluation(
    file_system_input_as_str: string
) {
    const json_script = fs_js.read_json(file_system_input_as_str) as evaluation_script;
    if ((json_script.notify === null || json_script.notify === void 0 || json_script.notify === undefined || !(typeof (json_script.notify) === "boolean"))) {
        throw new Error(`${localization("notify_is_not_defined")}`)
    }
    if ((json_script.modules === null || json_script.modules === void 0 || json_script.modules === undefined || !(Array.isArray(json_script.modules)))) {
        throw new Error(`${localization("modules_is_not_defined")}`)
    }
    await evaluate_script(json_script);
}