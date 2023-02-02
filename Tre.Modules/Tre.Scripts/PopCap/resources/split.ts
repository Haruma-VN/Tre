"use strict";
import { readjson, writejson, makefolder } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import path from 'node:path';
export default async function (dir: string = process.argv[2]) {
    const json: { groups?: { id: string }[] } = readjson(dir);
    const directories = path.parse(dir).name + '.res';
    await makefolder(dir + '/../' + directories);
    if (json.groups != undefined) {
        for (let group of json.groups) {
            writejson(dir + '/../' + directories + '/' + group.id + '.json', group);
        }
        return 0;
    }
    else {
        TreErrorMessage(({ error: "Not valid PopCap Resources.json." }), "Not valid PopCap Resources.json.");
        return 0;
    }
}