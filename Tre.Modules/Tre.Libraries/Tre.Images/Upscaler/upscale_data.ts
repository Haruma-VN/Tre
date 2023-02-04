"use strict";
interface AtlasInfo {
    method?: string,
    subgroup?: string,
    groups: ResInfo[],
}
interface ResInfo {
    id?: string,
    path: string[],
    x?: number,
    y?: number,
}
export default function (ratio: number = 2, data: AtlasInfo, orig: number, mod: number): AtlasInfo {
    for (let i: number = 0; i < data?.groups.length; ++i) {
        if (data.groups[i].path != undefined) {
            for (let j in data.groups[i].path) {
                if ((data.groups[i].path[j]) === orig.toString()) {
                    data.groups[i].path[j] = mod.toString();
                }
            }
        }
    }
    if (data.subgroup != undefined) {
        data.subgroup = data.subgroup.replace(`_${orig.toString()}`, `_${mod.toString()}`);
    }
    return (data);
}