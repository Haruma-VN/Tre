"use strict";
import localization from "../../../callback/localization.js";
import { args } from "../../../implement/arguments.js";
import fs_js from "../../fs/implement.js";

export default async function (
    dir: string,
    modelname: string = "realesrgan-x4plus-anime",
    ratio: number | string,
    new_dir?: string,
    is_folder: boolean = false
): Promise<void> {
    const real_esrgan_exists = fs_js.check_real_esrgan();
    if (real_esrgan_exists) {
        try {
            await fs_js.evaluate_powershell(
                "cmd /c start /b realesrgan-ncnn-vulkan.exe" +
                    ' -i "' +
                    dir +
                    '" -o "' +
                    new_dir +
                    '" -n ' +
                    modelname +
                    " -s " +
                    ratio +
                    " -f png",
                fs_js.dirname(args.main_js as any) +
                    "/extension/third/real_esrgan",
                "ignore"
            );
        } catch (error: any) {
            throw new Error(localization("local_bug_check_debug_folder"));
        }
        if (new_dir !== undefined) {
            if (is_folder) {
                fs_js.full_reader(new_dir).forEach((item: str) => {
                    while (!fs_js.js_exists(`${new_dir}/${item}`)) {
                        continue;
                    }
                    return;
                });
            } else {
                while (!fs_js.js_exists(new_dir)) {
                    continue;
                }
            }
            return;
        }
    }
}
