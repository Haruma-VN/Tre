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
export default function (dir: string): number {
    const atlasinfo: AtlasInfo = readjson(dir);
    let method: string = atlasinfo.method;
    const info_folder = dir + "/../" + "AtlasInfo.Bundles";
    const resources_bundles_folder = dir + "/../" + "AtlasInfo.Bundles/Bundles";
    makefolder(`${info_folder}`);
    makefolder(`${resources_bundles_folder}`);
    if (atlasinfo.groups != undefined && atlasinfo.groups != null) {
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
    };
    atlasinfo.groups = new Array(0);
    writejson(`${info_folder}/Info.json`, atlasinfo);
    return 0;
}