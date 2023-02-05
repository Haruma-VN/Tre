"use strict";
import { decode_argb8888, decode_rgba8888, encode_argb8888, encode_rgba8888, encode_etc1a, encode_pvrtc, decode_etc1a, decode_pvrtc } from "../Tre.Libraries/Tre.Images/util.js";
import { res_pack, res_split } from '../../Tre.Modules/Tre.Scripts/PopCap/resources/util.js';
import { atlas_split, atlas_cat, resize_atlas } from '../../Tre.Modules/Tre.Scripts/PopCap/atlas/util.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
import { TreErrorMessage } from '../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import { readjson, readfile, writefile, writejson, check_is_file } from "../Tre.Libraries/Tre.FileSystem/util.js";
import { Display } from './toolkit_functions.js';
import { Argument } from "./toolkit_question.js";
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
    console.log(color.fggreen_string(`${Argument.Tre.Packages.tre_all_module_have_been_loaded}`));
    execute_file_count = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_count;
    execute_file_length = (Array.isArray(execute_file_dir)) ? execute_file_dir.length : execute_file_length;
    const start_timer: number = Date.now();
    console.log(color.yellow_string(`${Argument.Tre.Packages.command_execute_in_progress} (${execute_file_count}/${execute_file_length})`));
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
    console.log(color.fggreen_string(`${Argument.Tre.Packages.module_available}`));
    const checkfile: boolean = (Array.isArray(execute_file_dir)) ? false : check_is_file(execute_file_dir);
    if (mode === 0 && typeof (execute_file_dir) === 'string') {
        if (checkfile === true) {
            switch (extname(execute_file_dir).toString().toLowerCase()) {
                case '.js':
                    console.log(Display.Tre.Function.js_execute.display());
                    option = await readline_expand([Display.Tre.Function.js_execute.void_number_readline_argument()]);
                    switch (parseInt(option)) {
                        case Display.Tre.Function.js_execute.void_number_readline_argument():
                            try {
                                await eval(readfile(execute_file_dir));
                            } catch (error) {
                                TreErrorMessage({ error: `${Argument.Tre.Packages.error_syntax}`, reason: `${Argument.Tre.Packages.unknown_reason}`, system: error.toString() }, `${Argument.Tre.Packages.js_shell_error}\n${error}`)
                            }
                            break;
                    };
                    break;
                case '.png':
                    console.log(Display.Tre.Function.encode_rgba8888.display());
                    console.log(Display.Tre.Function.encode_argb8888.display());
                    console.log(Display.Tre.Function.encode_etc1a.display());
                    console.log(Display.Tre.Function.encode_pvrtc.display());
                    option = await readline_expand([Display.Tre.Function.encode_rgba8888.void_number_readline_argument(),
                    Display.Tre.Function.encode_rgba8888.void_number_readline_argument(),
                    Display.Tre.Function.encode_etc1a.void_number_readline_argument(), Display.Tre.Function.encode_pvrtc.void_number_readline_argument()]);
                    switch (parseInt(option)) {
                        case Display.Tre.Function.encode_rgba8888.void_number_readline_argument():
                            await encode_rgba8888(execute_file_dir).finally(() => { });
                            break;
                        case Display.Tre.Function.encode_rgba8888.void_number_readline_argument():
                            await encode_argb8888(execute_file_dir).finally(() => { });
                            break;
                        case Display.Tre.Function.encode_etc1a.void_number_readline_argument():
                            encode_etc1a(execute_file_dir).finally(() => { });
                            break;
                        case Display.Tre.Function.encode_pvrtc.void_number_readline_argument():
                            await encode_pvrtc(execute_file_dir).finally(() => { });
                            break;
                        case 10:
                            break;
                        default:
                            break;
                    };
                    break;
                case '.json':
                    console.log(Display.Tre.Function.res_split.display());
                    option = await readline_expand([Display.Tre.Function.res_split.void_number_readline_argument()]);
                    switch (parseInt(option)) {
                        case Display.Tre.Function.res_split.void_number_readline_argument():
                            await res_split(execute_file_dir).finally(() => { });
                            break;
                    };
                    break;
            }
        }
        // This must be a directory?
        else {
            console.log(Display.Tre.Function.res_cat.display());
            console.log(Display.Tre.Function.atlas_cat.display());
            console.log(Display.Tre.Function.resize_atlas.display());
            const option: any = readline_expand([Display.Tre.Function.res_cat.void_number_readline_argument(), Display.Tre.Function.atlas_cat.void_number_readline_argument(), Display.Tre.Function.resize_atlas.void_number_readline_argument()]);
            switch (parseInt(option)) {
                case Display.Tre.Function.res_cat.void_number_readline_argument():
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_res}`));
                    let mode: number = await readline_integer(1, 2);
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.concat_mode_argument_rton}`));
                    let encode: number = await readline_integer(1, 2);
                    await res_pack(execute_file_dir, mode, encode);
                    break;
                case Display.Tre.Function.atlas_cat.void_number_readline_argument():
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_width_argument}`));
                    let width: number = await readline_size();
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.concat_atlas_height_argument}`));
                    let height: number = await readline_size();
                    await atlas_cat(execute_file_dir, (width), (height)).finally(() => { });
                    break;
                case Display.Tre.Function.resize_atlas.void_number_readline_argument():
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_original_quality}`));
                    let orig: number = await readline_texture();
                    console.log(color.fgcyan_string(`${Argument.Tre.Packages.popcap_atlas_member_resize_modifier_after_quality}`));
                    let mod: number = await readline_texture();
                    await resize_atlas(execute_file_dir, orig, mod);
                    break;
                default:
                    break;
            }
        }
    }
    else {
        console.log(Display.Tre.Function.atlas_split.display());
        const option: any = await readline_expand([Display.Tre.Function.atlas_split.void_number_readline_argument()]);
        switch ((option)) {
            case Display.Tre.Function.atlas_split.void_number_readline_argument():
                console.log(color.fgcyan_string(`${Argument.Tre.Packages.method_split_popcap_atlas_texture}`));
                let method: any = await readline_integer(1, 2);
                await atlas_split(parseInt(method)).finally(() => { });
                break;
            default:
                break;
        }
    }
    const end_timer: number = Date.now();
    return console.log(color.fggreen_string(`${Argument.Tre.Packages.tre_execution_time_after_process} ${(end_timer - start_timer) / 1000}s`));
}
export {
    readline_argument,
    decode_argb8888,
    decode_rgba8888,
    decode_etc1a,
    decode_pvrtc,
    readline_char,
    readline_normal,
    writefile,
    writejson, 
    basename,
}