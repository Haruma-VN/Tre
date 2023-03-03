import { readjson } from "../Tre.Libraries/Tre.FileSystem/util.js";
function localization(locate_data: string): string {
    let language_json: any = readjson(process.cwd() + "/Tre.Extension/Tre.Settings/localization/" + (readjson(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json") as any).language + ".json");
    return language_json[locate_data];
}
export default localization;