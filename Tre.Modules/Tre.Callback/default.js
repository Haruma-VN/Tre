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
export default async function () {
    Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_start")}: `) + `${process.cwd()} | ${version.tre_version} | ${localization("this.language")}`);
    const proc_arr = new Array();
    for (let i = 2; i < process.argv.length; ++i) {
        proc_arr.push(process.argv[i]);
    }
    ;
    let mode;
    let __check_while_loop__end = false;
    const start_timer = Date.now();
    if (proc_arr.length == 0) {
        __check_while_loop__end = true;
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.execute_reminder_quick_tip}`));
        Console.WriteLine(color.yellow_string(`${Argument.Tre.Packages.execute_when_there_is_no_directory_passes_in_tre}`));
        let dir = readline_normal();
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
                }
                else {
                    Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} `));
                    dir = await readline_normal();
                }
            }
            catch (err) {
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.execute_error_log} ${dir} ${Argument.Tre.Packages.execute_error_not_valid_directory_path}`));
                dir = await readline_normal();
            }
        }
        ;
    }
    ;
    if (__check_while_loop__end) {
        const end_timer = Date.now();
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} `) + `${(end_timer - start_timer) / 1000}s`);
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.execute_status_finish}`));
    }
    if (proc_arr.length > 1) {
        Console.WriteLine(color.fgcyan_string(`${Argument.Tre.Packages.execute_all_files_in_queue}`));
        mode = await readline_integer(0, 1);
    }
    else {
        mode = 0;
    }
    ;
    if (mode === 0) {
        switch (proc_arr.length) {
            case 0:
                Console.WriteLine(color.fgred_string(`${Argument.Tre.Packages.no_string_has_been_passed}`));
            default:
                for (let i = 0; i < proc_arr.length; ++i) {
                    if (fs.existsSync(proc_arr[i])) {
                        await functions((i + 1), proc_arr[i], proc_arr.length, mode);
                    }
                    else {
                        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.command_execute_in_progress} (${(i + 1)}/${proc_arr.length})`));
                        Console.WriteLine(proc_arr[i]);
                        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_failed")}: ${localization("cannot_find_specific_file")}`));
                        continue;
                    }
                }
                ;
                break;
        }
    }
    else {
        for (let i = 0; i < proc_arr.length; ++i) {
            if (!fs.existsSync(proc_arr[i])) {
                Console.WriteLine(color.fgred_string(`◉ ${localization("execution_failed")}: ${localization("cannot_find_specific_file")} ${proc_arr[i]}`));
                return;
            }
        }
        await functions(1, proc_arr, 1, mode);
    }
    return await exit_program();
}
