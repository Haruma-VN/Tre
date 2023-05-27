"use strict";

import localization from "../../../../callback/localization.js";
import { EncodingError } from "../../../../implement/error.js";

export default function concat_smart_path(rsg_path_temp: rsg_path_info): path_temp {
    const rsg_path_info: rsg_path_info = [
        { path: "", manifest_index: -1, packet_index: -1, ptx_info: null },
        ...rsg_path_temp,
    ].sort((a, b) => a.path.localeCompare(b.path));
    const path_temp: path_temp = new Array();
    let w_position: number = 0;
    for (let i = 0; i < rsg_path_info.length - 1; i++) {
        const path_1: string = rsg_path_info[i].path;
        const path_2: string = rsg_path_info[Number(i + 1)].path;
        if (path_2.length !== Buffer.byteLength(path_2)) {
            throw new EncodingError(localization("item_path_must_be_ascii") + " | " + path_2, "undefined");
        }
        const str_longest_length: number = path_1.length >= path_2.length ? path_1.length : path_2.length;
        for (let k = 0; k < str_longest_length; k++) {
            if (path_1.charAt(k) !== path_2.charAt(k)) {
                for (let h = path_temp.length; h > 0; h--) {
                    if (k >= path_temp[h - 1].key) {
                        path_temp[h - 1].position.push({
                            w_position,
                            offset: k - path_temp[h - 1].key,
                        });
                        break;
                    }
                }
                w_position += path_2.includes(".PTX") ? path_2.length - k + 9 : path_2.length - k + 4;
                path_temp.push({
                    path_slice: path_2.slice(k),
                    key: k,
                    packet_index: rsg_path_info[i + 1].packet_index,
                    is_atlas: path_2.includes(".PTX") ? true : false,
                    position: [],
                });
                break;
            }
        }
    }
    return path_temp;
}
