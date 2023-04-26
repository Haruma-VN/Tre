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

    export function check_tre_third_party(): boolean {
        const tre_third_party_for_raw_images: string =
            fs_js.dirname(args.main_js as any) + "/extension/third/encode/";
        if (
            !fs_js.js_exists(tre_third_party_for_raw_images) ||
            !fs_js.view_io_stream(tre_third_party_for_raw_images).isDirectory()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No third party for encoding images."
                )
            );
            return false;
        }
        const tre_third_party_for_etc_pak: string =
            fs_js.dirname(args.main_js as any) +
            "/extension/third/encode/etcpak.exe";
        if (
            !fs_js.js_exists(tre_third_party_for_etc_pak) ||
            !fs_js.view_io_stream(tre_third_party_for_etc_pak).isFile()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No third party founded for etcpak."
                )
            );
            return false;
        }
        const tre_third_party_for_pvrtc: string =
            fs_js.dirname(args.main_js as any) +
            "/extension/third/encode/PVRTexToolCLI.exe";
        if (
            !fs_js.js_exists(tre_third_party_for_pvrtc) ||
            !fs_js.view_io_stream(tre_third_party_for_pvrtc).isFile()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No third party founded for PVRTexToolCLI."
                )
            );
            return false;
        }
        const tre_third_party_for_upscaler: string =
            fs_js.dirname(args.main_js as any) +
            "/extension/third/real_esrgan/";
        if (
            !fs_js.js_exists(tre_third_party_for_upscaler) ||
            !fs_js.view_io_stream(tre_third_party_for_upscaler).isDirectory()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No third party founded for upscaling images."
                )
            );
            return false;
        }
        const tre_third_party_for_upscaler_real_esrgan: string =
            fs_js.dirname(args.main_js as any) +
            "/extension/third/real_esrgan/realesrgan-ncnn-vulkan.exe";
        if (
            !fs_js.js_exists(tre_third_party_for_upscaler_real_esrgan) ||
            !fs_js
                .view_io_stream(tre_third_party_for_upscaler_real_esrgan)
                .isFile()
        ) {
            Console.WriteLine(
                color.fgred_string(
                    "◉ Exception found: No third party founded for realesrgan-ncnn-vulkan.exe."
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
            check_tre_toolkit_json() &&
            check_tre_third_party()
        ) {
            return true;
        }
        return false;
    }
}
export default System;
