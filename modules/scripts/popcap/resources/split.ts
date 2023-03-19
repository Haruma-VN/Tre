"use strict";
import { readjson, writejson, makefolder } from '../../../library/fs/util.js';
import localization from '../../../callback/localization.js';
import BeautifyRes from './beautify/beautify.js';
import path from 'node:path';
export interface TreSetting {
    resources: {
        split: {
            beautify_res: boolean,
            remove_unused_info: boolean,
        }
    }
}
export default async function (dir: string, json_data_if_no_dir_were_parsed?: any) {
    const json: any = (json_data_if_no_dir_were_parsed != undefined && json_data_if_no_dir_were_parsed !== null && json_data_if_no_dir_were_parsed !== void 0) ? json_data_if_no_dir_were_parsed : readjson(dir);
    const config: TreSetting = readjson(process.cwd() + "/extension/settings/toolkit.json", true) as TreSetting;
    const is_beautify_mode: boolean = (config.resources.split.beautify_res) ? true : false;
    const directories = path.parse(dir).name + '.res';
    if ("groups" in json) {
        makefolder(dir + '/../' + directories);
        for (let group of json.groups) {
            if ("resources" in config && "split" in config.resources && "remove_unused_info" in config.resources.split) {
                if (config.resources.split.remove_unused_info) {
                    if ("resources" in group) {
                        for (let j: number = 0; j < group.resources.length; ++j) {
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
            if ("resources" in config && "split" in config.resources && "beautify_res" in config.resources.split) {
                if (is_beautify_mode) {
                    if ("resources" in group) {
                        group = BeautifyRes.Tre.Resources.beautify_res(group);
                    }
                }
            }
            writejson(dir + '/../' + directories + '/' + group.id + '.json', group);
        }
        return 0;
    }
    else {
        throw new Error(localization("not_valid_resources"));
    }
}