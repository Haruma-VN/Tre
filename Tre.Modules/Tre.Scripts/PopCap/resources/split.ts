"use strict";
import { readjson, writejson, makefolder } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import localization from '../../../Tre.Callback/localization.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
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
export default async function (dir: string = process.argv[2]) {
    const json: any = readjson(dir);
    const config: TreSetting = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", true)  as TreSetting;
    const is_beautify_mode: boolean = (config.resources.split.beautify_res) ? true : false;
    const directories = path.parse(dir).name + '.res';
    if (json.groups != undefined) {
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
        TreErrorMessage(({ error: localization("not_valid_resources") }), localization("not_valid_resources"));
        return 0;
    }
}