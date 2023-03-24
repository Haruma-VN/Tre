"use strict";
import fs_js from "../../library/fs/implement.js";
import execute_function_from_core from "../execute_from_core.js";
async function evaluate_script(
    script_entry_point: evaluation_script
) {
    const is_notify: boolean = script_entry_point.notify;
    for (let i: number = 0; i < script_entry_point.modules.length; ++i) {
        if (is_notify) {
            fs_js.execution_information(script_entry_point.modules[i].notify);
        }
        await script_entry_point.modules[i].path.forEach(async evaluation_file => {
            await execute_function_from_core(evaluation_file, script_entry_point.modules[i].func);
        })
    }
}

export default evaluate_script;