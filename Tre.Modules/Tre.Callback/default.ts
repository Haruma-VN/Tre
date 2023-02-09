"use strict";
import { readline_integer, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { Console } from './console.js';
import functions from "./functions.js";
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import fs from 'node:fs';
import { Argument } from './toolkit_question.js';
export default async function (): Promise<void> {
    const proc_arr: string[] = new Array();
    for (let i: number = 2; i < process.argv.length; ++i) {
        proc_arr.push(process.argv[i]);
    };
    let mode: number;
    let __check_while_loop__end: boolean;
    const start_timer: number = Date.now();
    if (proc_arr.length == 0) {
        __check_while_loop__end = true;
        Console.WriteLine(color.fggreen_string("◉ Execution Reminder: If you don't want to parse more path press enter while given the empty string."));
        Console.WriteLine(color.yellow_string("◉ Execution Warning: No Args have been found, please drag a directory here or pass a string to continue the process..."));
        let dir: string = readline_normal();
        while (dir !== '') {
            if (dir === "./") {
                Console.WriteLine("◉ Execution Warning: \"./\" is not a valid path. Please try again.");
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
                    Console.WriteLine(color.fggreen_string(`◉ Execution Size: ${proc_arr.length}`));
                    dir = await readline_normal();
                } else {
                    Console.WriteLine(color.fgred_string(`◉ Execution Error: ${dir} is not a directory. Please try again.`));
                    dir = await readline_normal();
                }
            } catch (err) {
                Console.WriteLine(color.fgred_string(`◉ Execution Error: ${dir} is not a valid path. Please try again.`));
                dir = await readline_normal();
            }
        };
    };
    if (__check_while_loop__end) {
        const end_timer: number = Date.now();
        Console.WriteLine(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} ${(end_timer - start_timer) / 1000}s`));
        Console.WriteLine(color.fggreen_string(`◉ Execution Collect Status: Finish`));
    }
    if (proc_arr.length > 1) {
        Console.WriteLine(color.fgcyan_string("◉ Execution Argument: Execute all files in queue"));
        mode = await readline_integer(0, 1);
    }
    else {
        mode = 0;
    };
    if (mode === 0) {
        switch (proc_arr.length) {
            case 0:
                Console.WriteLine(`${Argument.Tre.Packages.no_string_has_been_passed}`);
            case 1:
                await functions(1, proc_arr[0], 1, mode).finally(() => { });
                break;
            default:
                for (let i: number = 0; i < proc_arr.length; ++i) {
                    await functions((i + 1), proc_arr[i], proc_arr.length, mode).finally(() => { });
                };
                break
        }
    }
    else {
        functions(1, proc_arr, 1, mode).finally(() => { });
    };
    return;
}