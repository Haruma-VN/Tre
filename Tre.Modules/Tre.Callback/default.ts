"use strict";
import { readline_integer } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import functions from "./functions.js";
export default async function (): Promise<void> {
    console.log("All modules have been loaded!");
    const proc_arr: string[] = new Array();
    for (let i: number = 2; i < process.argv.length; ++i) {
        proc_arr.push(process.argv[i]);
    };
    let mode: number;
    if (proc_arr.length > 1) {
        console.log("Execution Argument: Execute all progress files at once");
        mode = await readline_integer(0, 1);
    }
    else {
        mode = 0;
    };
    if (mode == 0) {
        switch (proc_arr.length) {
            case 0:
                return;
            case 1:
                await functions(1, proc_arr[0], 1, mode).finally(() => { });
                break;
            default:
                await proc_arr.forEach((file_dir: string, index: number) => {
                    functions(index, file_dir, proc_arr.length, mode).finally(() => { });
                })
                break;
        }
    }
    else {
        functions(1, proc_arr, 1, mode).finally(() => { });
    };
    return;
}