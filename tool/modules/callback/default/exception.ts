"use strict";
import * as color from "../../library/color/color.js";
import { Console } from "../console.js";
import fs_js from "../../library/fs/implement.js";
import { args } from "../../implement/arguments.js";

namespace System.Tre.Checker {
    export function check_tre_extension(): boolean {
        const extension_folder: string =
            fs_js.dirname(args.main_js as any) + "/extension";
        if (
            !fs_js.js_exists(extension_folder) ||
            !fs_js.view_io_stream(extension_folder).isDirectory()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No extension folder for the tool."
                )
            );
            return false;
        }
        return true;
    }

    export function check_tre_toolkit_json(): boolean {
        const toolkit_json_file_path: string =
            fs_js.dirname(args.main_js as any) +
            "/extension/settings/toolkit.json";
        if (
            !fs_js.js_exists(toolkit_json_file_path) ||
            !fs_js.view_io_stream(toolkit_json_file_path).isFile()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No toolkit.json, cannot finish the missing data."
                )
            );
            return false;
        }
        return true;
    }

    export function check_node_modules(): boolean {
        const node_modules_folder: string =
            fs_js.dirname(args.main_js as any) + "/node_modules";
        if (
            !fs_js.js_exists(node_modules_folder) ||
            !fs_js.view_io_stream(node_modules_folder).isDirectory()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No node_modules, cannot process."
                )
            );
            return false;
        }
        return true;
    }

    export function execute(): boolean {
        if (
            check_tre_extension() &&
            check_tre_toolkit_json() 
        ) {
            return true;
        }
        return false;
    }
}
export default System;
