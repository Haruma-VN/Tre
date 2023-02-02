"use strict";
import { readjson, writejson, read_dir } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
export default function (dir) {
    const bundles = (read_dir(`${dir}/Bundles/`));
    const info = readjson(`${dir}/Info.json`);
    for (let bundle of bundles) {
        if (info.groups != undefined && info.groups != null) {
            info.groups.push(readjson(bundle));
        }
    }
    ;
    writejson(`${dir}/../AtlasInfo.json`, info);
    return 0;
}
