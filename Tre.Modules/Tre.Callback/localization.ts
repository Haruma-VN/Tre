import { readjson } from "../Tre.Libraries/Tre.FileSystem/util.js";
function localization(locate_data: string): string {
    let language_json: any = readjson("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/localization/" + readjson("C:/Tre.Vietnam/Tre.Extension/Tre.Settings/toolkit.json").language + ".json");
    return language_json[locate_data];
}
export default localization;