"use strict";
import BeautifyRes from "./beautify/beautify.js";
import json2rton from "../rton/json2rton.js";
import fs_js from "../../../library/fs/implement.js";
import { args } from "../../../implement/arguments.js";
import { Resources_Property } from "./strict/property.js";

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
    is_return_output_mode: boolean = false,
): any {
    fs_js.using("PopCap Resource Group Merge", "ignore");
    let config_json: any = fs_js.read_json(
        fs_js.dirname(args.main_js as any) + "/extension/settings/toolkit.json",
        true,
    );
    const popcap_resource_manifest_data: any[] = res_array_for_data;
    let slot_count: number = 0;
    const resources_output_result: {
        version: 1;
        content_version: 1;
        slot_count: number;
        groups: Array<any>;
    } = {
        version: 1,
        content_version: 1,
        slot_count: 0,
        groups: [],
    };
    for (let i = 0; i < popcap_resource_manifest_data.length; i++) {
        if (Resources_Property.resources in popcap_resource_manifest_data[i]) {
            for (let j: number = 0; j < popcap_resource_manifest_data[i][Resources_Property.resources].length; j++) {
                popcap_resource_manifest_data[i][Resources_Property.resources][j][
                    Resources_Property.popcap_resource_slot
                ] = slot_count;
                slot_count++;
                if (config_json[Resources_Property.resources].cat.fix_double_shadows) {
                    if (
                        popcap_resource_manifest_data[i][Resources_Property.resources][j][
                            Resources_Property.popcap_resource_id
                        ] === Resources_Property.pea_shadows
                    ) {
                        popcap_resource_manifest_data[i][Resources_Property.resources][j][Resources_Property.cols] =
                            Resources_Property.default_pea_shadows_property_fix;
                    }
                }
            }
        }
        if (mode === 2) {
            popcap_resource_manifest_data[i] = BeautifyRes.Tre.Resources.beautify_res(popcap_resource_manifest_data[i]);
        }
    }
    resources_output_result.groups = popcap_resource_manifest_data;
    resources_output_result.slot_count = slot_count;
    if (is_return_output_mode) {
        return resources_output_result;
    }
    if (!is_rewrite_mode) {
        fs_js.write_json(`${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}.json`, resources_output_result, false);
    } else {
        if (encode) {
            fs_js.outfile_fs(
                `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}.rewrite.rton`,
                json2rton(resources_output_result, false),
                false,
            );
        } else {
            fs_js.write_json(
                `${fs_js.dirname(dir)}/${fs_js.parse_fs(dir).name}.rewrite.json`,
                resources_output_result,
                false,
            );
        }
    }
    return 0;
}
