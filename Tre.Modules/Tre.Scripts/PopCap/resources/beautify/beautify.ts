"use strict";
import path from "path";
import localization from "../../../../Tre.Callback/localization.js";
import { readjson, writejson } from "../../../../Tre.Libraries/Tre.FileSystem/util.js";
namespace BeautifyRes.Tre.Resources {

    export type PopCapCommonResources = {
        id: string,
        type: string,
        parent: string,
        res: string,
        resources: Array<PopCapCommonObjectInResources | PopCapCommonObjectInAtlasResources>,
    }

    export type PopCapCommonObjectInResources = {
        slot: number,
        id: string,
        path: Array<string> | string,
        type?: string,
        atlas?: boolean,
        width?: number,
        height?: number,
    }

    export type PopCapCommonObjectInAtlasResources = {
        slot?: number,
        id?: string,
        path?: Array<string> | string,
        type: string,
        parent: string,
        ax?: number,
        ay?: number,
        aw?: number,
        ah?: number,
        x?: number,
        y?: number,
        cols?: number,
        srcpath?: Array<string>,
    }

    export function PopCapSortOrderNumber(popcap_location_in_setting_display: string): number {
        const PopCapSortOrderNumber: PopCapAnyResources = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", true) ;
        return PopCapSortOrderNumber.resources.beautify_order[popcap_location_in_setting_display];
    }

    export const repairable_data_for_integer_negative_number: Array<string> = ["width", "height", "cols", "aw", "ah", "ax", "ay"]

    export const allowed_items_in_popcap_small_list_for_resources: Array<string> = ["id", "type", "parent", "res", "resources", "subgroups"];

    export const allowed_items_in_popcap_object_in_small_resources: Array<string> = ["slot", "id", "path", "type", "atlas", "width", "height", "parent", "aw", "ah", "ax", "ay", "x", "y", "cols", "width", "height", "srcpath"];

    export type PopCapAnyResources = {
        [key: string]: any;
    }

    export enum PopCapSort {
        slot = PopCapSortOrderNumber("slot"),
        id = PopCapSortOrderNumber("id"),
        path = PopCapSortOrderNumber("path"),
        type = PopCapSortOrderNumber("type"),
        atlas = PopCapSortOrderNumber("atlas"),
        width = PopCapSortOrderNumber("width"),
        height = PopCapSortOrderNumber("height"),
        parent = PopCapSortOrderNumber("parent"),
        ah = PopCapSortOrderNumber("ah"),
        aw = PopCapSortOrderNumber("aw"),
        ax = PopCapSortOrderNumber("ax"),
        ay = PopCapSortOrderNumber("ay"),
        x = PopCapSortOrderNumber("x"),
        y = PopCapSortOrderNumber("y"),
        cols = PopCapSortOrderNumber("cols"),
        srcpath = PopCapSortOrderNumber("srcpath"),
    }

    export function beautify_res(popcap_common_json_item_in_list_resources: PopCapAnyResources) {
        const PopCapSortOrder: any = {
            slot: PopCapSort.slot,
            id: PopCapSort.id,
            path: PopCapSort.path,
            type: PopCapSort.type,
            atlas: PopCapSort.atlas,
            width: PopCapSort.width,
            height: PopCapSort.height,
            parent: PopCapSort.parent,
            ah: PopCapSort.ah,
            aw: PopCapSort.aw,
            ax: PopCapSort.ax,
            ay: PopCapSort.ay,
            x: PopCapSort.x,
            y: PopCapSort.y,
            cols: PopCapSort.cols,
            srcpath: PopCapSort.srcpath,
        };
        const popcap_common_json_item_in_new_resources_list_with_beautify: PopCapCommonResources | PopCapAnyResources = Object.keys(popcap_common_json_item_in_list_resources).sort().map(function (popcap_common_item_in_small_res_list: string) {
            if (allowed_items_in_popcap_small_list_for_resources.includes(popcap_common_item_in_small_res_list)) {
                return { [popcap_common_item_in_small_res_list]: popcap_common_json_item_in_list_resources[popcap_common_item_in_small_res_list] };
            }
        }).reduce(function (merged, obj) {
            return { ...merged, ...obj };
        }, {}) as PopCapCommonResources;
        if ("resources" in popcap_common_json_item_in_new_resources_list_with_beautify) {
            for (let i: number = 0; i < popcap_common_json_item_in_new_resources_list_with_beautify.resources.length; i++) {
                popcap_common_json_item_in_new_resources_list_with_beautify.resources[i] = Object.keys(popcap_common_json_item_in_new_resources_list_with_beautify.resources[i]).sort(function (a: any, b: any) {
                    return PopCapSortOrder[a] - PopCapSortOrder[b];
                }).map(function (popcap_common_item_in_small_res_list: string) {
                    if (allowed_items_in_popcap_object_in_small_resources.includes(popcap_common_item_in_small_res_list)) {
                        if (repairable_data_for_integer_negative_number.includes(popcap_common_item_in_small_res_list)) {
                            popcap_common_json_item_in_new_resources_list_with_beautify.resources[i][popcap_common_item_in_small_res_list] = (popcap_common_json_item_in_new_resources_list_with_beautify.resources[i][popcap_common_item_in_small_res_list] > 0) ? popcap_common_json_item_in_new_resources_list_with_beautify.resources[i][popcap_common_item_in_small_res_list] : popcap_common_json_item_in_new_resources_list_with_beautify.resources[i][popcap_common_item_in_small_res_list] * -1;
                        }
                        return { [popcap_common_item_in_small_res_list]: popcap_common_json_item_in_new_resources_list_with_beautify.resources[i][popcap_common_item_in_small_res_list] };
                    }

                }).reduce(function (popcap_resource_common_item_object_key, popcap_resource_common_item_object_value) {
                    return { ...popcap_resource_common_item_object_key, ...popcap_resource_common_item_object_value };
                }, {}) as PopCapCommonObjectInAtlasResources;
            }
        }
        return popcap_common_json_item_in_new_resources_list_with_beautify;
    }

    export function execute(dir: string): void {
        const json = readjson(dir);
        writejson(`${dir}/../${path.parse(dir).name}.fixed.json`, beautify_res(json));
        return;
    }

}
export default BeautifyRes;