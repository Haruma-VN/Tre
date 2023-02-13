"use strict";
import { read_single_folder, readjson, writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
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

export default function (dir:string, mode: number, encode: any, res_array_for_data: any[], is_rewrite_mode: boolean = false): number {
    const rsg_data: any[] = res_array_for_data;
    let slot_count = 0;
    const resources_output_result = { "version": 1, "slot_count": 0, "groups": [] };
    switch (mode) {
        case 2:
            for (let i = 0; i < rsg_data.length; i++) {
                let debug_json: SimpleData = { "id": "", "type": "simple", "parent": "", "res": "", "resources": [] };
                let express_json = rsg_data[i];
                debug_json.id = express_json.id;
                if (express_json.res != undefined) {
                    debug_json.res = express_json.res;
                }
                else {
                    debug_json.res = undefined;
                }
                if (express_json.parent != undefined) {
                    debug_json.parent = express_json.parent;
                }
                else {
                    debug_json.parent = undefined;
                }
                if (express_json.resources != undefined) {
                    debug_json.resources = express_json.resources;
                }
                else {
                    debug_json.resources = undefined;
                }
                if (express_json.subgroups != undefined) {
                    debug_json.subgroups = express_json.subgroups;
                }
                else {
                    debug_json.subgroups = undefined;
                }
                debug_json.type = express_json.type;
                express_json = debug_json;
                let res_fix: any;
                if ((express_json.type == 'simple') && (express_json.parent != undefined) && (express_json.id != undefined) && (express_json.res != undefined)) {
                    for (let j = 0; j < express_json.resources.length; j++) {
                        const mainData = () => {
                            switch (express_json.resources[j].atlas) {
                                case (true):
                                    res_fix = { "slot": 0, "id": "", "path": ["atlases"], "type": "Image", "atlas": true, "width": 0, "height": 0 };
                                    res_fix.id = express_json.resources[j].id;
                                    res_fix.path = express_json.resources[j].path;
                                    if (express_json.resources[j].width < 0) {
                                        express_json.resources[j].width = (express_json.resources[j].width * -1);
                                    };
                                    if (express_json.resources[j].height < 0) {
                                        express_json.resources[j].height = (express_json.resources[j].height * -1);
                                    };
                                    res_fix.width = express_json.resources[j].width;
                                    res_fix.height = express_json.resources[j].height;
                                    express_json.resources[j] = res_fix;
                                    break
                                default:
                                    res_fix = { "slot": 0, "id": "", "path": ["images"], "type": "Image", "parent": "", "ax": 0, "ay": 0, "aw": 0, "ah": 0, "x": 0, "y": 0 };
                                    res_fix.id = express_json.resources[j].id;
                                    res_fix.path = express_json.resources[j].path;
                                    res_fix.parent = express_json.resources[j].parent;
                                    if (express_json.resources[j].ax < 0) {
                                        express_json.resources[j].ax = (express_json.resources[j].ax * -1)
                                    };
                                    if (express_json.resources[j].ay < 0) {
                                        express_json.resources[j].ay = (express_json.resources[j].ay * -1)
                                    };
                                    if (express_json.resources[j].ah < 0) {
                                        express_json.resources[j].ah = (express_json.resources[j].ah * -1)
                                    };
                                    if (express_json.resources[j].aw < 0) {
                                        express_json.resources[j].aw = (express_json.resources[j].aw * -1)
                                    };
                                    res_fix.ax = express_json.resources[j].ax;
                                    res_fix.ay = express_json.resources[j].ay;
                                    res_fix.aw = express_json.resources[j].aw;
                                    res_fix.ah = express_json.resources[j].ah;
                                    if (express_json.resources[j].x != undefined) {
                                        res_fix.x = express_json.resources[j].x;
                                    }
                                    else {
                                        res_fix.x = 0;
                                    }
                                    if (express_json.resources[j].y != undefined) {
                                        res_fix.y = express_json.resources[j].y;
                                    }
                                    else {
                                        res_fix.y = 0;
                                    }
                                    express_json.resources[j] = res_fix;
                                    break
                            }
                        }
                        let promise = new Promise<void>((resolve) => {
                            resolve()
                        })
                        promise.then(mainData()).then(rsg_data[i] = express_json)
                    }
                }
                else if ((express_json.type == 'simple') && (express_json.id != undefined) && (express_json.res == undefined)) {
                    for (let j = 0; j < express_json.resources.length; j++) {
                        let promise = new Promise<void>((resolve) => {
                            res_fix = { "slot": 0, "id": "", "path": [], "type": "" };
                            res_fix.id = express_json.resources[j].id;
                            res_fix.path = express_json.resources[j].path;
                            res_fix.type = express_json.resources[j].type;
                            express_json.resources[j] = res_fix;
                            resolve()
                        })
                        promise.then(rsg_data[i] = express_json)
                    }
                }
                else if ((express_json.type == 'composite') && (express_json.parent == undefined) && (express_json.subgroups != undefined) && (express_json.res == undefined)) {
                    let promise = new Promise<void>((resolve) => {
                        res_fix = { "id": "", "subgroups": [], "type": "composite" };
                        res_fix.id = express_json.id;
                        res_fix.subgroups = express_json.subgroups;
                        res_fix.type = express_json.type;
                        express_json = res_fix;
                        resolve();
                    })
                    promise.then(rsg_data[i] = express_json);
                }
            };
        default:
            for (let i = 0; i < rsg_data.length; i++) {
                if (rsg_data[i].resources != undefined) {
                    for (let j = 0; j < rsg_data[i].resources.length; j++) {
                        rsg_data[i].resources[j].slot = slot_count;
                        slot_count++;
                        if (rsg_data[i].resources[j].id == 'IMAGE_PEA_SHADOWS') {
                            rsg_data[i].resources[j].cols = 2;
                        }
                    }
                }
                else {
                    continue;
                }
            }
            break;
    };
    resources_output_result.groups = rsg_data;
    resources_output_result.slot_count = slot_count;
    if(!is_rewrite_mode){
        writejson(`${dir}/../${path.parse(dir).name}.json`, resources_output_result);
    }
    else{
        writejson(`${dir}/../${path.parse(dir).name}.rewrite.json`, resources_output_result);
    }
    return 0;
}