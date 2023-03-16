"use strict";
import { readline_integer, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { Console } from './console.js';
import functions from "./functions.js";
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import fs from 'node:fs';
import { Argument } from "./toolkit_question.js";
import version from "./Default/version.js";
import localization from './localization.js';
import exit_program from "./Default/exit.js";
import { prompt } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import fs_js from "../Tre.Libraries/Tre.FileSystem/implement.js";
export default async function (): Promise<void> {
    Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_start")}: `) + `${process.cwd()} | ${version.tre_version} | ${localization("this.language")}`);
    const proc_arr: string[] = new Array();
    for (let i: number = 2; i < process.argv.length; ++i) {
        proc_arr.push(process.argv[i]);
    };
    let mode: number;
    let __check_while_loop__end: boolean = false;
    const start_timer: number = Date.now();
    if (proc_arr.length == 0) {
        __check_while_loop__end = true;
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.execute_reminder_quick_tip}`));
        Console.WriteLine(color.yellow_string(`${Argument.Tre.Packages.execute_when_there_is_no_directory_passes_in_tre}`));
        let dir: string = readline_normal();
        while (dir !== '') {
            if (dir === "./") {
                Console.WriteLine(`${Argument.Tre.Packages.execution_warning_log} \"./\" ${Argument.Tre.Packages.execute_error_not_valid_file_path}`);
                dir = await readline_normal();
                continue;
            }
            if (dir[0] === "\"" && dir[dir.length - 1] === "\"") {
                dir = dir.slice(1, -1);
            }
            try {
                const stats = fs.statSync(dir);
                if (stats.isDirectory() || stats.isFile()) {
                    proc_arr.push(dir);
                    Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.execute_file_size} ${proc_arr.length}`));
                    dir = await readline_normal();
                } else {
                    Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} `));
                    dir = await readline_normal();
                }
            } catch (err) {
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} ${Argument.Tre.Packages.execute_error_not_valid_directory_path}`));
                dir = await readline_normal();
            }
        };
    };
    if (__check_while_loop__end) {
        const end_timer: number = Date.now();
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} `) + `${(end_timer - start_timer) / 1000}s`);
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.execute_status_finish}`));
    }
    if (proc_arr.length > 1) {
        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.execute_all_files_in_queue}`));
        fs_js.execution_boolean_view();
        mode = await readline_integer(0, 1);
    }
    else {
        mode = 0;
    };
    if (mode === 0) {
        switch (proc_arr.length) {
            case 0:
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.no_string_has_been_passed}`));
            default:
                for (let i: number = 0; i < proc_arr.length; ++i) {
                    if (fs.existsSync(proc_arr[i])) {
                        let hasError: boolean = false;
                        process.on("exit", function (code) {
                            if (hasError || code !== 0) {
                                prompt('', '');
                                process.stdin.pause();
                                process.stdin.removeAllListeners('data');
                            }
                        });

                        try {
                            await functions((i + 1), proc_arr[i], proc_arr.length, mode);
                        } catch (error: any) {
                            console.log(color.fgred_string(`◉ ${localization("execution_error") + ":"} ${error.message}`));
                            hasError = true;
                        }
                    }
                    else {
                        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.command_execute_in_progress} (${(i + 1)}/${proc_arr.length})`));
                        Console.WriteLine(proc_arr[i]);
                        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_failed")}: ${localization("cannot_find_specific_file")}`));
                        continue;
                    }
                };
                break
        }
    }
    else {
        for (let i: number = 0; i < proc_arr.length; ++i) {
            if (!fs.existsSync(proc_arr[i])) {
                Console.WriteLine(color.fgred_string(`◉ ${localization("execution_failed")}: ${localization("cannot_find_specific_file")} ${proc_arr[i]}`));
                return;
            }
        }
        let hasError: boolean = false;
        process.on('exit', function (code) {
            if (hasError || code !== 0) {
                console.log('\x1b[32m◉ ' + localization("execution_finish") + ': ' + localization("press_any_key_to_exit") + '\x1b[0m');
                prompt('', '');
            }
        });

        try {
            await functions(1, proc_arr, 1, mode);
        } catch (error: any) {
            console.log(color.fgred_string(`◉ ${localization("execution_error") + ":"} ${error.message}`));
            hasError = true;
        }
    }
    return await exit_program();
}