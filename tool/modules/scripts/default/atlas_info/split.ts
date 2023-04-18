"use strict";
import { readjson, writejson, makefolder } from "../../../library/fs/util.js";
import path from "node:path";
import localization from "../../../callback/localization.js";
import * as color from "../../../library/color/color.js";

interface ResInfo {
    id: string;
    path: string[];
    x: number;
    y: number;
}
interface AtlasInfo {
    method?: string;
    subgroup?: string;
    groups?: ResInfo[] | undefined | null;
}
export default function (dir: string): number {
    const atlasinfo: AtlasInfo = readjson(dir) as AtlasInfo;
    let method: string =
        atlasinfo.method !== undefined &&
        atlasinfo.method !== void 0 &&
        atlasinfo.method !== null
            ? atlasinfo.method
            : "id";
    const info_folder = dir + "/../" + "AtlasInfo.atlas";
    const resources_atlas_folder = dir + "/../" + "AtlasInfo.atlas/atlas";
    console.log(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${path.resolve(info_folder)}`
    );
    makefolder(`${info_folder}`);
    makefolder(`${resources_atlas_folder}`);
    if (
        atlasinfo.groups !== undefined &&
        atlasinfo.groups !== null &&
        atlasinfo.groups !== void 0
    ) {
        if ("groups" in atlasinfo) {
            for (let i: number = 0; i < atlasinfo?.groups.length; ++i) {
                switch (method) {
                    case "path":
                        writejson(
                            resources_atlas_folder +
                                "/" +
                                atlasinfo.groups[i].path[
                                    atlasinfo.groups[i].path.length - 1
                                ] +
                                ".json",
                            atlasinfo.groups[i]
                        );
                        break;
                    default:
                        writejson(
                            resources_atlas_folder +
                                "/" +
                                atlasinfo.groups[i].id +
                                ".json",
                            atlasinfo.groups[i]
                        );
                        break;
                }
            }
        }
    }
    atlasinfo.groups = new Array(0);
    writejson(`${info_folder}/info.json`, atlasinfo);
    return 0;
}
