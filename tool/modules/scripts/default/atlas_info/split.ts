"use strict";
import path from "node:path";
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
    method?: string;
    subgroup?: string;
    groups?: ResInfo[] | undefined | null;
}
export default function (dir: string): number {
    const atlasinfo: AtlasInfo = fs_js.read_json(dir) as AtlasInfo;
    let method: string =
        atlasinfo.method !== undefined &&
        atlasinfo.method !== void 0 &&
        atlasinfo.method !== null
            ? atlasinfo.method
            : "id";
    const info_folder = dir + "/../" + "AtlasInfo.atlas";
    const resources_atlas_folder = dir + "/../" + "AtlasInfo.atlas/atlas";
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${path.resolve(info_folder)}`
    );
    fs_js.create_directory(`${info_folder}`);
    fs_js.create_directory(`${resources_atlas_folder}`);
    if (
        atlasinfo.groups !== undefined &&
        atlasinfo.groups !== null &&
        atlasinfo.groups !== void 0
    ) {
        if ("groups" in atlasinfo) {
            for (let i: number = 0; i < atlasinfo?.groups.length; ++i) {
                switch (method) {
                    case "path":
                        fs_js.write_json(
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
                        fs_js.write_json(
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
    fs_js.write_json(`${info_folder}/info.json`, atlasinfo);
    return 0;
}
