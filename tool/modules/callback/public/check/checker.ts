"use strict";
import path from "path";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../localization.js";
function check_evaluate_system(file_system_input_as_str: string): string {
    if (!fs_js.check_path(file_system_input_as_str)) {
        throw new Error(
            `${localization("cannot_read_the_path")} ${fs_js.get_full_path(
                file_system_input_as_str
            )}`
        );
    }
    if (fs_js.is_file(file_system_input_as_str)) {
        switch (
            path.parse(file_system_input_as_str).ext.toString().toLowerCase()
        ) {
            case ".json":
                switch (
                    path
                        .parse(file_system_input_as_str)
                        .name.toString()
                        .toLowerCase()
                ) {
                    case "atlasinfo":
                        return localization("atlasinfo_json") as string;
                    case "extra":
                        return localization("extra_json") as string;
                    case "wwise":
                        return localization("wwise_json") as string;
                    case "resources":
                        return localization("resource_json") as string;
                    case "resource_build":
                        return localization("resource_build_json") as string;
                    case "english":
                    case "vietnamese":
                    case "chinese":
                    case "russian":
                        return localization("language_json") as string;
                    case "toolkit":
                        return localization("toolkit_json") as string;
                    case "functions":
                        return localization("functions_json") as string;
                    case "rsb_disturb":
                        return localization("rsb_disturb_script") as string;
                    case "package":
                        return localization("package_json") as string;
                    case "tsconfig":
                        return localization("tsconfig_json") as string;
                    case "package-lock":
                        return localization("packages_lock_json") as string;
                    default:
                        return localization("json_file") as string;
                }
            case ".dat":
            case ".rton":
                return localization("rton_file") as string;
            case ".png":
                return localization("png_file") as string;
            case ".jpg":
                return localization("jpg_file") as string;
            case ".gif":
                return localization("gif_file") as string;
            case ".rsgp":
            case ".pgsr":
            case ".rsg":
                return localization("rsgp_file") as string;
            case ".smf":
                return localization("smf_file") as string;
            case ".ptx":
                return localization("ptx_file") as string;
            case ".rsb":
            case ".obb":
                return localization("rsb_file") as string;
            case ".js":
                return localization("js_file") as string;
            case ".bnk":
                return localization("bnk_file") as string;
            case ".wem":
                return localization("wem_file") as string;
            case ".pam":
                return localization("pam_file") as string;
            case ".ts":
                return localization("ts_file") as string;
            case ".cmd":
            case ".bat":
                return localization("bat_file") as string;
            case ".exe":
                return localization("exe_file") as string;
            case ".webp":
                return localization("webp_file") as string;
            case ".css":
                return localization("css_file") as string;
            case ".html":
                return localization("html_file") as string;
            case ".fla":
                return localization("fla_file") as string;
            case ".txt":
                return localization("txt_file") as string;
            case ".xml":
                return localization("xml_file") as string;
            case ".cs":
                return localization("cs_file") as string;
            default:
                return localization("local_machine_file") as never;
        }
    } else if (fs_js.is_directory(file_system_input_as_str)) {
        switch (
            path.parse(file_system_input_as_str).ext.toString().toLowerCase()
        ) {
            case ".res":
                return localization("res_folder") as string;
            case ".atlas":
                return localization("atlas_info_splitted_folder") as string;
            case ".spg":
                return localization("spg_folder") as string;
            case ".pgj":
                return localization("pgj_folder") as string;
            case ".xfl":
                return localization("xfl_folder") as string;
            case ".rsg":
                return localization("rsg_folder") as string;
            case ".soundbank":
                return localization("soundbank_folder") as string;
            default:
                return localization("local_machine_folder") as never;
        }
    } else {
        throw new Error(localization("invalid_file_system"));
    }
}

export default check_evaluate_system;
