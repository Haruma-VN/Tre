"use strict";
import { parse } from '../../../Tre.Libraries/Tre.JSONSystem/util.js';
export default function (data) {
    var _a, _b, _c, _d, _e;
    data = (typeof data == "string") ? parse(data) : data;
    const Res_Duplicate = new Array();
    for (let i = 0; i < data.length; ++i) {
        if (data[i].slot != undefined) {
            for (let j = 0; j < data.length; j++) {
                if (data[j].slot != undefined) {
                    if (((_a = data[i]) === null || _a === void 0 ? void 0 : _a.path[(((_b = data[i]) === null || _b === void 0 ? void 0 : _b.path.length) - 1)]) === data[(((_c = data[j]) === null || _c === void 0 ? void 0 : _c.path.length) - 1)].path && ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.id) != ((_e = data[j]) === null || _e === void 0 ? void 0 : _e.id)) {
                        Res_Duplicate.push(data[i], data[j]);
                    }
                }
            }
        }
    }
    return Res_Duplicate;
}
