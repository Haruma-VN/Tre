"use strict";
import { decode_argb8888, decode_rgba8888, encode_argb8888, encode_rgba8888 } from "../Tre.Libraries/Tre.Images/util.js";
import { res_pack, res_split } from '../../Tre.Modules/Tre.Scripts/PopCap/resources/util.js';
import { atlas_split, atlas_cat } from '../../Tre.Modules/Tre.Scripts/PopCap/atlas/util.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { md5hash } from '../Tre.Libraries/Tre.EncryptSystem/util.js';
import exit from '../Tre.Progress/Timer/Exit.js';
import { TreErrorMessage } from '../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { readjson, readfile, writefile, writejson, check_is_file } from "../Tre.Libraries/Tre.FileSystem/util.js";
import { ToolKitFunctions } from './toolkit_functions.js';
export default async function (execute_file_count: number, execute_file_dir: string | string[], execute_file_length: number, mode: number): Promise<void> {
    execute_file_count = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer: number = Date.now();
    console.log(`Command execution in progress: (${execute_file_count}/${execute_file_length})`);
    if (Array.isArray(execute_file_dir)) {
        execute_file_dir.forEach((child_file_bundle: string) => {
            console.log(`${child_file_bundle}`);
        })
    }
    else {
        console.log(`${execute_file_dir}`);
    }
    // Check if the dragging is file?
    const checkfile: boolean = (Array.isArray(execute_file_dir)) ? false : check_is_file(execute_file_dir);
    if (mode === 0 && typeof (execute_file_dir) === 'string') {
        if (checkfile === true) {
            // 1
            console.log(ToolKitFunctions.js_execute);
            // 2
            console.log(ToolKitFunctions.res_split);
            const option: any = await readline_expand([1, 2]);
            switch (parseInt(option)) {
                case 1:
                    try {
                        await eval(readfile(execute_file_dir));
                    } catch (error) {
                        TreErrorMessage({ error: "Error", reason: "Unknown", system: error.toString() }, `Unexpected Error when execute the script: ${error}`)
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
            const option: any = readline_expand([3, 5]);
            switch (parseInt(option)) {
                case 3:
                    console.log("Execution Argument: Concat Mode");
                    let mode: number = await readline_integer(1, 2);
                    console.log("Execution Argument: Encode RTON");
                    let encode: number = await readline_integer(1, 2);
                    await res_pack(execute_file_dir, mode, encode);
                    break;
                case 5:
                    console.log("Execution Argument: Concat Width");
                    let width: number = await readline_size();
                    console.log("Execution Argument: Concat Height");
                    let height: number = await readline_size();
                    await atlas_cat(execute_file_dir, (width), (height)).finally(() => { });
                    break;
                default:
                    break;
            }
        }
    }
    else {
        console.log(ToolKitFunctions.atlas_split);
        const option: any = await readline_expand([4]);
        switch ((option)) {
            case 4:
                console.log("Execution Argument: Method Split PopCap Textures");
                let method: any = await readline_integer(1, 2);
                await atlas_split(parseInt(method)).finally(() => { });
                break;
            default:
                break;
        }
    }
    const end_timer: number = Date.now();
    return console.log(`Execution time: ${(end_timer - start_timer) / 1000}`);
}