"use strict";
import pack from './cat.js';
import res_split from './split.js';
import { read_single_folder, readjson, writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import sortResObjects from "../../../Tre.Libraries/Tre.Sort/ArraySortSystem.js";
import path from 'path';
export {
    res_split,
}
export interface ResDataConstructor {
    type?: string;
    id?: string;
    res?: string;
    parent?: string;
    resources?: any[]
}
export function res_pack(dir: string, mode: number, encode: number): void {
    const res_data_in_subgroups_folder = read_single_folder(dir);
    const res_groups: any[] = res_data_in_subgroups_folder.map((file: string) => {
        return readjson(`${dir}/${file}`);
    });
    pack(dir, mode, encode, res_groups);
    return;
}
export function res_rewrite(dir: string, mode: number, encode: number): void {
    const res_data: any = readjson(dir);
    const res_groups: any[] = res_data.groups.map((res: {}) => {
        return res;
    });
    pack(dir, mode, encode, res_groups, true);
    return;
}
export function res_beautify(dir: string): void {
    const json: ResDataConstructor = readjson(dir);
    // split parent
    const parentArray: any = new Array();
    if (json.resources != undefined && json.resources != null && json.resources != void 0) {
        for (let i: number = 0; i < json.resources.length; ++i) {
            if (json.resources[i].atlas) {
                parentArray.push([json.resources[i]]);
            }
            else {
                continue;
            }
        }
        for (let i: number = 0; i < json.resources.length; i++) {
            for (let j: number = 0; j < parentArray.length; j++) {
                if (json.resources[i].parent) {
                    if (json.resources[i].parent === parentArray[j][0].id) {
                        parentArray[j].push(json.resources[i]);
                    }
                }
            }
        }
    }
    for(let i: number = 0; i < parentArray.length; i++){
        parentArray[i] = sortResObjects(parentArray[i]);
    }
    const resources_output_result: any[] = [].concat(...parentArray);
    json.resources = resources_output_result;
    return writejson(`${dir}/../${path.parse(dir).name}.fixed.json`, json);
}
export default class {
    constructor(public dir: string, public encode: number, public mode: number, public data: any[]) {
    }
    ResPack() {
        pack(this.dir, this.mode, this.encode, this.data);
    }
    ResSplit() {
        res_split(this.dir);
    }
}