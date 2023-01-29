"use strict";
import { readjson, writejson, makefolder } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
interface ResInfo {
    id: string,
    path: string[],
    x: number,
    y: number,
}
interface AtlasInfo {
    method: string,
    subgroup: string,
    groups: ResInfo[] | undefined | null,
}
export default function (dir: string, method: string = "id"): void {
    const atlasinfo: AtlasInfo = readjson(dir);
    makefolder(dir + "/../" + "AtlasInfo");
    if (atlasinfo.groups != undefined && atlasinfo.groups != null) {
        for (let i: number = 0; i < atlasinfo?.groups.length; ++i) {
            switch (method) {
                case "path":
                    writejson(dir + "/../" + "AtlasInfo/" + atlasinfo.groups[i].path[atlasinfo.groups[i].path.length - 1] + ".json", atlasinfo.groups[i]);
                    break;
                default:
                    writejson(dir + "/../" + "AtlasInfo/" + atlasinfo.groups[i].id + ".json", atlasinfo.groups[i]);
                    break;
            };
        };
    };
    atlasinfo.groups = undefined;
    writejson(`${dir}/../Info.json`, atlasinfo);
    return;
}