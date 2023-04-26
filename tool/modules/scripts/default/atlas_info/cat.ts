"use strict";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";
import fs_js from "../../../library/fs/implement.js";
import { Console } from "../../../callback/console.js";

interface ResInfo {
    id: string;
    path: string[];
    x: number;
    y: number;
}

interface AtlasInfo {
    method: string;
    subgroup: string;
    groups: ResInfo[] | undefined | null;
}

export default function (dir: string): number {
    const atlas: string[] = fs_js.one_reader(`${dir}/atlas/`);
    const info: AtlasInfo = fs_js.read_json(`${dir}/info.json`) as AtlasInfo;
    for (let bundle of atlas) {
        if (
            info.groups !== undefined &&
            info.groups !== null &&
            info.groups !== void 0
        ) {
            info.groups.push(fs_js.read_json(bundle) as ResInfo);
        }
    }
    fs_js.write_json(`${dir}/../AtlasInfo.json`, info);
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${fs_js.resolve(`${dir}/../AtlasInfo.json`)}`
    );
    return 0;
}
