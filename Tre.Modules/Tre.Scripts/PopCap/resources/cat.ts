"use strict";
import { read_single_folder, readjson, writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import BeautifyRes from './beautify/beautify.js';
import path from 'node:path';

export interface SimpleData {
    id: string;
    type: string;
    parent?: string;
    res?: string;
    resources: any;
    subgroups?: any[];
}

export interface MainData {
    slot: number;
    id: string;
    path: string[];
    type: string;
    atlas?: boolean;
    width?: number;
    height?: number;
    parent?: string;
    ax?: number;
    ay?: number;
    aw?: number;
    ah?: number;
    x?: number;
    y?: number;
    subgroups?: any[],
}

export default function (dir: string, mode: number, encode: any, res_array_for_data: any[], is_rewrite_mode: boolean = false, is_return_output_mode: boolean = false): any {
    const rsg_data: any[] = res_array_for_data;
    let slot_count = 0;
    const resources_output_result: any = { "version": 1, "slot_count": 0, "groups": [] };
    for (let i = 0; i < rsg_data.length; i++) {
        if (mode === 2) {
            rsg_data[i] = BeautifyRes.Tre.Resources.beautify_res(rsg_data[i]);
        }
        if ("resources" in rsg_data[i]) {
            for (let j: number = 0; j < rsg_data[i].resources.length; j++) {
                rsg_data[i].resources.slot = slot_count;
                slot_count++;
            }
        }
    };
    resources_output_result.groups = rsg_data;
    resources_output_result.slot_count = slot_count;
    if(is_return_output_mode){
        return resources_output_result;
    }
    if (!is_rewrite_mode) {
        writejson(`${dir}/../${path.parse(dir).name}.json`, resources_output_result);
    }
    else {
        writejson(`${dir}/../${path.parse(dir).name}.rewrite.json`, resources_output_result);
    }
    return 0;
}