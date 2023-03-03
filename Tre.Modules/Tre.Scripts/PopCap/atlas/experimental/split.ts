"use strict";
import * as file_system from "../../../../Tre.Libraries/Tre.FileSystem/util.js";
import { extname, basename } from "../../../../Tre.Libraries/Tre.Basename/util.js";
import { TreErrorMessage } from "../../../../Tre.Debug/Tre.ErrorSystem.js";
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
    path: string[],
    parent: string,
}

export interface configAtlas {
    atlas: {
        split: {
            repairDuplicateFolder: boolean,
        }
    }
}

async function atlas_split_experimental(): Promise<void> {
    let json: any = {};
    const img_list: Array<string> = new Array();
    let directory_name: string = "";
    let dir_sys: string = "";
    for (let i: number = 0; i < process.argv.length; i++) {
        switch (extname(process.argv[i]).toLowerCase()) {
            case '.json':
                json = file_system.readjson(process.argv[i]);
                if (json.resources == undefined) {
                    TreErrorMessage({ error: localization("cannot_access_file_data"), reason: localization("not_popcap_res") }, localization("not_popcap_res"));
                    return;
                }
                directory_name = basename(process.argv[i]) + ".spg";
                dir_sys = process.argv[i] + '/../' + (directory_name);
                file_system.makefolder(dir_sys.toString());
                break;
            case '.png':
            case '.jpg':
            case '.jpeg':
                img_list.push(process.argv[i]);
                break;
            default:
                continue;
        }
    };
    let count_images_split: number = 0;
    if ("resources" in json && json.resources != undefined && json.resources != null && json.resources != void 0) {
        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${dir_sys}`)}`);
        const promises: Array<Promise<any>> = new Array();
        for (let i: number = 0; i < json.resources.length; ++i) {
            if (json.resources[i].atlas != undefined) {
                continue;
            }
            const popcap_atlas_output_atlas_directory: string = dir_sys + "/" + path.join(...json.resources[i].path);
            file_system.create_multiple_parent(popcap_atlas_output_atlas_directory);
            for (const img of img_list) {
                if (json.resources[i].parent.toUpperCase() === "ATLASIMAGE_ATLAS_" + basename(img).toUpperCase()) {
                    count_images_split++;
                    const filePath = path.join(popcap_atlas_output_atlas_directory, `${json.resources[i].id}.png`);
                    promises.push(sharp(img).extract({ width: (json.resources[i].aw), height: (json.resources[i].ah), left: (json.resources[i].ax), top: (json.resources[i].ay) }).toFile(filePath).catch((error: any) => {
                        TreErrorMessage({ error: localization("cannot_split_spritesheet"), reason: localization("bad_extract_area"), system: error.message.toString() }, localization("bad_extract_area"));
                        return;
                    }));
                    const jsonPath = path.join(popcap_atlas_output_atlas_directory, `${json.resources[i].id}.json`);
                    file_system.writejson(jsonPath, { x: (json.resources[i].x != undefined && json.resources[i].x != null && json.resources[i].x != void 0) ? json.resources[i].x : 0, y: (json.resources[i].y != undefined && json.resources[i].y != null && json.resources[i].y != void 0) ? json.resources[i].y : 0, cols: json.resources[i].cols });
                }
            }
        }
        await Promise.all(promises).catch((err: any) => { return TreErrorMessage({ error: localization("error"), system: err.message.toString(), reason: localization("native_atlas_splitting_error") }, localization("native_atlas_splitting_error")); });
    }
    return console.log(color.fggreen_string("◉ " + localization("execution_actual_size") + ": ") + count_images_split);
}
export default atlas_split_experimental;