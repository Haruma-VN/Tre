import { readjson } from "../library/fs/util.js";
import path from "node:path";

function localization(locate_data: string): string {
    try {
        const filepath = path.dirname(process.argv[1]) + "/extension/settings/localization/" + (readjson(path.dirname(process.argv[1]) + "/extension/settings/toolkit.json", true) as any).language + ".json";
        let language_json: any = readjson(filepath, true);
        if (language_json[locate_data] === undefined || language_json[locate_data] === "undefined" || language_json[locate_data] === void 0 || language_json[locate_data] === null) {
            return locate_data;
        }
        return language_json[locate_data];
    } catch (error: any) {
        return locate_data as string;
    }
}
export default localization;