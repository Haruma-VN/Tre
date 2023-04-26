"use strict";
import fs_js from "../library/fs/implement.js";
import {
    readline_integer,
    readline_normal,
} from "../../modules/readline/prompt/util.js";
import { Console } from "./console.js";
import functions from "./functions.js";
import * as color from "../library/color/color.js";
import localization from "./localization.js";
import { Argument } from "./toolkit_question.js";
import version from "./default/version.js";
import exit_program from "./default/exit.js";
import { prompt } from "../../modules/readline/prompt/util.js";
import path from "node:path";

export default async function (): Promise<void> {
    Console.WriteLine(
        color.fggreen_string(`◉ ${localization("execution_loaded")}: `) +
            `${path.dirname(process.argv[1])} | ${
                version.tre_version
            } | ${localization("this.language")}`
    );
    fs_js.encode_utf8();
    fs_js.tool_title("Tre");
    const proc_arr: string[] = new Array();
    for (let i: number = 2; i < process.argv.length; ++i) {
        proc_arr.push(process.argv[i]);
    }
    let mode: number;
    const is_windows_explorer_open: boolean = fs_js.create_toolkit_view(
        "open_windows_explorer"
    ) as boolean;
    /**
     * @param - Automatic input path until while loop stop
     */
    let check_while_loop_end: boolean = false;
    const start_timer: number = Date.now();
    if (proc_arr.length === 0) {
        check_while_loop_end = true;
        if (!is_windows_explorer_open) {
            Console.WriteLine(
                color.fggreen_string(
                    `${Argument.Tre.Packages.execute_reminder_quick_tip} `
                )
            );
            Console.WriteLine(
                color.yellow_string(
                    `${Argument.Tre.Packages.execute_when_there_is_no_directory_passes_in_tre} `
                )
            );
        } else {
            Console.WriteLine(
                color.fggreen_string(
                    `${Argument.Tre.Packages.windows_explorer_open_reminder} `
                )
            );
            Console.WriteLine(
                color.yellow_string(
                    `${Argument.Tre.Packages.windows_explorer_found_nothing} `
                )
            );
        }
        let dir: string = (is_windows_explorer_open as boolean)
            ? await fs_js.openWindowsExplorer("file", "*.*")
            : readline_normal();
        assert_test: while (dir !== "") {
            if (dir === "./") {
                Console.WriteLine(
                    `${Argument.Tre.Packages.execution_warning_log} \"./\" ${Argument.Tre.Packages.execute_error_not_valid_file_path}`
                );
                dir = is_windows_explorer_open
                    ? await fs_js.openWindowsExplorer("file", "*.*")
                    : readline_normal();
                continue;
            }
            if (dir[0] === '"' && dir[dir.length - 1] === '"') {
                dir = dir.slice(1, -1);
            }
            try {
                const stats = fs_js.view_io_stream(dir);
                if (stats.isDirectory() || stats.isFile()) {
                    proc_arr.push(dir);
                    if (is_windows_explorer_open) {
                        fs_js.execution_notify(
                            "argument",
                            localization("would_you_like_to_input_more_path")
                        );
                        fs_js.execution_boolean_view();
                    }
                    const thiz_stop_passing_argument: 0 | 1 | null =
                        is_windows_explorer_open
                            ? (readline_integer(0, 1) as 0 | 1)
                            : null;
                    const is_windows_explorer_break: boolean =
                        is_windows_explorer_open &&
                        thiz_stop_passing_argument === 0
                            ? true
                            : false;
                    if (is_windows_explorer_break) {
                        break assert_test;
                    }
                    Console.WriteLine(
                        color.fggreen_string(
                            `${Argument.Tre.Packages.execute_file_size} ${proc_arr.length}`
                        )
                    );
                    dir = is_windows_explorer_open
                        ? await fs_js.openWindowsExplorer("file", "*.*")
                        : readline_normal();
                } else {
                    Console.WriteLine(
                        color.fgred_string(
                            `${Argument.Tre.Packages.execute_error_log} ${dir} `
                        )
                    );
                    dir = (await is_windows_explorer_open)
                        ? await fs_js.openWindowsExplorer("file", "*.*")
                        : readline_normal();
                }
            } catch (err) {
                Console.WriteLine(
                    color.fgred_string(
                        `${Argument.Tre.Packages.execute_error_log} ${dir} ${Argument.Tre.Packages.execute_error_not_valid_directory_path}`
                    )
                );
                dir = (await is_windows_explorer_open)
                    ? await fs_js.openWindowsExplorer("file", "*.*")
                    : readline_normal();
            }
        }
    }
    if (check_while_loop_end) {
        const end_timer: number = Date.now();
        Console.WriteLine(
            color.fggreen_string(
                `${Argument.Tre.Packages.tre_execution_time_after_process} `
            ) + `${((end_timer - start_timer) / 1000).toFixed(3)}s`
        );
        Console.WriteLine(
            color.fggreen_string(
                `${Argument.Tre.Packages.execute_status_finish}`
            )
        );
    }
    if (proc_arr.length > 1) {
        Console.WriteLine(
            color.fgcyan_string(
                `${Argument.Tre.Packages.execute_all_files_in_queue}`
            )
        );
        fs_js.execution_boolean_view();
        mode = await readline_integer(0, 1);
    } else {
        mode = 0;
    }
    if (mode === 0) {
        switch (proc_arr.length) {
            case 0:
                Console.WriteLine(
                    color.fgred_string(
                        `${Argument.Tre.Packages.no_string_has_been_passed}`
                    )
                );
            default:
                for (let i: number = 0; i < proc_arr.length; ++i) {
                    if (fs_js.js_exists(proc_arr[i])) {
                        let hasError: boolean = false;
                        process.on("exit", function (code) {
                            if (hasError || code !== 0) {
                                prompt("", "");
                                process.stdin.pause();
                                process.stdin.removeAllListeners("data");
                            }
                        });

                        try {
                            await functions(
                                i + 1,
                                proc_arr[i],
                                proc_arr.length
                            );
                        } catch (error: any) {
                            Console.WriteLine(
                                color.fgred_string(
                                    `◉ ${
                                        localization("execution_error") + ":"
                                    } ${error.message}`
                                )
                            );
                            hasError = true;
                        }
                    } else {
                        Console.WriteLine(
                            color.fggreen_string(
                                `${
                                    Argument.Tre.Packages
                                        .command_execute_in_progress
                                } (${i + 1}/${proc_arr.length})`
                            )
                        );
                        Console.WriteLine(proc_arr[i]);
                        Console.WriteLine(
                            color.fgred_string(
                                `◉ ${localization(
                                    "execution_failed"
                                )}: ${localization(
                                    "cannot_find_specific_file"
                                )}`
                            )
                        );
                        continue;
                    }
                }
                break;
        }
    } else {
        for (let i: number = 0; i < proc_arr.length; ++i) {
            if (!fs_js.js_exists(proc_arr[i])) {
                Console.WriteLine(
                    color.fgred_string(
                        `◉ ${localization("execution_failed")}: ${localization(
                            "cannot_find_specific_file"
                        )} ${proc_arr[i]}`
                    )
                );
                return;
            }
        }
        let hasError: boolean = false;
        process.on("exit", function (code) {
            if (hasError || code !== 0) {
                Console.WriteLine(
                    "\x1b[32m◉ " +
                        localization("execution_finish") +
                        ": " +
                        localization("press_any_key_to_exit") +
                        "\x1b[0m"
                );
                prompt("", "");
            }
        });

        try {
            await functions(1, proc_arr, 1);
        } catch (error: any) {
            Console.WriteLine(
                color.fgred_string(
                    `◉ ${localization("execution_error") + ":"} ${
                        error.message
                    }`
                )
            );
            hasError = true;
        }
    }
    return await exit_program();
}
