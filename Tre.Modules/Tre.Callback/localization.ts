import { readjson } from "../Tre.Libraries/Tre.FileSystem/util.js";
function localization(locate_data: string): string {
    try {
        let language_json: any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/localization/" + (readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json", true) as any).language + ".json", true);
        if (language_json[locate_data] === undefined || language_json[locate_data] === "undefined" || language_json[locate_data] === void 0 || language_json[locate_data] === null) {
            return locate_data;
        }
        return language_json[locate_data];
    } catch (error: any) {
        throw new Error("Cannot read localization data");
    }
}
export default localization;