"use strict";
import stringify from "../../Tre.JSONSystem/stringify.js";
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
export default function (ratio: number = 2, data: AtlasInfo): string {
    for (let i: number = 0; i < data?.groups.length; ++i) {
        if (data.groups[i].path != undefined) {
            for(let j in data.groups[i].path){
                if(parseInt(data.groups[i].path[j]) != undefined){
                    data.groups[i].path[j] = (parseInt(data.groups[i].path[j]) * ratio).toString();
                }
            }
        }
    }
    return stringify(data);
}