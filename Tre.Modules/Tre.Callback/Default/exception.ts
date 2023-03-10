"use strict";
import fs from "node:fs";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
namespace System.Tre.Checker {

    export function check_tre_extension(): boolean {
        const extension_folder: string = process.cwd() + "/Tre.Extension";
        if (!fs.existsSync(extension_folder) || !fs.statSync(extension_folder).isDirectory()) {
            console.log(color.fgred_string("◉ Exception found: No extension folder for the tool."));
            return false;
        }
        return true;
    }

    export function check_tre_toolkit_json(): boolean {
        const toolkit_json_file_path: string = process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json";
        if (!fs.existsSync(toolkit_json_file_path) || !fs.statSync(toolkit_json_file_path).isFile()) {
            console.log(color.fgred_string("◉ Exception found: No toolkit.json, cannot finish the missing data."));
            return false;
        }
        return true;
    }

    export function check_tre_third_party(): boolean {
        const tre_third_party_for_raw_images: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
        if (!fs.existsSync(tre_third_party_for_raw_images) || !fs.statSync(tre_third_party_for_raw_images).isDirectory()) {
            console.log(color.fgred_string("◉ Exception found: No third party for encoding images."));
            return false;
        }
        const tre_third_party_for_etc_pak: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/etcpak.exe";
        if (!fs.existsSync(tre_third_party_for_etc_pak) || !fs.statSync(tre_third_party_for_etc_pak).isFile()) {
            console.log(color.fgred_string("◉ Exception found: No third party founded for etcpak."));
            return false;
        }
        const tre_third_party_for_pvrtc: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/PVRTexToolCLI.exe";
        if (!fs.existsSync(tre_third_party_for_pvrtc) || !fs.statSync(tre_third_party_for_pvrtc).isFile()) {
            console.log(color.fgred_string("◉ Exception found: No third party founded for PVRTexToolCLI."));
            return false;
        }
        const tre_third_party_for_upscaler: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale/";
        if (!fs.existsSync(tre_third_party_for_upscaler) || !fs.statSync(tre_third_party_for_upscaler).isDirectory()) {
            console.log(color.fgred_string("◉ Exception found: No third party founded for upscaling images."));
            return false;
        }
        const tre_third_party_for_upscaler_real_esrgan: string = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale/realesrgan-ncnn-vulkan.exe";
        if (!fs.existsSync(tre_third_party_for_upscaler_real_esrgan) || !fs.statSync(tre_third_party_for_upscaler_real_esrgan).isFile()) {
            console.log(color.fgred_string("◉ Exception found: No third party founded for realesrgan-ncnn-vulkan.exe."));
            return false;
        }
        return true;
    }

    export function check_node_modules(): boolean {
        const node_modules_folder: string = process.cwd() + "/node_modules";
        if (!fs.existsSync(node_modules_folder) || !fs.statSync(node_modules_folder).isDirectory()) {
            console.log(color.fgred_string("◉ Exception found: No node_modules, cannot process."));
            return false;
        }
        return true;
    }

    export function execute():boolean {
        if(check_tre_extension() && check_tre_toolkit_json() && check_tre_third_party() && check_node_modules()){
            return true;
        }
        return false;
    }

}
export default System;