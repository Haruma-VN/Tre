"use strict";
import pack from "./cat.js";
import split from "./split.js";
import sortResObjects from "../../../library/sort/popcap_resources.js";
import local_res_compare from "./compare/local.js";
import BeautifyRes from "./beautify/beautify.js";
import localization from "../../../callback/localization.js";
import AdaptPvZ2InternationalResPath from "./expands/resources.js";
import rton_to_json from "../rton/rton2json.js";
import fs_js from "../../../library/fs/implement.js";
import { parse } from "../../../library/json/util.js";
import repair from "./repair/pvz2c_path.js";

export function LocalResourcesCompare(vanilla_directory: string, modded_directory: string) {
    local_res_compare(vanilla_directory, modded_directory);
}

export function res_split(dir: string) {
    let json: any;

    if (fs_js.parse_fs(dir).ext.toString().toLowerCase() === ".rton") {
        json = parse(rton_to_json(fs_js.read_file(dir, "buffer"), false));
    } else {
        json = fs_js.read_json(dir as string);
    }

    if ("groups" in json) {
        split(dir, json);
    } else {
        throw new Error(localization("not_valid_resources"));
    }
}

export { AdaptPvZ2InternationalResPath };

export interface ResDataConstructor {
    type?: string;
    id?: string;
    res?: string;
    parent?: string;
    resources?: any[];
}

export function res_pack(dir: string, mode: number, encode: number): void {
    const res_data_in_subgroups_folder = fs_js.one_reader(dir);
    const res_groups: any[] = res_data_in_subgroups_folder
        .map((file: string) => {
            if (fs_js.parse_fs(file).ext.toString().toLowerCase() === ".json") {
                const json: any = fs_js.read_json(`${dir}/${file}`);
                if (json.id !== undefined && json.id !== null && json.id !== void 0) {
                    return json;
                }
            }
        })
        .filter((file) => file !== undefined)
        .map((file) => file as any);
    const is_return_mode: boolean = encode === 1 ? true : false;
    pack(dir, mode, encode, res_groups, false, is_return_mode);

    return;
}
export function small_res_beautify(directory: string): void {
    BeautifyRes.Tre.Resources.execute(directory);
}

export function res_rewrite(dir: string, mode: number, encode: number): void {
    const res_data: any = fs_js.read_json(dir);
    const res_groups: any[] = res_data.groups.map((res: {}) => {
        return res;
    });
    pack(dir, mode, encode, res_groups, true);
    return;
}

export function res_beautify(dir: string): void {
    const json: ResDataConstructor = fs_js.read_json(dir);
    const parentArray: any = new Array();
    if (json.resources !== undefined && json.resources !== null && json.resources !== void 0) {
        for (let i: number = 0; i < json.resources.length; ++i) {
            if (json.resources[i].atlas) {
                parentArray.push([json.resources[i]]);
            } else {
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
    fs_js.write_json(`${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}.fixed.json`, json, false);
    return;
}

export function RepairPvZ2CResourcesPath(file_path: string, file_output?: string) {
    if (file_output === undefined || file_output === null || file_output === void 0) {
        file_output = `${fs_js.dirname(file_path)}/RESOURCES.Repair.json`;
    }
    const res_json: any = fs_js.read_json(file_path);
    fs_js.write_json(file_output, repair(res_json), false);
}
