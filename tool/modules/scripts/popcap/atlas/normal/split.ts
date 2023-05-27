"use strict";
import { createCanvas, Image, Canvas, SKRSContext2D } from "@napi-rs/canvas";
import { split } from "../../../../library/img/util.js";
import fix_duplicate_res from "../../../default/repair/duplicate_res.js";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import fs_js from "../../../../library/fs/implement.js";
import { Console } from "../../../../callback/console.js";
import { args } from "../../../../implement/arguments.js";
import to_official from "../../resources/res/to_official.js";
import { MissingProperty, RuntimeError } from "../../../../implement/error.js";

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
    is_notify: boolean = true,
) {
    let is_res: boolean = false;
    const json_config: any = fs_js.read_json(
        fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json",
        true,
    );
    let json: any = {};
    const img_list = new Array();
    let directory_name = "";
    let dir_sys = "";
    for (let i = 0; i < execute_file_dir.length; i++) {
        switch (fs_js.extname(execute_file_dir[i]).toLowerCase()) {
            case ".json":
                json = fs_js.read_json(execute_file_dir[i]);
                if ("packet" in json) {
                    is_res = true;
                    const expand_new_path: int = Console.IntegerReadLine(0, 1);
                    json = to_official.convert_img(
                        json as any,
                        fs_js.parse_fs(execute_file_dir[i]).name,
                        fs_js.parse_fs(execute_file_dir[i]).name,
                        json.type as any,
                        Boolean(expand_new_path),
                        execute_file_dir[i],
                    );
                }
                if (json.resources === undefined) {
                    throw new MissingProperty(localization("not_popcap_res"), "resources", execute_file_dir[i]);
                }
                directory_name = fs_js.parse_fs(execute_file_dir[i]).name + ".spg";
                dir_sys =
                    output_dir !== undefined &&
                    output_dir !== null &&
                    output_dir !== void 0 &&
                    typeof output_dir === "string"
                        ? output_dir
                        : `${fs_js.dirname(execute_file_dir[i])}/${directory_name}`;
                fs_js.create_directory(dir_sys);
                break;
            case ".png":
                img_list.push(execute_file_dir[i]);
                break;
            default:
                continue;
        }
    }
    if ("resources" in json && json.resources !== undefined && json.resources !== null && json.resources !== void 0) {
        if (json_config.atlas.split.repairDuplicateFolder === true) {
            json.resources = fix_duplicate_res(json.resources);
        }
        let atlas_info = {
            method: "",
            subgroup: json.id,
            expand_path: "",
            trim: false,
            official_resource: !is_res,
            groups: new Array(),
        };
        let extend_info = new Array();
        for (const info of json.resources) {
            if (
                (info.atlas === undefined || info.atlas === null || info.atlas === void 0) &&
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
        let extension_list = new Array();
        let option = opt === 1 ? "extension" : "id";
        const actual_splitting_items = [...new Set(extend_info.map((a) => a[option]))];
        for (const img of img_list) {
            const img_split: Image = new Image();
            img_split.onload = function () {
                const img_canvas: Canvas = createCanvas(img_split.width, img_split.height);
                const img_ctx: SKRSContext2D = img_canvas.getContext("2d");
                img_ctx.drawImage(img_split, 0, 0);
                for (const i in extend_info) {
                    if (extend_info[i].parent.toUpperCase() === fs_js.parse_fs(img).name.toString().toUpperCase()) {
                        parent_list.push(extend_info[i].parent);
                        split(
                            img_ctx,
                            extend_info[i].ax,
                            extend_info[i].ay,
                            extend_info[i].aw,
                            extend_info[i].ah,
                            fs_js.resolve(`${dir_sys}/${extend_info[i][option]}.png`),
                            extend_info[i][option],
                            extension_list,
                        );
                    } else {
                        continue;
                    }
                }
            };
            img_split.src = fs_js.read_file(img, "buffer");
        }
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
            fs_js.write_json(`${dir_sys}/AtlasInfo.json`, atlas_info, true);
        }
        if (is_notify) {
            fs_js.execution_out(dir_sys);
            Console.WriteLine(
                `${color.fggreen_string(`◉ ${localization("execution_actual_size")}: `)} ${
                    actual_splitting_items.length
                }/${atlas_info.groups.length}`,
            );
        }
    } else {
        throw new RuntimeError(localization("cannot_detect_json"));
    }
    return 0;
}
