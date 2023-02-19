"use strict";
import { readjson, writejson, makefolder } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import localization from '../../../Tre.Callback/localization.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from 'node:path';
export default async function (dir: string = process.argv[2]) {
    const json: { groups?: { id: string }[] } = readjson(dir);
    const directories = path.parse(dir).name + '.res';
    if (json.groups != undefined) {
        await makefolder(dir + '/../' + directories);
        for (let group of json.groups) {
            writejson(dir + '/../' + directories + '/' + group.id + '.json', group);
        }
        return 0;
    }
    else {
        TreErrorMessage(({ error: localization("not_valid_resources") }), localization("not_valid_resources"));
        return 0;
    }
}