"use strict";
import fs_js from "../../../../library/fs/implement.js";

namespace BeautifyRes.Tre.Resources {
    export type PopCapCommonResources = {
        id: string;
        type: string;
        parent: string;
        res: string;
        resources: Array<
            PopCapCommonObjectInResources | PopCapCommonObjectInAtlasResources
        >;
    };

    export type PopCapCommonObjectInResources = {
        slot: number;
        id: string;
        path: Array<string> | string;
        type?: string;
        atlas?: boolean;
        width?: number;
        height?: number;
        runtime?: boolean;
        forceOriginalVectorSymbolSize?: boolean;
    };

    export type PopCapCommonObjectInAtlasResources = {
        slot?: number;
        id?: string;
        path?: Array<string> | string;
        type: string;
        parent: string;
        ax?: number;
        ay?: number;
        aw?: number;
        ah?: number;
        x?: number;
        y?: number;
        cols?: number;
        srcpath?: Array<string>;
        atlas?: boolean;
        runtime?: boolean;
        forceOriginalVectorSymbolSize?: boolean;
    };

    export function PopCapSortOrderNumber(
        popcap_location_in_setting_display: string
    ): number {
        const PopCapSortOrderNumber: PopCapAnyResources = fs_js.read_json(
            fs_js.dirname(process.argv[1]) + "/extension/settings/toolkit.json",
            true
        ) as PopCapAnyResources;
        return PopCapSortOrderNumber.resources.beautify_order[
            popcap_location_in_setting_display
        ];
    }

    export const repairable_data_for_integer_negative_number: Array<string> = [
        "width",
        "height",
        "cols",
        "aw",
        "ah",
        "ax",
        "ay",
    ];

    export const allowed_items_in_popcap_small_list_for_resources: Array<string> =
        ["id", "type", "parent", "res", "resources", "subgroups"];

    export const allowed_items_in_popcap_object_in_small_resources: Array<string> =
        [
            "slot",
            "id",
            "path",
            "type",
            "atlas",
            "width",
            "height",
            "parent",
            "aw",
            "ah",
            "ax",
            "ay",
            "x",
            "y",
            "cols",
            "width",
            "height",
            "srcpath",
            "runtime",
            "forceOriginalVectorSymbolSize",
        ];

    export type PopCapAnyResources = {
        [key: string]: any;
    };

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
        runtime = PopCapSortOrderNumber("runtime"),
        forceOriginalVectorSymbolSize = PopCapSortOrderNumber(
            "forceOriginalVectorSymbolSize"
        ),
    }

    export function beautify_res(
        popcap_common_json_item_in_list_resources: PopCapAnyResources
    ) {
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
            runtime: PopCapSort.runtime,
            forceOriginalVectorSymbolSize:
                PopCapSort.forceOriginalVectorSymbolSize,
        };
        const popcap_common_json_item_in_new_resources_list_with_beautify:
            | PopCapCommonResources
            | PopCapAnyResources = Object.keys(
            popcap_common_json_item_in_list_resources
        )
            .sort()
            .map(function (popcap_common_item_in_small_res_list: string) {
                if (
                    allowed_items_in_popcap_small_list_for_resources.includes(
                        popcap_common_item_in_small_res_list
                    )
                ) {
                    return {
                        [popcap_common_item_in_small_res_list]:
                            popcap_common_json_item_in_list_resources[
                                popcap_common_item_in_small_res_list
                            ],
                    };
                }
            })
            .reduce(function (popcap_item_merged, popcap_item_as_object) {
                return { ...popcap_item_merged, ...popcap_item_as_object };
            }, {}) as PopCapCommonResources;
        if (
            "resources" in
            popcap_common_json_item_in_new_resources_list_with_beautify
        ) {
            for (
                let i: number = 0;
                i <
                popcap_common_json_item_in_new_resources_list_with_beautify
                    .resources.length;
                i++
            ) {
                popcap_common_json_item_in_new_resources_list_with_beautify.resources[
                    i
                ] = Object.keys(
                    popcap_common_json_item_in_new_resources_list_with_beautify
                        .resources[i]
                )
                    .sort(function (a: any, b: any) {
                        return PopCapSortOrder[a] - PopCapSortOrder[b];
                    })
                    .map(function (
                        popcap_common_item_in_small_res_list: string
                    ) {
                        if (
                            allowed_items_in_popcap_object_in_small_resources.includes(
                                popcap_common_item_in_small_res_list
                            )
                        ) {
                            if (
                                repairable_data_for_integer_negative_number.includes(
                                    popcap_common_item_in_small_res_list
                                )
                            ) {
                                popcap_common_json_item_in_new_resources_list_with_beautify.resources[
                                    i
                                ][popcap_common_item_in_small_res_list] =
                                    Number.isInteger(
                                        popcap_common_json_item_in_new_resources_list_with_beautify
                                            .resources[i][
                                            popcap_common_item_in_small_res_list
                                        ]
                                    ) &&
                                    popcap_common_json_item_in_new_resources_list_with_beautify
                                        .resources[i][
                                        popcap_common_item_in_small_res_list
                                    ] > 0
                                        ? popcap_common_json_item_in_new_resources_list_with_beautify
                                              .resources[i][
                                              popcap_common_item_in_small_res_list
                                          ]
                                        : Math.abs(
                                              popcap_common_json_item_in_new_resources_list_with_beautify
                                                  .resources[i][
                                                  popcap_common_item_in_small_res_list
                                              ]
                                          );
                            }
                            return {
                                [popcap_common_item_in_small_res_list]:
                                    popcap_common_json_item_in_new_resources_list_with_beautify
                                        .resources[i][
                                        popcap_common_item_in_small_res_list
                                    ],
                            };
                        }
                    })
                    .reduce(function (
                        popcap_resource_common_item_object_key,
                        popcap_resource_common_item_object_value
                    ) {
                        return {
                            ...popcap_resource_common_item_object_key,
                            ...popcap_resource_common_item_object_value,
                        };
                    },
                    {}) as PopCapCommonObjectInAtlasResources;
            }
        }
        return popcap_common_json_item_in_new_resources_list_with_beautify satisfies
            | PopCapAnyResources
            | PopCapCommonResources;
    }

    export function execute(dir: string): void {
        const json = fs_js.read_json(dir);
        fs_js.write_json(
            `${dir}/../${fs_js.parse_fs(dir).name}.fixed.json`,
            beautify_res(json)
        );
        return;
    }
}
export default BeautifyRes;
