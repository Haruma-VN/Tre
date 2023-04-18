"use strict";
import { writejson, readjson, makefolder } from "../../fs/util.js";
import { split } from "../util.js";
import { extname, basename } from "../../extension/util.js";
import fix_duplicate_res from "../../../scripts/default/repair/duplicate_res.js";
import localization from "../../../callback/localization.js";
import * as color from "../../color/color.js";
import path from "node:path";
export interface PopCapResJsonDataBundle {
    resources?: PopCapResJsonDetailInfo[];
    id?: string;
}
export interface PopCapResJsonDetailInfo {
    x: number;
    y: number;
    ax: number;
    ay: number;
    ah: number;
    aw: number;
    atlas?: boolean;
    id: string;
    path: string[] | string;
    parent: string;
}
export interface configAtlas {
    atlas: {
        split: {
            repairDuplicateFolder: boolean;
            allow_atlas_info: boolean;
        };
    };
}
/**
 *
 * @param opt - 1 for `path`, other number or `id`
 * @param execute_file_dir - Args
 * @param output_dir - ? If has output dir, the output will be there
 * @param use_atlas_info - If not using atlasinfo, pass false
 * @param is_notify - If not console log, pass false here
 * @returns - Splitted sprites
 */

export default async function (
    opt: 1 | 2,
    execute_file_dir: Array<string>,
    output_dir?: string,
    use_atlas_info: boolean = true,
    is_notify: boolean = true
) {
    const json_config: any = readjson(
        path.dirname(process.argv[1]) + "/extension/settings/toolkit.json",
        true
    );
    let json: any = {};
    const img_list = new Array();
    let directory_name = "";
    let dir_sys = "";
    for (let i = 0; i < execute_file_dir.length; i++) {
        switch (extname(execute_file_dir[i]).toLowerCase()) {
            case ".json":
                json = readjson(execute_file_dir[i]);
                if (json.resources === undefined) {
                    throw new Error(localization("not_popcap_res"));
                }
                directory_name = basename(execute_file_dir[i]) + ".spg";
                dir_sys =
                    output_dir !== undefined &&
                    output_dir !== null &&
                    output_dir !== void 0 &&
                    typeof output_dir === "string"
                        ? output_dir
                        : execute_file_dir[i] + "/../" + directory_name;
                makefolder(dir_sys.toString());
                break;
            case ".png":
                img_list.push(execute_file_dir[i]);
                break;
            default:
                continue;
        }
    }
    if (json.resources !== undefined) {
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(`${dir_sys}`)}`
        );
        if (json_config.atlas.split.repairDuplicateFolder === true) {
            json.resources = fix_duplicate_res(json.resources);
        }
        let atlas_info = {
            method: "",
            subgroup: json.id,
            expand_path: "",
            trim: false,
            groups: new Array(),
        };
        let extend_info = new Array();
        for (const info of json.resources) {
            if (
                (info.atlas === undefined ||
                    info.atlas === null ||
                    info.atlas === void 0) &&
                info.parent !== void 0 &&
                info.parent !== null &&
                info.parent !== undefined
            ) {
                if (typeof info.path === "string") {
                    info.path = info.path.split("\\");
                    atlas_info.expand_path = "string";
                } else {
                    atlas_info.expand_path = "array";
                }
                info.x = info.x !== undefined ? info.x : 0;
                info.y = info.y !== undefined ? info.y : 0;
                extend_info.push({
                    id: info.id,
                    path: info.path,
                    parent: info.parent.replace("ATLASIMAGE_ATLAS_", ""),
                    ax: info.ax,
                    ay: info.ay,
                    aw: info.aw,
                    ah: info.ah,
                    x: info.x,
                    y: info.y,
                    extension: info.path[info.path.length - 1],
                });
            }
        }
        let parent_list = new Array();
        const promises = new Array();
        let extension_list = new Array();
        let option = opt === 1 ? "extension" : "id";
        const actual_splitting_items = [
            ...new Set(extend_info.map((a) => a[option])),
        ];
        for (const i in extend_info) {
            for (const img of img_list) {
                if (
                    extend_info[i].parent.toUpperCase() ===
                    basename(img).toUpperCase()
                ) {
                    parent_list.push(extend_info[i].parent);
                    const process = await split(
                        img,
                        extend_info[i].ax,
                        extend_info[i].ay,
                        extend_info[i].aw,
                        extend_info[i].ah,
                        dir_sys + "/" + extend_info[i][option] + ".png",
                        extend_info[i][option],
                        extension_list
                    );
                    extension_list = process[0];
                    promises.push(process[1]);
                } else {
                    continue;
                }
            }
        }
        await Promise.all(promises).catch((err: any) => {
            throw new Error(
                `${localization("native_atlas_splitting_error")} ${err.message}`
            );
        });
        parent_list = [...new Set(parent_list)];
        for (let info of extend_info) {
            for (let parent of parent_list) {
                if (info.parent === parent) {
                    atlas_info.groups.push({
                        id: info.id,
                        path: info.path,
                        x: info.x,
                        y: info.y,
                    });
                }
            }
        }
        atlas_info.method = option === "extension" ? "path" : "id";
        atlas_info.trim = false;
        if (json_config.atlas.split.allow_atlas_info || use_atlas_info) {
            writejson(dir_sys + "/" + "AtlasInfo.json", atlas_info);
        }
        if (is_notify) {
            console.log(
                color.fggreen_string(
                    "◉ " + localization("execution_actual_size") + ": "
                ) +
                    actual_splitting_items.length +
                    "/" +
                    atlas_info.groups.length
            );
        }
    } else {
        throw new Error(localization("cannot_detect_json"));
    }
    return 0;
}
