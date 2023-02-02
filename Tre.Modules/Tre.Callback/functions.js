"use strict";
import { res_pack, res_split } from '../../Tre.Modules/Tre.Scripts/PopCap/resources/util.js';
import { atlas_split, atlas_cat } from '../../Tre.Modules/Tre.Scripts/PopCap/atlas/util.js';
import { readline_integer, readline_size, readline_expand } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { TreErrorMessage } from '../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { readfile, check_is_file } from "../Tre.Libraries/Tre.FileSystem/util.js";
import { ToolKitFunctions } from './toolkit_functions.js';
export default async function (execute_file_count, execute_file_dir, execute_file_length, mode) {
    execute_file_count = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer = Date.now();
    console.log(`Command execution in progress: (${execute_file_count}/${execute_file_length})`);
    if (Array.isArray(execute_file_dir)) {
        execute_file_dir.forEach((child_file_bundle) => {
            console.log(`${child_file_bundle}`);
        });
    }
    else {
        console.log(`${execute_file_dir}`);
    }
    // Check if the dragging is file?
    const checkfile = (Array.isArray(execute_file_dir)) ? false : check_is_file(execute_file_dir);
    if (mode === 0) {
        if (checkfile === true) {
            // 1
            console.log(ToolKitFunctions.js_execute);
            // 2
            console.log(ToolKitFunctions.res_split);
            const option = await readline_expand([1, 2]);
            switch (parseInt(option)) {
                case 1:
                    try {
                        await eval(readfile(execute_file_dir));
                    }
                    catch (error) {
                        TreErrorMessage({ error: "Error", reason: "Unknown", system: error.toString() }, `Unexpected Error when execute the script: ${error}`);
                    }
                    break;
                case 2:
                    await res_split(execute_file_dir).finally(() => { });
                    break;
                default:
                    break;
            }
        }
        // This must be a directory?
        else {
            // 3
            console.log(ToolKitFunctions.res_cat);
            // 5
            console.log(ToolKitFunctions.atlas_cat);
            const option = readline_expand([3, 5]);
            switch (parseInt(option)) {
                case 3:
                    console.log("Execution Argument: Concat Mode");
                    let mode = await readline_integer(1, 2);
                    console.log("Execution Argument: Encode RTON");
                    let encode = await readline_integer(1, 2);
                    await res_pack(execute_file_dir, mode, encode);
                    break;
                case 5:
                    console.log("Execution Argument: Concat Mode");
                    let width = await readline_size();
                    console.log("Execution Argument: Encode RTON");
                    let height = await readline_size();
                    await atlas_cat(execute_file_dir, width, height).finally(() => { });
                    break;
                default:
                    break;
            }
        }
    }
    else {
        console.log(ToolKitFunctions.atlas_split);
        const option = await readline_expand([4]);
        switch ((option)) {
            case 4:
                console.log("Execution Argument: Method Split PopCap Textures");
                let method = await readline_integer();
                await atlas_split(parseInt(method)).finally(() => { });
                break;
            default:
                break;
        }
    }
    const end_timer = Date.now();
    return console.log(`Execution time: ${(end_timer - start_timer) / 1000}`);
}
