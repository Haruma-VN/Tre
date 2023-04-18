"use strict";
import {
    read_single_folder,
    readjson,
    writejson,
    outfile,
} from "../../../library/fs/util.js";
import BeautifyRes from "./beautify/beautify.js";
import path from "node:path";
import json2rton from "../rton/json2rton.js";

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
    path: string[] | string;
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
    subgroups?: any[];
}

export default function (
    dir: string,
    mode: number,
    encode: any,
    res_array_for_data: any[],
    is_rewrite_mode: boolean = false,
    is_return_output_mode: boolean = false
): any {
    let config_json: any = readjson(
        path.dirname(process.argv[1]) + "/extension/settings/toolkit.json",
        true
    );
    const rsg_data: any[] = res_array_for_data;
    let slot_count: number = 0;
    const resources_output_result: any = {
        version: 1,
        slot_count: 0,
        groups: [],
    };
    const popcap_resource_pack_id_for_sprites: Array<string> = new Array();
    const popcap_resource_slot_for_sprites: Array<number> = new Array();
    for (let i = 0; i < rsg_data.length; i++) {
        if ("resources" in rsg_data[i]) {
            for (let j: number = 0; j < rsg_data[i].resources.length; j++) {
                if (
                    popcap_resource_pack_id_for_sprites.includes(
                        rsg_data[i].resources[j].id
                    )
                ) {
                    rsg_data[i].resources[j].slot =
                        popcap_resource_slot_for_sprites.at(
                            popcap_resource_pack_id_for_sprites.indexOf(
                                rsg_data[i].resources[j].id.toString() as string
                            )
                        );
                } else {
                    rsg_data[i].resources[j].slot = slot_count;
                    if (
                        rsg_data[i].resources[j].type === "Image" &&
                        (typeof rsg_data[i].resources[j].type === "string" ||
                            rsg_data[i].resources[j].type instanceof String) &&
                        !popcap_resource_pack_id_for_sprites.includes(
                            rsg_data[i].resources[j].id
                        ) &&
                        "id" in rsg_data[i].resources[j] &&
                        rsg_data[i].resources[j].id !== null &&
                        rsg_data[i].resources[j].id !== undefined &&
                        rsg_data[i].resources[j].id !== void 0
                    ) {
                        popcap_resource_pack_id_for_sprites.push(
                            rsg_data[i].resources[j].id
                        );
                        popcap_resource_slot_for_sprites.push(slot_count);
                    }
                    slot_count++;
                }
                if (config_json.resources.cat.fix_double_shadows) {
                    if (rsg_data[i].resources[j].id === "IMAGE_PEA_SHADOWS") {
                        rsg_data[i].resources[j].cols = 2;
                    }
                }
            }
        }
        if (mode === 2) {
            rsg_data[i] = BeautifyRes.Tre.Resources.beautify_res(rsg_data[i]);
        }
    }
    resources_output_result.groups = rsg_data;
    resources_output_result.slot_count = slot_count;
    if (is_return_output_mode) {
        return resources_output_result;
    }
    if (!is_rewrite_mode) {
        writejson(
            `${dir}/../${path.parse(dir).name}.json`,
            resources_output_result
        );
    } else {
        if (encode) {
            outfile(
                `${dir}/../${path.parse(dir).name}.rewrite.rton`,
                json2rton(resources_output_result)
            );
        } else {
            writejson(
                `${dir}/../${path.parse(dir).name}.rewrite.json`,
                resources_output_result
            );
        }
    }
    return 0;
}
