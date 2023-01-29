"use strict";
import { readjson, writejson, makefolder } from "../../../Tre.Libraries/Tre.FileSystem/util.js";
export default function (dir, method = "id") {
    const atlasinfo = readjson(dir);
    makefolder(dir + "/../" + "AtlasInfo");
    if (atlasinfo.groups != undefined && atlasinfo.groups != null) {
        for (let i = 0; i < (atlasinfo === null || atlasinfo === void 0 ? void 0 : atlasinfo.groups.length); ++i) {
            switch (method) {
                case "path":
                    writejson(dir + "/../" + "AtlasInfo/" + atlasinfo.groups[i].path[atlasinfo.groups[i].path.length - 1] + ".json", atlasinfo.groups[i]);
                    break;
                default:
                    writejson(dir + "/../" + "AtlasInfo/" + atlasinfo.groups[i].id + ".json", atlasinfo.groups[i]);
                    break;
            }
            ;
        }
        ;
    }
    ;
    atlasinfo.groups = undefined;
    writejson(`${dir}/../Info.json`, atlasinfo);
    return;
}
