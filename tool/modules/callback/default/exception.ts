"use strict";
import fs from "node:fs";
import * as color from "../../library/color/color.js";
import path from "node:path";

namespace System.Tre.Checker {
    export function check_tre_extension(): boolean {
        const extension_folder: string =
            path.dirname(process.argv[1]) + "/extension";
        if (
            !fs.existsSync(extension_folder) ||
            !fs.statSync(extension_folder).isDirectory()
        ) {
            console.log(
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
            path.dirname(process.argv[1]) + "/extension/settings/toolkit.json";
        if (
            !fs.existsSync(toolkit_json_file_path) ||
            !fs.statSync(toolkit_json_file_path).isFile()
        ) {
            console.log(
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
            path.dirname(process.argv[1]) + "/extension/third/encode/";
        if (
            !fs.existsSync(tre_third_party_for_raw_images) ||
            !fs.statSync(tre_third_party_for_raw_images).isDirectory()
        ) {
            console.log(
                color.fgred_string(
                    "◉ Exception found: No third party for encoding images."
                )
            );
            return false;
        }
        const tre_third_party_for_etc_pak: string =
            path.dirname(process.argv[1]) +
            "/extension/third/encode/etcpak.exe";
        if (
            !fs.existsSync(tre_third_party_for_etc_pak) ||
            !fs.statSync(tre_third_party_for_etc_pak).isFile()
        ) {
            console.log(
                color.fgred_string(
                    "◉ Exception found: No third party founded for etcpak."
                )
            );
            return false;
        }
        const tre_third_party_for_pvrtc: string =
            path.dirname(process.argv[1]) +
            "/extension/third/encode/PVRTexToolCLI.exe";
        if (
            !fs.existsSync(tre_third_party_for_pvrtc) ||
            !fs.statSync(tre_third_party_for_pvrtc).isFile()
        ) {
            console.log(
                color.fgred_string(
                    "◉ Exception found: No third party founded for PVRTexToolCLI."
                )
            );
            return false;
        }
        const tre_third_party_for_upscaler: string =
            path.dirname(process.argv[1]) + "/extension/third/real_esrgan/";
        if (
            !fs.existsSync(tre_third_party_for_upscaler) ||
            !fs.statSync(tre_third_party_for_upscaler).isDirectory()
        ) {
            console.log(
                color.fgred_string(
                    "◉ Exception found: No third party founded for upscaling images."
                )
            );
            return false;
        }
        const tre_third_party_for_upscaler_real_esrgan: string =
            path.dirname(process.argv[1]) +
            "/extension/third/real_esrgan/realesrgan-ncnn-vulkan.exe";
        if (
            !fs.existsSync(tre_third_party_for_upscaler_real_esrgan) ||
            !fs.statSync(tre_third_party_for_upscaler_real_esrgan).isFile()
        ) {
            console.log(
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
            path.dirname(process.argv[1]) + "/node_modules";
        if (
            !fs.existsSync(node_modules_folder) ||
            !fs.statSync(node_modules_folder).isDirectory()
        ) {
            console.log(
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
