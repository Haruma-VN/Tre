"use strict";
import sharp from "sharp";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import path from "node:path";
import fs_js from "../../fs/implement.js";
import { Console } from "../../../callback/console.js";

export default async function (
    dir: string,
    x: number,
    y: number,
    w: number,
    h: number,
    new_dir: string,
    name: string,
    extension_list: string[]
) {
    const json_config: any = fs_js.read_json(
        path.dirname(process.argv[1]) + "/extension/settings/toolkit.json",
        true
    );
    if (json_config.atlas.split.notify_duplicate) {
        for (let extension of extension_list) {
            if (name === extension) {
                Console.WriteLine(
                    color.yellow_string(
                        `◉ ${localization(
                            "execution_warning"
                        )}: ${name} ${localization("is_duplicated")}`
                    )
                );
                break;
            }
        }
    }
    extension_list.push(name);
    let data = new Array();
    data.push(extension_list);
    data.push(
        sharp(dir)
            .extract({ width: w, height: h, left: x, top: y })
            .toFile(new_dir)
            .catch((error: any) => {
                throw new Error(localization("bad_extract_area"));
            })
    );
    return data;
}
