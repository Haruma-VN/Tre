"use strict";
import { readjson, writejson, makefolder } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
import path from "node:path";
import localization from "../../../Tre.Callback/localization.js";
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";

interface ResInfo {
    id: string,
    path: string[],
    x: number,
    y: number,
}
interface AtlasInfo {
    method?: string,
    subgroup?: string,
    groups?: ResInfo[] | undefined | null,
}
export default function (dir: string): number {
    const atlasinfo: AtlasInfo = readjson(dir) as AtlasInfo;
    let method: string = (atlasinfo.method != undefined && atlasinfo.method != void 0 && atlasinfo.method != null) ? atlasinfo.method : "id";
    const info_folder = dir + "/../" + "AtlasInfo.Bundles";
    const resources_bundles_folder = dir + "/../" + "AtlasInfo.Bundles/Bundles";
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(info_folder)}`);
    makefolder(`${info_folder}`);
    makefolder(`${resources_bundles_folder}`);
    if (atlasinfo.groups != undefined && atlasinfo.groups != null && atlasinfo.groups != void 0) {
        if ("groups" in atlasinfo) {
            for (let i: number = 0; i < atlasinfo?.groups.length; ++i) {
                switch (method) {
                    case "path":
                        writejson(resources_bundles_folder + "/" + atlasinfo.groups[i].path[atlasinfo.groups[i].path.length - 1] + ".json", atlasinfo.groups[i]);
                        break;
                    default:
                        writejson(resources_bundles_folder + "/" + atlasinfo.groups[i].id + ".json", atlasinfo.groups[i]);
                        break;
                };
            };
        }
    };
    atlasinfo.groups = new Array(0);
    writejson(`${info_folder}/Info.json`, atlasinfo);
    return 0;
}