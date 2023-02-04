"use strict";
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
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
                TreErrorMessage({error: "Cannot fix", system: `Element at index ${index} does not contain both 'id' and 'path' properties.`},`Element at index ${index} does not contain both 'id' and 'path' properties.`);
                return;
            }

            let idNum = item.id.split("").pop();
            let extNum = (item.path[item.path.length - 1]).split("").pop();

            let uppercase_id = item.id.toUpperCase();
            let lowercase_extension = (item.path[item.path.length - 1]).toLowerCase();
            if (arr[index].id !== uppercase_id) {
                TreErrorMessage({error: "Cannot fix", system: `${arr[index].id} is not fully Upper Case, will not fix`},`${arr[index].id} is not fully Upper Case, will not fix`);
                return;
            }
            if (arr[index].path[arr[index].path.length - 1] !== lowercase_extension) {
                TreErrorMessage({error: "Cannot fix", system: `${arr[index].path[arr[index].path.length - 1]} is not fully Lower Case, will not fix`},`${arr[index].path[arr[index].path.length - 1]} is not fully Lower Case, will not fix`);
                return;
            }
            if (idNum !== extNum) {
                arr[index].path[arr[index].path.length - 1] = arr[index].path[arr[index].path.length - 1].substring(0, arr[index].path[arr[index].path.length - 1].lastIndexOf("_") + 1) + idNum;
            }
        }
    });
    return arr;
}