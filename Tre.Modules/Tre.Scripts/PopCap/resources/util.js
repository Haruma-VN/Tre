"use strict";
import pack from './cat.js';
import res_split from './split.js';
import { read_single_folder, readjson, writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import sortResObjects from "../../../Tre.Libraries/Tre.Sort/ArraySortSystem.js";
import LocalResourcesCompare from './compare/local.js';
import path from 'path';
export { res_split, LocalResourcesCompare, };
export function res_pack(dir, mode, encode) {
    const res_data_in_subgroups_folder = read_single_folder(dir);
    const res_groups = res_data_in_subgroups_folder.map((file) => {
        return readjson(`${dir}/${file}`);
    });
    pack(dir, mode, encode, res_groups);
    return;
}
export function res_rewrite(dir, mode, encode) {
    const res_data = readjson(dir);
    const res_groups = res_data.groups.map((res) => {
        return res;
    });
    pack(dir, mode, encode, res_groups, true);
    return;
}
export function res_beautify(dir) {
    const json = readjson(dir);
    // split parent
    const parentArray = new Array();
    if (json.resources != undefined && json.resources != null && json.resources != void 0) {
        for (let i = 0; i < json.resources.length; ++i) {
            if (json.resources[i].atlas) {
                parentArray.push([json.resources[i]]);
            }
            else {
                continue;
            }
        }
        for (let i = 0; i < json.resources.length; i++) {
            for (let j = 0; j < parentArray.length; j++) {
                if (json.resources[i].parent) {
                    if (json.resources[i].parent === parentArray[j][0].id) {
                        parentArray[j].push(json.resources[i]);
                    }
                }
            }
        }
    }
    for (let i = 0; i < parentArray.length; i++) {
        parentArray[i] = sortResObjects(parentArray[i]);
    }
    const resources_output_result = [].concat(...parentArray);
    json.resources = resources_output_result;
    return writejson(`${dir}/../${path.parse(dir).name}.fixed.json`, json);
}
export default class {
    dir;
    encode;
    mode;
    data;
    constructor(dir, encode, mode, data) {
        this.dir = dir;
        this.encode = encode;
        this.mode = mode;
        this.data = data;
    }
    ResPack() {
        pack(this.dir, this.mode, this.encode, this.data);
    }
    ResSplit() {
        res_split(this.dir);
    }
}
