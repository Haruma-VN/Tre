"use strict";

import localization from "../../../Tre.Callback/localization.js";

type ResInfo = {
    path: string[],
    id: string,
    atlas?: boolean,
    ax?: number,
    ay?: number,
    ah?: number,
    aw?: number,
    x?: number | undefined,
    y?: number | undefined,
    cols?: number,
    parent?: string,
}
export default function repairExtension(arr: ResInfo[]): ResInfo[] {
    arr.forEach((item, index) => {
        if (arr[index].atlas != undefined) {
            return;
        } else {
            if (!item.hasOwnProperty('id') || !item.hasOwnProperty('path')) {
                throw new Error(`${localization("element_at")} ${index} ${localization("not_contain_path_and_id_property")}`);
            }

            let idNum = item.id.split("").pop();
            let extNum = (item.path[item.path.length - 1]).split("").pop();

            let uppercase_id = item.id.toUpperCase();
            let lowercase_extension = (item.path[item.path.length - 1]).toLowerCase();
            if (arr[index].id !== uppercase_id) {
                throw new Error(`${arr[index].id} ${localization("not_fully_uppercase")}`);
            }
            if (arr[index].path[arr[index].path.length - 1] !== lowercase_extension) {
                throw new Error(`${arr[index].path[arr[index].path.length - 1]} ${localization("not_fully_uppercase")}`);
            }
            if (idNum !== extNum) {
                arr[index].path[arr[index].path.length - 1] = arr[index].path[arr[index].path.length - 1].substring(0, arr[index].path[arr[index].path.length - 1].lastIndexOf("_") + 1) + idNum;
            }
        }
    });
    return arr;
}