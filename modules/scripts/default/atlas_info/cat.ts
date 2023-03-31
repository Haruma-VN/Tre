"use strict";
import { readjson, writejson, read_dir } from "../../../library/fs/util.js";
import path from "node:path";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";

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
    const atlas: string[] = (read_dir(`${dir}/atlas/`));
    const info: AtlasInfo = readjson(`${dir}/info.json`) as AtlasInfo;
    for (let bundle of atlas) {
        if (info.groups != undefined && info.groups != null) {
            info.groups.push(readjson(bundle) as ResInfo);
        }
    };
    writejson(`${dir}/../AtlasInfo.json`, info);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../AtlasInfo.json`)}`);
    return 0;
}