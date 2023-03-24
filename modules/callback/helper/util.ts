"use strict";
import evaluate_script from "./script.js";
import fs_js from "../../library/fs/implement.js";

export async function create_evaluation(
    file_system_input_as_str: string
) {
    const json_script = fs_js.read_json(file_system_input_as_str) as evaluation_script;
    await evaluate_script(json_script);
}