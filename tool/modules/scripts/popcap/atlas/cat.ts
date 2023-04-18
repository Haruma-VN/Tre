"use strict";
import { MaxRectsPacker } from "maxrects-packer";
import { readjson, writejson } from "../../../library/fs/util.js";
import { dimension, cat } from "../../../library/img/util.js";
import best_sorting from "../../../library/sort/popcap_resources.js";
import * as color from "../../../library/color/color.js";
import localization from "../../../callback/localization.js";
import path from "node:path";
import getTrim from "./helper/trim.js";
import fs_js from "../../../library/fs/implement.js";
import squareTrim from "./helper/square_trim.js";

export type AtlasImage = {
    slot: number;
    id: string;
    path: string[];
    type: string;
    atlas: boolean;
    width: number;
    height: number;
    parent?: string;
    ax?: number;
    ay?: number;
    ah?: number;
    aw?: number;
    x?: number;
    y?: number;
    cols?: number;
};

export interface result_json {
    id: string;
    type: string;
    parent: string;
    res: string;
    resources: Array<AtlasImage>;
}

export default async function (
    dir: string,
    width: number,
    height: number,
    is_simple_pack: boolean = true,
    display_not_atlas_info: string = "Not AtlasInfo.json",
    cannot_find_groups_array_in_atlasinfo: string = "Cannot find groups array in AtlasInfo.json",
    cannot_find_subgroup_in_atlas_info: string = "Cannot find subgroup in AtlasInfo.json",
    cannot_find_method_in_atlas_info: string = "Cannot find method in AtlasInfo.json",
    cannot_get_res_data: string = "Cannot get res data",
    not_found_res_indicated_in_subgroups = "Not found res data indicated in subgroup",
    total_sprites_process_in_thiz_function: string = "Total sprites process:",
    thiz_selection_max_rects_bin_iz_smart: boolean = true,
    thiz_selection_max_rects_bin_iz_pot: boolean = false,
    thiz_selection_max_rects_bin_iz_square: boolean = true,
    thiz_selection_max_rects_bin_can_be_rotation: boolean = false,
    thiz_selection_max_rects_bin_padding_size: number = 1
) {
    const img_list = new Array();
    const atlas_info: any = readjson(dir + "/AtlasInfo.json");
    if (atlas_info.groups === undefined) {
        throw new Error(cannot_find_groups_array_in_atlasinfo);
    }
    if (atlas_info.subgroup === undefined) {
        throw new Error(cannot_find_subgroup_in_atlas_info);
    }
    if (atlas_info.method === undefined) {
        throw new Error(cannot_find_method_in_atlas_info);
    }
    const is_trim_mode: boolean =
        "trim" in atlas_info && atlas_info.trim ? true : false;
    const is_square_trim: boolean =
        (fs_js.create_toolkit_view("cut_unused_space") as boolean) &&
        !is_trim_mode;
    const selection: string = atlas_info.method === "path" ? "extension" : "id";
    const expand_path_for_new_version: boolean =
        atlas_info.expand_path === "array" ? false : true;
    for (let i in atlas_info.groups) {
        atlas_info.groups[i].extension =
            atlas_info.groups[i].path[atlas_info.groups[i].path.length - 1];
    }
    for (let i in atlas_info.groups) {
        const sprite_dimension: any = await dimension(
            dir + "/" + atlas_info.groups[i][selection] + ".png"
        ).then((result: any) => {
            return result;
        });
        atlas_info.groups[i].x =
            atlas_info.groups[i].x !== undefined ? atlas_info.groups[i].x : 0;
        atlas_info.groups[i].y =
            atlas_info.groups[i].y !== undefined ? atlas_info.groups[i].y : 0;
        img_list.push({
            width: sprite_dimension.width,
            height: sprite_dimension.height,
            name: atlas_info.groups[i][selection],
            path: atlas_info.groups[i].path,
            id: atlas_info.groups[i].id,
            infoX: atlas_info.groups[i].x,
            infoY: atlas_info.groups[i].y,
        });
    }
    const options = {
        smart: thiz_selection_max_rects_bin_iz_smart,
        pot: thiz_selection_max_rects_bin_iz_pot,
        square: thiz_selection_max_rects_bin_iz_square,
        allowRotation: thiz_selection_max_rects_bin_can_be_rotation,
    };
    const img_data = new Array();
    let packer = new MaxRectsPacker(
        width,
        height,
        thiz_selection_max_rects_bin_padding_size,
        options
    );
    packer.addArray(img_list);
    packer.bins.forEach((bin: any) => {
        img_data.push(bin.rects);
    });
    let res = "1536";
    if (atlas_info.subgroup.indexOf("_1536") !== -1) {
        res = "1536";
    } else if (atlas_info.subgroup.indexOf("_768") !== -1) {
        res = "768";
    } else if (atlas_info.subgroup.indexOf("_384") !== -1) {
        res = "384";
    } else if (atlas_info.subgroup.indexOf("_640") !== -1) {
        res = "640";
    } else if (atlas_info.subgroup.indexOf("_1200") !== -1) {
        res = "1200";
    } else {
        throw new Error(not_found_res_indicated_in_subgroups);
    }
    let result_json: any = {
        id: atlas_info.subgroup,
        type: "simple",
        parent: atlas_info.subgroup
            .replace("_1536", "")
            .replace("_768", "")
            .replace("_384", "")
            .replace("_640", "")
            .replace("_1200", ""),
        res: res,
        resources: new Array(),
    };
    const append_array = new Array();
    const dimension_array_value: Array<{ width: number; height: number }> =
        new Array();
    for (let i = 0; i < img_data.length; ++i) {
        img_data[i] = best_sorting(img_data[i]);
        const count = i < 9 && i >= 0 ? "0" + i : i;
        dimension_array_value.push(
            is_trim_mode && !is_square_trim
                ? getTrim(img_data[i])
                : is_square_trim
                ? squareTrim(img_data[i])
                : { width: width, height: height }
        );
        result_json.resources.push({
            slot: 0,
            id:
                "ATLASIMAGE_ATLAS_" +
                atlas_info.subgroup.toUpperCase() +
                "_" +
                count,
            path: ["atlases", atlas_info.subgroup + "_" + count],
            type: "Image",
            atlas: true,
            width: parseInt(dimension_array_value[i].width.toString()),
            height: parseInt(dimension_array_value[i].height.toString()),
        });
        const child_array = new Array();
        for (let j in img_data[i]) {
            child_array.push({
                input: dir + "/" + img_data[i][j].name + ".png",
                left: img_data[i][j].x,
                top: img_data[i][j].y,
            });
            if (
                img_data[i][j].x !== undefined &&
                img_data[i][j].y !== undefined &&
                img_data[i][j].width !== undefined &&
                img_data[i][j].height !== undefined &&
                img_data[i][j].infoX !== undefined &&
                img_data[i][j].infoY !== undefined
            ) {
                result_json.resources.push({
                    slot: 0,
                    id: img_data[i][j].id,
                    path: img_data[i][j].path,
                    type: "Image",
                    parent:
                        "ATLASIMAGE_ATLAS_" +
                        atlas_info.subgroup.toUpperCase() +
                        "_" +
                        count,
                    ax: img_data[i][j].x,
                    ay: img_data[i][j].y,
                    aw: img_data[i][j].width,
                    ah: img_data[i][j].height,
                    x: img_data[i][j].infoX,
                    y: img_data[i][j].infoY,
                });
            }
        }
        append_array.push(child_array);
    }
    for (let i = 0; i < append_array.length; ++i) {
        if (dimension_array_value[i].width !== width) {
            fs_js.execution_information(
                `${localization("new_width")} = ${
                    dimension_array_value[i].width
                }`
            );
        }
        if (dimension_array_value[i].height !== height) {
            fs_js.execution_information(
                `${localization("new_height")} = ${
                    dimension_array_value[i].height
                }`
            );
        }
        const count = i < 9 && i >= 0 ? "0" + i.toString() : i;
        await cat(
            append_array[i],
            `${dir}/../${atlas_info.subgroup.toUpperCase()}_${count}.png`,
            dimension_array_value[i].width,
            dimension_array_value[i].height
        );
        console.log(
            `${color.fggreen_string(
                "◉ " + localization("execution_out") + ":\n     "
            )} ${path.resolve(
                `${dir}/../${atlas_info.subgroup.toUpperCase()}_${count}.png`
            )}`
        );
    }
    if (expand_path_for_new_version) {
        for (let i: number = 0; i < result_json.resources.length; ++i) {
            if (
                "path" in result_json.resources[i] &&
                Array.isArray(result_json.resources[i].path)
            ) {
                result_json.resources[i].path =
                    result_json.resources[i].path.join("\\");
            }
        }
    }
    writejson(dir + "/../" + atlas_info.subgroup + ".json", result_json);
    console.log(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${path.resolve(dir + "/../" + atlas_info.subgroup + ".json")}`
    );
    console.log(
        color.fggreen_string(`${total_sprites_process_in_thiz_function}`) +
            `${img_list.length}`
    );
    return 0;
}
