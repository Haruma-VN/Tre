"use strict";
import fs from "node:fs";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
var System;
(function (System) {
    var Tre;
    (function (Tre) {
        var Checker;
        (function (Checker) {
            function check_tre_extension() {
                const extension_folder = process.cwd() + "/Tre.Extension";
                if (!fs.existsSync(extension_folder) || !fs.statSync(extension_folder).isDirectory()) {
                    console.log(color.fgred_string("◉ Exception found: No extension folder for the tool."));
                    return false;
                }
                return true;
            }
            Checker.check_tre_extension = check_tre_extension;
            function check_tre_toolkit_json() {
                const toolkit_json_file_path = process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json";
                if (!fs.existsSync(toolkit_json_file_path) || !fs.statSync(toolkit_json_file_path).isFile()) {
                    console.log(color.fgred_string("◉ Exception found: No toolkit.json, cannot finish the missing data."));
                    return false;
                }
                return true;
            }
            Checker.check_tre_toolkit_json = check_tre_toolkit_json;
            function check_tre_third_party() {
                const tre_third_party_for_raw_images = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
                if (!fs.existsSync(tre_third_party_for_raw_images) || !fs.statSync(tre_third_party_for_raw_images).isDirectory()) {
                    console.log(color.fgred_string("◉ Exception found: No third party for encoding images."));
                    return false;
                }
                const tre_third_party_for_etc_pak = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/etcpak.exe";
                if (!fs.existsSync(tre_third_party_for_etc_pak) || !fs.statSync(tre_third_party_for_etc_pak).isFile()) {
                    console.log(color.fgred_string("◉ Exception found: No third party founded for etcpak."));
                    return false;
                }
                const tre_third_party_for_pvrtc = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/PVRTexToolCLI.exe";
                if (!fs.existsSync(tre_third_party_for_pvrtc) || !fs.statSync(tre_third_party_for_pvrtc).isFile()) {
                    console.log(color.fgred_string("◉ Exception found: No third party founded for PVRTexToolCLI."));
                    return false;
                }
                const tre_third_party_for_upscaler = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale/";
                if (!fs.existsSync(tre_third_party_for_upscaler) || !fs.statSync(tre_third_party_for_upscaler).isDirectory()) {
                    console.log(color.fgred_string("◉ Exception found: No third party founded for upscaling images."));
                    return false;
                }
                const tre_third_party_for_upscaler_real_esrgan = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale/realesrgan-ncnn-vulkan.exe";
                if (!fs.existsSync(tre_third_party_for_upscaler_real_esrgan) || !fs.statSync(tre_third_party_for_upscaler_real_esrgan).isFile()) {
                    console.log(color.fgred_string("◉ Exception found: No third party founded for realesrgan-ncnn-vulkan.exe."));
                    return false;
                }
                return true;
            }
            Checker.check_tre_third_party = check_tre_third_party;
            function check_node_modules() {
                const node_modules_folder = process.cwd() + "/node_modules";
                if (!fs.existsSync(node_modules_folder) || !fs.statSync(node_modules_folder).isDirectory()) {
                    console.log(color.fgred_string("◉ Exception found: No node_modules, cannot process."));
                    return false;
                }
                return true;
            }
            Checker.check_node_modules = check_node_modules;
            function execute() {
                if (check_tre_extension() && check_tre_toolkit_json() && check_tre_third_party() && check_node_modules()) {
                    return true;
                }
                return false;
            }
            Checker.execute = execute;
        })(Checker = Tre.Checker || (Tre.Checker = {}));
    })(Tre = System.Tre || (System.Tre = {}));
})(System || (System = {}));
export default System;
