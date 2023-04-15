"use strict";
import fs_js from "../../library/fs/implement.js";
import evaluation_modules_workspace_assertation from "../evaluation_modules_workspace_assertation.js";
import localization from "../localization.js";
import assertation_break from "./exception.js";
import { Console } from "../console.js";
import js_checker from "../default/checker.js";
async function evaluate_script(
    script_entry_point: evaluation_script,
) {
    const is_notify: boolean = script_entry_point.notify;
    let evaluation_start: number = -1;
    let evaluation_end: number = -1;
    for (let i: number = 0; i < script_entry_point.modules.length; ++i) {
        if (script_entry_point.modules[i].func === "start") {
            evaluation_start = i;
        }
        if (script_entry_point.modules[i].func === "end") {
            evaluation_end = i;
        }
    }
    if (evaluation_end === -1) {
        throw new Error(`${localization("no_end_point")}`);
    }
    if (evaluation_start === -1) {
        throw new Error(`${localization("no_start_point")}`);
    }
    for (let i: number = evaluation_start; i <= evaluation_end; ++i) {
        if (is_notify && script_entry_point.modules[i].notify !== undefined && script_entry_point.modules[i].notify !== null &&
            script_entry_point.modules[i].notify !== void 0 && typeof (is_notify) === "boolean") {
            fs_js.execution_information(script_entry_point.modules[i].notify);
        }
        let entry_point: string = "";
        if (is_notify && script_entry_point.modules[i].func !== undefined && script_entry_point.modules[i].func !== null &&
            script_entry_point.modules[i].func !== void 0 && typeof (is_notify) === "boolean" && typeof (script_entry_point.modules[i].func) === "string"
            && !(assertation_break.ban_list.includes(script_entry_point.modules[i].func as string))
            && (assertation_break.allowance_lists.includes(script_entry_point.modules[i].func as string))) {
            fs_js.execution_auto(localization(script_entry_point.modules[i].func as string));
            entry_point = script_entry_point.modules[i].func as string;
        }
        if (script_entry_point.modules[i].func !== undefined && script_entry_point.modules[i].func !== null &&
            script_entry_point.modules[i].func !== void 0 && !(assertation_break.ban_list.includes(script_entry_point.modules[i].func as string))
            && (assertation_break.allowance_lists.includes(script_entry_point.modules[i].func as string)) &&
            (typeof (script_entry_point.modules[i].func) === "string")) {
            if (script_entry_point.modules[i].entry === null || script_entry_point.modules[i].entry === undefined || script_entry_point.modules[i].entry === void 0
                || !(js_checker.is_array(script_entry_point.modules[i].entry))) {
                continue;
            }
            evaluation_modules: for (let evaluation_file of script_entry_point.modules[i].entry as Array<string>) {
                try {
                    switch ((evaluation_file as string)) {
                        case "notify":
                            fs_js.execution_created((evaluation_file as string));
                            break evaluation_modules;
                        case "?":
                            fs_js.assertation_create("argument", localization("detect_question_mark"));
                            (evaluation_file as string) = await Console.ReadPath();
                            await evaluation_modules_workspace_assertation((evaluation_file as string), script_entry_point.modules[i].func as string);
                            break;
                        case "?file":
                            fs_js.assertation_create("argument", localization("drag_file_question_mark"));
                            (evaluation_file as string) = await Console.ReadFile();
                            await evaluation_modules_workspace_assertation((evaluation_file as string), script_entry_point.modules[i].func as string);
                            break;
                        case "?folder":
                            fs_js.assertation_create("argument", localization("drag_folder_question_mark"));
                            (evaluation_file as string) = await Console.ReadDir();
                            await evaluation_modules_workspace_assertation((evaluation_file as string), script_entry_point.modules[i].func as string);
                            break;
                        case "->":
                            break evaluation_modules;
                        default:
                            if (!fs_js.js_exists(evaluation_file)) {
                                Console.Error(`${localization("cannot_find_the_target_file")} ${fs_js.get_full_path(evaluation_file)}`);
                            }
                            fs_js.execution_in(evaluation_file);
                            await evaluation_modules_workspace_assertation(evaluation_file, script_entry_point.modules[i].func as string);
                            break;
                    }
                } catch (error: any) {
                    Console.Error(error.message as SystemError);
                }
            }
        }
    }
}

export default evaluate_script;