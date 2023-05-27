"use strict";
import fs_js from "../../../library/fs/implement.js";

export default function (method: string, dir: string): void {
    const json: any = fs_js.read_json(dir);
    const atlasinfo: { method: string; subgroup: string; groups: any[] } = {
        method: method,
        subgroup: json.id,
        groups: new Array(),
    };
    if ("resources" in json) {
        for (let i: number = 0; i < json.resources.length; i++) {
            if (json.resources[i].atlas === undefined) {
                atlasinfo.groups.push({
                    cols: json.resources[i].cols,
                    id: json.resources[i].id,
                    path: json.resources[i].path,
                    x: json.resources[i].x,
                    y: json.resources[i].y,
                    col:
                        json.resources[i].cols !== undefined &&
                        json.resources[i].cols !== void 0 &&
                        json.resources[i].cols !== null
                            ? json.resources[i].cols
                            : undefined,
                });
            }
        }
        fs_js.write_json(`${fs_js.dirname(dir)}/AtlasInfo.json`, atlasinfo, false);
    }
    return;
}
