"use strict";
import { readjson } from "../library/fs/util.js";
import { Display } from './toolkit_functions.js';
import { Argument } from "./toolkit_question.js";
import { Console } from "./console.js";
import * as color from '../library/color/color.js';
import path from "node:path";
import resolveFilePath from "./public/file_path/path_result.js";
import js_checker from "./default/checker.js";
import fs_js from "../library/fs/implement.js";
import create_evaluate_argument from "./evaluate.js";
import check_evaluate_system from './public/check/checker.js';

export interface configAtlas {
    display: {
        disable_display_full_path_execution: boolean,
    }
}

export default async function (execute_file_count: number, execute_file_dir: string | string[], execute_file_length: number, mode: number): Promise<void> {
    if (typeof execute_file_dir === "string") {
        execute_file_dir = resolveFilePath(execute_file_dir);
    }
    else if (js_checker.is_array(execute_file_dir)) {
        for (let i: number = 0; i < execute_file_dir.length; ++i) {
            if (typeof execute_file_dir[i] === "string") {
                execute_file_dir[i] = resolveFilePath(execute_file_dir[i]);
            }
        }
    }
    const json_config: any = readjson(path.dirname(process.argv[1]) + "/extension/settings/toolkit.json", true);
    execute_file_count = (js_checker.is_array(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (js_checker.is_array(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer: number = Date.now();
    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.command_execute_in_progress} (${execute_file_count}/${execute_file_length})`));
    if (js_checker.is_array(execute_file_dir)) {
        execute_file_dir.forEach((child_file_bundle: string, index: number) => {
            if (json_config.display.disable_display_full_path_execution) {
                if (index === (execute_file_dir.length - 1)) {
                    Console.WriteLine(`     ${path.basename(child_file_bundle)} | ${check_evaluate_system(child_file_bundle)}\n`);
                }
                else {
                    Console.WriteLine(`     ${path.basename(child_file_bundle)} | ${check_evaluate_system(child_file_bundle)}\n`);
                };
            }
            else {
                if (index === (execute_file_dir.length - 1)) {
                    Console.WriteLine(`     ${((child_file_bundle))} | ${check_evaluate_system(child_file_bundle)}\n`);
                }
                else {
                    Console.WriteLine(`     ${(child_file_bundle)} | ${check_evaluate_system(child_file_bundle)}`);
                };

            }
        })
    }
    else {
        if (json_config.display.disable_display_full_path_execution) {
            Console.WriteLine(`     ${path.basename(execute_file_dir)} | ${check_evaluate_system(execute_file_dir)}\n`);
        }
        else {
            Console.WriteLine(`     ${execute_file_dir} | ${check_evaluate_system(execute_file_dir)}\n`);
        }
    }
    const tre_selector: Array<number> = new Array();
    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.module_available}`));
    const generate_modules = Display.Tre.Function.create_new_functions_view.sort((a, b) => {
        return a.void_number_readline_argument() - b.void_number_readline_argument();
    });
    generate_modules.forEach(module_on_waiting_list => {
        if (!js_checker.is_array(execute_file_dir) && (module_on_waiting_list.static_filter().includes(fs_js.js_extname(execute_file_dir, true)) ||
            module_on_waiting_list.static_filter().includes("*/"))
            && module_on_waiting_list.static_allowance() && (fs_js.is_file(execute_file_dir) || fs_js.is_directory(execute_file_dir))
            && (!module_on_waiting_list.static_filter().includes("$*/") || module_on_waiting_list.static_filter().includes("~*/"))) {
            Display.Tre.Function.DisplayItems(tre_selector, module_on_waiting_list);
        }
        else if (!js_checker.is_array(execute_file_dir) && (module_on_waiting_list.static_filter().includes("./") ||
            module_on_waiting_list.static_filter().includes("*/"))
            && module_on_waiting_list.static_allowance() && (fs_js.is_directory(execute_file_dir))) {
            Display.Tre.Function.DisplayItems(tre_selector, module_on_waiting_list);
        }
        else if (js_checker.is_array(execute_file_dir) && (module_on_waiting_list.static_filter().includes("$*/") ||
            module_on_waiting_list.static_filter().includes("*/"))
            && module_on_waiting_list.static_allowance()) {
            Display.Tre.Function.DisplayItems(tre_selector, module_on_waiting_list);
        }
    })
    if (tre_selector.length === 0) {
        Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.cannot_load_any_modules}`));
    }
    else {
        const option: number = Console.ExpandReadLine(tre_selector);
        if (typeof execute_file_dir === "string") {
            await create_evaluate_argument(execute_file_dir, option);
        }
        else if (typeof execute_file_dir === "object" && (option != Display.Tre.Function.popcap_texture_atlas_split.void_number_readline_argument())
            && option != Display.Tre.Function.popcap_atlas_split_advanced.void_number_readline_argument()) {
            execute_file_dir.forEach(async (file_in_this_directory) => {
                await create_evaluate_argument(file_in_this_directory, option);
            })
        }
        else if (typeof execute_file_dir === "object" && ((option === Display.Tre.Function.popcap_texture_atlas_split.void_number_readline_argument())
            || option === Display.Tre.Function.popcap_atlas_split_advanced.void_number_readline_argument())) {
            await create_evaluate_argument(execute_file_dir, option);
        }
    }
    const end_timer: number = Date.now();
    return Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} `) + `${(end_timer - start_timer) / 1000}s`);
}