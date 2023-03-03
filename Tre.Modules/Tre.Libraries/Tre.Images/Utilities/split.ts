"use strict";
import { writejson, readjson, makefolder } from '../../Tre.FileSystem/util.js';
import { split } from '../util.js';
import { extname, basename } from '../../Tre.Basename/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import fix_duplicate_res from '../../../Tre.Scripts/Tre/Repair/duplicate_res.js';
import localization from '../../../Tre.Callback/localization.js';
import * as color from "../../Tre.Color/color.js";
import path from "node:path";
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
            allow_atlas_info: boolean,
        }
    }
}
export default async function (opt: number) {
    const json_config: any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
    let json: any = {};
    const img_list = new Array();
    let directory_name = new String();
    let dir_sys = new String();
    for (let i = 0; i < process.argv.length; i++) {
        switch (extname(process.argv[i]).toLowerCase()) {
            case '.json':
                json = readjson(process.argv[i]);
                if (json.resources == undefined) {
                    TreErrorMessage({ error: localization("cannot_access_file_data"), reason: localization("not_popcap_res") }, localization("not_popcap_res"));
                    return 0;
                }
                directory_name = basename(process.argv[i]) + ".spg";
                dir_sys = process.argv[i] + '/../' + (directory_name);
                makefolder(dir_sys.toString());
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
    if (json.resources != undefined) {
        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${dir_sys}`)}`);
        if (json_config.atlas.split.repairDuplicateFolder === true) {
            json.resources = fix_duplicate_res(json.resources);
        };
        let atlas_info = { method: "", subgroup: json.id, groups: new Array() };
        let extend_info = new Array();
        for (const info of json.resources) {
            if (info.atlas != true) {
                if (typeof info.path === "string") {
                    info.path = info.path.split("\\");
                }
                info.x = (info.x != undefined) ? info.x : 0;
                info.y = (info.y != undefined) ? info.y : 0;
                extend_info.push({
                    id: info.id,
                    path: info.path,
                    parent: info.parent.replace(('ATLASIMAGE_ATLAS_'), ''),
                    ax: info.ax,
                    ay: info.ay,
                    aw: info.aw,
                    ah: info.ah,
                    x: info.x,
                    y: info.y,
                    extension: info.path[(info.path.length - 1)],
                });
            };
        };
        let parent_list = new Array();
        const promises = new Array();
        let extension_list = new Array();
        let option = (opt == 1) ? 'extension' : 'id';
        const actual_splitting_items = [...new Set(extend_info.map((a) => a[option]))];
        for (const i in extend_info) {
            for (const img of img_list) {
                if (extend_info[i].parent.toUpperCase() === basename(img).toUpperCase()) {
                    parent_list.push(extend_info[i].parent);
                    const process = await split(img, extend_info[i].ax, extend_info[i].ay, extend_info[i].aw, extend_info[i].ah, dir_sys + '/' + extend_info[i][option] + '.png', extend_info[i][option], extension_list);
                    extension_list = process[0];
                    promises.push(process[1]);
                }
                else {
                    continue;
                }
            }
        };
        await Promise.all(promises).catch(err => { return TreErrorMessage({ error: localization("error"), system: err.toString(), reason: localization("native_atlas_splitting_error") }, localization("native_atlas_splitting_error")) });
        parent_list = [...new Set(parent_list)];
        for (let info of extend_info) {
            for (let parent of parent_list) {
                if (info.parent == parent) {
                    atlas_info.groups.push({
                        id: info.id,
                        path: info.path,
                        x: info.x,
                        y: info.y,
                    });
                }
            }
        };
        atlas_info.method = (option == 'extension') ? "path" : "id";
        if (json_config.atlas.split.allow_atlas_info) {
            writejson(dir_sys + '/' + 'AtlasInfo.json', atlas_info);
        }
        console.log(color.fggreen_string("◉ " + localization("execution_actual_size") + ": ") + actual_splitting_items.length + "/" + atlas_info.groups.length);
    }
    else {
        TreErrorMessage({ error: localization("no_json_file"), reason: localization("cannot_detect_json") }, localization("cannot_detect_json"));
        return 0;
    }
    return 0;
};