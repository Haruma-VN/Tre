"use strict";
import { MaxRectsPacker } from "maxrects-packer";
import { readjson, writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import { TreErrorMessage } from "../../../Tre.Debug/Tre.ErrorSystem.js";
import { dimension, cat } from "../../../Tre.Libraries/Tre.Images/util.js";
import best_sorting from '../../../Tre.Libraries/Tre.Sort/ArraySortSystem.js';
type AtlasImage = {
    slot: number;
    id: string;
    path: string[];
    type: string;
    atlas: boolean;
    width: number;
    height: number;
    parent?: string;
    ax?: number,
    ay?: number,
    ah?: number,
    aw?: number,
    x?: number,
    y?: number,
    cols?: number,
}
interface result_json {
    id: string,
    type: string,
    parent: string,
    res: string,
    resources: Array<AtlasImage>,
}
export default async function (dir = process.argv[2], width = 4096, height = 4096) {
    const img_list = new Array();
    const atlas_info = readjson(dir + "/AtlasInfo.json");
    if (atlas_info.groups == undefined) {
        TreErrorMessage({ error: "Not AtlasInfo.json", reason: "Cannot find groups array in AtlasInfo.json" }, "Cannot find groups array in AtlasInfo.json");
        return 0;
    };
    if (atlas_info.subgroup == undefined) {
        TreErrorMessage({ error: "Not AtlasInfo.json", reason: "Cannot find subgroup in AtlasInfo.json" }, "Cannot find subgroup in AtlasInfo.json");
        return 0;
    };
    if (atlas_info.method == undefined) {
        TreErrorMessage({ error: "Not AtlasInfo.json", reason: "Cannot find method in AtlasInfo.json" }, "Cannot find method in AtlasInfo.json");
        return 0;
    };
    const selection = (atlas_info.method == 'path') ? 'extension' : 'id';
    for (let i in atlas_info.groups) {
        atlas_info.groups[i].extension = atlas_info.groups[i].path[(atlas_info.groups[i].path.length - 1)];
    };
    for (let i in atlas_info.groups) {
        const sprite_dimension = await dimension(dir + "/" + atlas_info.groups[i][selection] + ".png").finally((result: Promise<{}>) => {
            return result;
        });
        atlas_info.groups[i].x = (atlas_info.groups[i].x != undefined) ? atlas_info.groups[i].x : 0;
        atlas_info.groups[i].y = (atlas_info.groups[i].y != undefined) ? atlas_info.groups[i].y : 0;
        img_list.push({
            width: sprite_dimension.width,
            height: sprite_dimension.height,
            name: atlas_info.groups[i][selection],
            path: atlas_info.groups[i].path,
            id: atlas_info.groups[i].id,
            infoX: atlas_info.groups[i].x,
            infoY: atlas_info.groups[i].y,
        })
    };
    const options = {
        smart: true,
        pot: false,
        square: true,
        allowRotation: false,
    };
    const img_data = new Array();
    let packer = new MaxRectsPacker(width, height, 1, options);
    packer.addArray(img_list);
    packer.bins.forEach(bin => {
        img_data.push(bin.rects);
    });
    let res = "1536";
    if (atlas_info.subgroup.indexOf('_1536') != -1) { res = "1536" }
    else if (atlas_info.subgroup.indexOf('_768') != -1) { res = "768" }
    else if (atlas_info.subgroup.indexOf('_384') != -1) { res = "384" }
    else if (atlas_info.subgroup.indexOf('_640') != -1) { res = "640" }
    else if (atlas_info.subgroup.indexOf('_1200') != -1) { res = "1200" }
    else {
        TreErrorMessage({ error: "Cannot get res data", reason: "Not found res data indicated in subgroup" }, "Not found res data indicated in subgroup");
        return 0;
    };
    let result_json: result_json = {
        id: atlas_info.subgroup,
        type: "simple",
        parent: atlas_info.subgroup.replace('_1536', '').replace('_768', '').replace('_384', '').replace('_640', '').replace('_1200', ''),
        res: res,
        resources: new Array(),
    };
    const append_array = new Array();
    for (let i = 0; i < img_data.length; ++i) {
        img_data[i] = best_sorting(img_data[i]);
        const count = (i < 9 && i >= 0) ? ("0" + i) : i;
        result_json.resources.push({
            slot: 0,
            id: "ATLASIMAGE_ATLAS_" + atlas_info.subgroup.toUpperCase() + "_" + count,
            path: [
                "atlases",
                atlas_info.subgroup + "_" + count,
            ],
            type: "Image",
            atlas: true,
            width: parseInt(width),
            height: parseInt(height),
        },)
        const child_array = new Array();
        for (let j in img_data[i]) {
            child_array.push({
                input: dir + "/" + img_data[i][j].name + ".png",
                left: img_data[i][j].x,
                top: img_data[i][j].y,
            });
            if (img_data[i][j].x != undefined && img_data[i][j].y != undefined && img_data[i][j].width != undefined && img_data[i][j].height != undefined && img_data[i][j].infoX != undefined && img_data[i][j].infoY != undefined) {
                result_json.resources.push({
                    slot: 0,
                    id: img_data[i][j].id,
                    path: img_data[i][j].path,
                    type: "Image",
                    parent: "ATLASIMAGE_ATLAS_" + atlas_info.subgroup.toUpperCase() + "_" + count,
                    ax: img_data[i][j].x,
                    ay: img_data[i][j].y,
                    aw: img_data[i][j].width,
                    ah: img_data[i][j].height,
                    x: img_data[i][j].infoX,
                    y: img_data[i][j].infoY,
                },)
            }
        };
        append_array.push(child_array);
    };
    for (let i = 0; i < append_array.length; ++i) {
        const count = (i < 9 && i >= 0) ? ("0" + i.toString()) : i;
        await cat(append_array[i], `${dir}/../${atlas_info.subgroup.toUpperCase()}_${count}.png`, width, height);
    };
    writejson(dir + "/../" + atlas_info.subgroup + '.json', result_json);
    console.log("Total sprites process: " + img_list.length);
    return 0;
}