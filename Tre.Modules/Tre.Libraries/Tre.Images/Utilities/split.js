"use strict";
import { writejson, readjson, makefolder } from '../../Tre.FileSystem/util.js';
import { split } from '../util.js';
import { extname, basename } from '../../Tre.Basename/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (opt) {
    let json = {};
    const img_list = new Array();
    let directory_name = new String();
    let dir_sys = new String();
    for (let i = 2; i < process.argv.length; i++) {
        switch (extname(process.argv[i]).toLowerCase()) {
            case '.json':
                json = readjson(process.argv[i]);
                if (json.resources == undefined) {
                    TreErrorMessage({ error: "Cannot access file data", reason: "Not valid PopCap Resources Data" }, "Not valid PopCap Resources Data");
                    return 0;
                }
                directory_name = basename(process.argv[i]) + ".spg";
                dir_sys = process.argv[i] + '/../' + (directory_name);
                makefolder(dir_sys);
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
        let atlas_info = { method: "", subgroup: json.id, groups: new Array() };
        let extend_info = new Array();
        for (const info of json.resources) {
            if (info.atlas != true) {
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
        let option = (opt == 1) ? 'extension' : 'id';
        for (const i in extend_info) {
            for (const img of img_list) {
                if (extend_info[i].parent.toUpperCase() == basename(img).toUpperCase()) {
                    parent_list.push(extend_info[i].parent);
                    await split(img, extend_info[i].ax, extend_info[i].ay, extend_info[i].aw, extend_info[i].ah, dir_sys + '/' + extend_info[i][option] + '.png');
                }
                else {
                    continue;
                }
            }
        };
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
        await writejson(dir_sys + '/' + 'AtlasInfo.json', atlas_info);
        await console.log("Total Spritesheet extracted: " + atlas_info.groups.length);
    }
    else {
        TreErrorMessage({ error: "No json file", reason: "Cannot detect json file" }, "Cannot detect json file");
        return 0;
    }
    return 0;
};
// node main.js WorldMap_Kongfu_1536.json WORLDMAP_KONGFU_1536_00.png WORLDMAP_KONGFU_1536_01.png WORLDMAP_KONGFU_1536_02.png