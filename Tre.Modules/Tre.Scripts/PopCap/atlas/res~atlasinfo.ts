"use strict";
import { readjson, writejson } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
import path from "node:path";
import localization from "../../../Tre.Callback/localization.js";
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";

export default function (method: string, dir: string): void {
    const json: any = readjson(dir);
    const atlasinfo: { method: string, subgroup: string, groups: any[] } = { method: method, subgroup: json.id, groups: new Array(), };
    if ("resources" in json) {
        for (let i: number = 0; i < json.resources.length; i++) {
            if (json.resources[i].atlas == undefined) {
                atlasinfo.groups.push({
                    cols: json.resources[i].cols,
                    id: json.resources[i].id,
                    path: json.resources[i].path,
                    x: json.resources[i].x,
                    y: json.resources[i].y,
                })
            }
        }
        writejson(`${dir}/../AtlasInfo.json`, atlasinfo);
        console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${dir}/../AtlasInfo.json`)}`);
    }
    return
}