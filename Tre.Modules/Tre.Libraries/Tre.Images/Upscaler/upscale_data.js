"use strict";
import stringify from "../../Tre.JSONSystem/stringify.js";
export default function (ratio = 2, data) {
    for (let i = 0; i < (data === null || data === void 0 ? void 0 : data.groups.length); ++i) {
        if (data.groups[i].path != undefined) {
            for (let j in data.groups[i].path) {
                if (parseInt(data.groups[i].path[j]) != undefined) {
                    data.groups[i].path[j] = (parseInt(data.groups[i].path[j]) * ratio).toString();
                }
            }
        }
    }
    return stringify(data);
}
