"use strict";
import * as file_system from "../../../../Tre.Libraries/Tre.FileSystem/util.js";
import { extname, basename } from "../../../../Tre.Libraries/Tre.Basename/util.js";
import localization from "../../../../Tre.Callback/localization.js";
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";
import path from "node:path";
import sharp from "sharp";

export interface PopCapResJsonDataBundle {
    resources?: PopCapResJsonDetailInfo[],
    id?: string,
}

export interface PopCapResJsonDetailInfo {
    x: number,
    y: number,
    ax: number,
    ay: number,
    ah: number,
    aw: number,
    atlas?: boolean,
    id: string,
    path: string[] | string,
    parent: string,
}

export interface configAtlas {
    atlas: {
        split: {
            repairDuplicateFolder: boolean,
        }
    }
}

async function atlas_split_experimental(execute_file_dir: string[]): Promise<void> {
    let json: any = {};
    const img_list: Array<string> = new Array();
    let directory_name: string = "";
    let dir_sys: string = "";
    for (let i: number = 0; i < execute_file_dir.length; i++) {
        switch (extname(execute_file_dir[i]).toLowerCase()) {
            case '.json':
                json = file_system.readjson(execute_file_dir[i]);
                if (json.resources == undefined) {
                    throw new Error(localization("not_popcap_res"));
                }
                directory_name = basename(execute_file_dir[i]) + ".spg";
                dir_sys = execute_file_dir[i] + '/../' + (directory_name);
                file_system.makefolder(dir_sys.toString());
                break;
            case '.png':
            case '.jpg':
            case '.jpeg':
                img_list.push(execute_file_dir[i]);
                break;
            default:
                continue;
        }
    };
    let count_images_split: number = 0;
    if ("resources" in json && json.resources != undefined && json.resources != null && json.resources != void 0) {
        console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(`${dir_sys}`)}`);
        const promises: Array<Promise<any>> = new Array();
        for (let i: number = 0; i < json.resources.length; ++i) {
            if (json.resources[i].atlas != undefined) {
                continue;
            }
            if (typeof json.resources[i].path === "string") {
                json.resources[i].path = json.resources[i].path.split("\\");
            };
            const popcap_atlas_output_atlas_directory: string = dir_sys + "/" + path.join(...json.resources[i].path);
            file_system.create_multiple_parent(popcap_atlas_output_atlas_directory);
            for (const img of img_list) {
                if (json.resources[i].parent.toUpperCase() === "ATLASIMAGE_ATLAS_" + basename(img).toUpperCase()) {
                    count_images_split++;
                    const filePath = path.join(popcap_atlas_output_atlas_directory, `${json.resources[i].id}.png`);
                    promises.push(sharp(img).extract({ width: (json.resources[i].aw), height: (json.resources[i].ah), left: (json.resources[i].ax), top: (json.resources[i].ay) }).toFile(filePath).catch((error: any) => {
                        throw new Error(localization("bad_extract_area"));
                    }));
                    const jsonPath = path.join(popcap_atlas_output_atlas_directory, `${json.resources[i].id}.json`);
                    file_system.writejson(jsonPath, { x: (json.resources[i].x != undefined && json.resources[i].x != null && json.resources[i].x != void 0) ? json.resources[i].x : 0, y: (json.resources[i].y != undefined && json.resources[i].y != null && json.resources[i].y != void 0) ? json.resources[i].y : 0, cols: json.resources[i].cols });
                }
            }
        }
        await Promise.all(promises).catch((err: any) => {
            throw new Error(
                localization("native_atlas_splitting_error"));
        });
    }
    return console.log(color.fggreen_string("◉ " + localization("execution_actual_size") + ": ") + count_images_split);
}
export default atlas_split_experimental;