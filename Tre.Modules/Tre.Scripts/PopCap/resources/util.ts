"use strict";
import pack from './cat.js';
import split from './split.js';
import { read_single_folder, readjson, writejson, outfile } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import sortResObjects from "../../../Tre.Libraries/Tre.Sort/ArraySortSystem.js";
import local_res_compare from './compare/local.js';
import path from 'path';
import BeautifyRes from './beautify/beautify.js';
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";
import localization from '../../../Tre.Callback/localization.js';
import AdaptPvZ2InternationalResPath from "./expands/resources.js";
import json_to_rton from "../rton/json2rton.js";

export function LocalResourcesCompare(vanilla_directory: string, modded_directory: string) {
    local_res_compare(vanilla_directory, modded_directory);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${modded_directory}/../${path.parse(modded_directory).name}_cmp.res`)}`);
}

export function res_split(dir: string, this_will_stop_console: boolean = false) {
    const json: any = readjson(dir);
    if ("groups" in json) {
        split(dir, json);
    }
    else {
        throw new Error(localization("not_valid_resources"))
    }
    if (!this_will_stop_console) {
        console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir + '/../' + path.parse(dir).name + '.res'}`)}`);
    }
}

export {
    AdaptPvZ2InternationalResPath,
}

export interface ResDataConstructor {
    type?: string;
    id?: string;
    res?: string;
    parent?: string;
    resources?: any[]
}

export function res_pack(dir: string, mode: number, encode: number, this_will_stop_console: boolean = false): void {
    const res_data_in_subgroups_folder = read_single_folder(dir);
    const res_groups: any[] = res_data_in_subgroups_folder.map((file: string) => {
        if (path.parse(file).ext.toString().toLowerCase() === ".json") {
            const json: any = readjson(`${dir}/${file}`);
            if (json.id != undefined && json.id != null && json.id != void 0) {
                return json;
            }
        }
    }).filter(file => file !== undefined)
        .map(file => file as any);;
    const is_return_mode: boolean = (encode === 1) ? true : false;
    const resource_return_output_data = pack(dir, mode, encode, res_groups, false, is_return_mode);
    switch (encode) {
        case 1:
            outfile(`${path.resolve(`${dir}/../RESOURCES.rton`)}`, json_to_rton(resource_return_output_data));
            if (!this_will_stop_console) {
                console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../${path.parse(dir).name}.RTON`)}`);
            }
            break;
        case 0:
            if (!this_will_stop_console) {
                console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../RESOURCES.json`)}`);
            }
            break
    }

    return;
}
export function small_res_beautify(directory: string): void {
    BeautifyRes.Tre.Resources.execute(directory);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${directory}/../${path.parse(directory).name}.fixed.json`)}`);
}

export function res_rewrite(dir: string, mode: number, encode: number): void {
    const res_data: any = readjson(dir);
    const res_groups: any[] = res_data.groups.map((res: {}) => {
        return res;
    });
    switch (encode) {
        case 1:
            console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../${path.parse(dir).name}.rewrite.rton`)}`);
            break;
        case 0:
            console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../${path.parse(dir).name}.rewrite.json`)}`);
            break
    }
    pack(dir, mode, encode, res_groups, true);
    return;
}

export function res_beautify(dir: string): void {
    const json: ResDataConstructor = readjson(dir);
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
    for (let i: number = 0; i < parentArray.length; i++) {
        parentArray[i] = sortResObjects(parentArray[i]);
    }
    const resources_output_result: any[] = [].concat(...parentArray);
    json.resources = resources_output_result;
    console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")} ${path.resolve(`${dir}/../${path.parse(dir).name}.fixed.json`)}`);
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