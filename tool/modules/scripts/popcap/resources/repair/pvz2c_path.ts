"use strict";
import localization from "../../../../callback/localization.js";
import { MissingProperty } from "../../../../implement/error.js";
import AdaptPvZ2InternationalResPath from "../expands/resources.js";
export interface res_json {
    groups: res_small[];
}

export interface res_small {
    resources: res_res[];
}

export interface res_res {
    path: string[] | string;
    origpath?: string;
}

function repair_duplicated_path<T extends res_json>(res_json_full: T, file_path: string): T {
    if (!("groups" in res_json_full)) {
        throw new MissingProperty(localization("not_valid_resources"), "groups", file_path);
    }
    for (let i: number = 0; i < res_json_full.groups.length; ++i) {
        if (
            "resources" in res_json_full.groups[i] &&
            res_json_full.groups[i].resources !== undefined &&
            res_json_full.groups[i].resources !== null &&
            res_json_full.groups[i].resources !== void 0
        ) {
            for (let j: number = 0; j < res_json_full.groups[i].resources.length; ++j) {
                if (
                    "origpath" in res_json_full.groups[i].resources[j] &&
                    res_json_full.groups[i].resources[j].origpath !== undefined &&
                    res_json_full.groups[i].resources[j].origpath !== null &&
                    res_json_full.groups[i].resources[j].origpath !== void 0 &&
                    typeof res_json_full.groups[i].resources[j].origpath === "string" &&
                    "path" in res_json_full.groups[i].resources[j] &&
                    res_json_full.groups[i].resources[j].path !== undefined &&
                    res_json_full.groups[i].resources[j].path !== null &&
                    res_json_full.groups[i].resources[j].path !== void 0
                ) {
                    const path_iz_list: boolean = Array.isArray(res_json_full.groups[i].resources[j].path);
                    if (!path_iz_list) {
                        res_json_full.groups[i].resources[j].path = AdaptPvZ2InternationalResPath.new_res_to_old_res(
                            res_json_full.groups[i].resources[j].path as any,
                        );
                    }
                    let origpath_str: string = res_json_full.groups[i].resources[j].origpath as string;
                    let lambda: any;
                    for (let k: number = 0; k < res_json_full.groups[i].resources[j].path.length; ++k) {
                        const index: number = origpath_str.indexOf(res_json_full.groups[i].resources[j].path[k]);
                        lambda =
                            index !== -1
                                ? index + res_json_full.groups[i].resources[j].path[k].length
                                : (lambda as number);
                        const sliced_str: string =
                            index !== -1
                                ? origpath_str.slice(
                                      origpath_str.indexOf(res_json_full.groups[i].resources[j].path[k]),
                                      lambda,
                                  )
                                : origpath_str.slice(lambda);
                        (res_json_full.groups[i].resources[j].path[k] as any) = sliced_str;
                    }
                    delete res_json_full.groups[i].resources[j].origpath;
                    if (!path_iz_list) {
                        res_json_full.groups[i].resources[j].path = AdaptPvZ2InternationalResPath.old_res_to_new_res(
                            res_json_full.groups[i].resources[j].path as any,
                        );
                    }
                }
            }
        }
    }

    return res_json_full;
}

export default repair_duplicated_path;
