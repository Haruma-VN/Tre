"use strict";
import { decode_argb8888, decode_rgba8888, encode_argb8888, encode_rgba8888, encode_etc1a, encode_pvrtc, decode_etc1a, decode_pvrtc } from "../Tre.Libraries/Tre.Images/util.js";
import { res_pack, res_split } from '../../Tre.Modules/Tre.Scripts/PopCap/resources/util.js';
import { atlas_split, atlas_cat, resize_atlas } from '../../Tre.Modules/Tre.Scripts/PopCap/atlas/util.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { md5hash } from '../Tre.Libraries/Tre.EncryptSystem/util.js';
import exit from '../Tre.Progress/Timer/Exit.js';
import { TreErrorMessage } from '../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { readjson, readfile, writefile, writejson, check_is_file } from "../Tre.Libraries/Tre.FileSystem/util.js";
import { ToolKitFunctions } from './toolkit_functions.js';
import { extname, basename } from '../Tre.Libraries/Tre.Basename/util.js';
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import path from 'node:path';
export interface configAtlas {
    display: {
        disable_display_full_path_execution: boolean,
    }
}
export default async function (execute_file_count: number, execute_file_dir: string | string[], execute_file_length: number, mode: number): Promise<void> {
    const json_config: configAtlas | {} = readjson("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json");
    console.log(color.fggreen_string("◉ Available modules have been loaded!"));
    execute_file_count = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer: number = Date.now();
    console.log(color.yellow_string(`◉ Command execution in progress: (${execute_file_count}/${execute_file_length})`));
    if (Array.isArray(execute_file_dir)) {
        execute_file_dir.forEach((child_file_bundle: string, index: number) => {
            if (json_config.display.disable_display_full_path_execution) {
                if (index === (execute_file_dir.length - 1)) {
                    console.log(`${path.basename(child_file_bundle)}\n`);
                }
                else {
                    console.log(`${path.basename(child_file_bundle)}\n`);
                };
            }
            else {
                if (index === (execute_file_dir.length - 1)) {
                    console.log(`${(child_file_bundle)}\n`);
                }
                else {
                    console.log(`${(child_file_bundle)}`);
                };

            }
        })
    }
    else {
        if (json_config.display.disable_display_full_path_execution) {
            console.log(`${path.basename(execute_file_dir)}\n`);
        }
        else {
            console.log(`${execute_file_dir}\n`);
        }
    }
    // Check if the dragging is file?
    let option: any;
    console.log(color.fggreen_string("◉ Modules available, select one function to do the apply:"));
    const checkfile: boolean = (Array.isArray(execute_file_dir)) ? false : check_is_file(execute_file_dir);
    if (mode === 0 && typeof (execute_file_dir) === 'string') {
        if (checkfile === true) {
            switch (extname(execute_file_dir).toString().toLowerCase()) {
                case '.js':
                    console.log(ToolKitFunctions.js_execute);
                    option = await readline_expand([1]);
                    switch (parseInt(option)) {
                        case 1:
                            try {
                                await eval(readfile(execute_file_dir));
                            } catch (error) {
                                TreErrorMessage({ error: "Error", reason: "Unknown", system: error.toString() }, `Unexpected Error when execute the script\n${error}`)
                            }
                            break;
                    };
                    break;
                case '.png':
                    console.log(ToolKitFunctions.encode_rgba8888);
                    console.log(ToolKitFunctions.encode_argb8888);
                    console.log(ToolKitFunctions.encode_etc1a);
                    console.log(ToolKitFunctions.encode_pvrtc);
                    option = await readline_expand([6, 7, 8, 9]);
                    switch (parseInt(option)) {
                        case 6:
                            await encode_rgba8888(execute_file_dir).finally(() => { });
                            break;
                        case 7:
                            await encode_argb8888(execute_file_dir).finally(() => { });
                            break;
                        case 8:
                            encode_etc1a(execute_file_dir).finally(() => { });
                            break;
                        case 9:
                            await encode_pvrtc(execute_file_dir).finally(() => { });
                            break;
                        case 10:
                            break;
                        default:
                            break;
                    };
                    break;
                case '.json':
                    console.log(ToolKitFunctions.res_split);
                    option = await readline_expand([2]);
                    switch (parseInt(option)) {
                        case 2:
                            await res_split(execute_file_dir).finally(() => { });
                            break;
                    };
                    break;
            }
        }
        // This must be a directory?
        else {
            // 3
            console.log(ToolKitFunctions.res_cat);
            // 5
            console.log(ToolKitFunctions.atlas_cat);
            // 16
            console.log(ToolKitFunctions.resize_atlas);
            const option: any = readline_expand([3, 5, 16]);
            switch (parseInt(option)) {
                case 3:
                    console.log(color.fgcyan_string("◉ Execution Argument: Concat Mode"));
                    let mode: number = await readline_integer(1, 2);
                    console.log(color.fgcyan_string("◉ Execution Argument: Encode RTON"));
                    let encode: number = await readline_integer(1, 2);
                    await res_pack(execute_file_dir, mode, encode);
                    break;
                case 5:
                    console.log(color.fgcyan_string("◉ Execution Argument: Concat Width"));
                    let width: number = await readline_size();
                    console.log(color.fgcyan_string("◉ Execution Argument: Concat Height"));
                    let height: number = await readline_size();
                    await atlas_cat(execute_file_dir, (width), (height)).finally(() => { });
                    break;
                case 16:
                    console.log(color.fgcyan_string("◉ Execution Argument: Original Texture Format"));
                    let orig: number = await readline_texture();
                    console.log(color.fgcyan_string("◉ Execution Argument: Modified Texture Format"));
                    let mod: number = await readline_texture();
                    await resize_atlas(execute_file_dir, orig, mod);
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
                console.log(color.fgcyan_string("◉ Execution Argument: Method Split PopCap Textures"));
                let method: any = await readline_integer(1, 2);
                await atlas_split(parseInt(method)).finally(() => { });
                break;
            default:
                break;
        }
    }
    const end_timer: number = Date.now();
    return console.log(color.fggreen_string(`Execution time: ${(end_timer - start_timer) / 1000}s`));
}