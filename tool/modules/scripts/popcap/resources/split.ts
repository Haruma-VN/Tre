"use strict";
import localization from "../../../callback/localization.js";
import fs_js from "../../../library/fs/implement.js";
import BeautifyRes from "./beautify/beautify.js";

export interface TreSetting {
    resources: {
        split: {
            beautify_res: boolean;
            remove_unused_info: boolean;
        };
    };
}
export default async function (
    dir: string,
    json_data_if_no_dir_were_parsed?: any
) {
    const json: any =
        json_data_if_no_dir_were_parsed !== undefined &&
        json_data_if_no_dir_were_parsed !== null &&
        json_data_if_no_dir_were_parsed !== void 0
            ? json_data_if_no_dir_were_parsed
            : fs_js.read_json(dir);
    const config: TreSetting = fs_js.read_json(
        fs_js.dirname(process.argv[1]) + "/extension/settings/toolkit.json",
        true
    ) as TreSetting;
    const is_beautify_mode: boolean = config.resources.split.beautify_res
        ? true
        : false;
    const directories = fs_js.parse_fs(dir).name + ".res";
    if (!("groups" in json)) {
        throw new Error(localization("not_valid_resources"));
    }
    if ("groups" in json) {
        fs_js.create_directory(dir + "/../" + directories, true);
        for (let group of json.groups) {
            if (
                "resources" in config &&
                "split" in config.resources &&
                "remove_unused_info" in config.resources.split
            ) {
                if (config.resources.split.remove_unused_info) {
                    if ("resources" in group) {
                        for (
                            let j: number = 0;
                            j < group.resources.length;
                            ++j
                        ) {
                            if ("aflag" in group.resources[j]) {
                                group.resources[j].aflag = undefined;
                            }
                            if ("time" in group.resources[j]) {
                                group.resources[j].time = undefined;
                            }
                        }
                    }
                }
            }
            if (
                "resources" in config &&
                "split" in config.resources &&
                "beautify_res" in config.resources.split
            ) {
                if (is_beautify_mode) {
                    if ("resources" in group) {
                        group = BeautifyRes.Tre.Resources.beautify_res(group);
                    }
                }
            }
            fs_js.write_json(
                dir + "/../" + directories + "/" + group.id + ".json",
                group as object
            );
        }
        return 0;
    } else {
        throw new Error(localization("not_valid_resources"));
    }
}
