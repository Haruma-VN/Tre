"use strict";
import { readjson, writejson, read_dir } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
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
    const bundles: string[] = (read_dir(`${dir}/Bundles/`));
    const info: AtlasInfo = readjson(`${dir}/Info.json`);
    for (let bundle of bundles) {
        if (info.groups != undefined && info.groups != null) {
            info.groups.push(readjson(bundle));
        }
    };
    writejson(`${dir}/../AtlasInfo.json`, info);
    return 0;
}