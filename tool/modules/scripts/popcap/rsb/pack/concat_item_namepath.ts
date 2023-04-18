"use strict";
import { SmartBuffer } from "smart-buffer";
export default async function (filepath: any) {
    function ConvertPathBuffer(path: string) {
        let itempath: SmartBuffer = SmartBuffer.fromOptions({
            size: path.length,
        });
        for (let char of path + "\0") {
            itempath.writeString(char + "\0\0\0");
        }
        return itempath;
    }
    const path_temp: any[] = new Array();
    let position: number = 0;
    for (let i: number = 0; i < filepath.length - 1; i++) {
        const path_orignal: string = filepath[i].name_path.toUpperCase();
        const path_compare = await ConvertPathBuffer(
            filepath[i + 1].name_path.toUpperCase()
        );
        const path_length =
            path_orignal.length > path_compare.length
                ? path_orignal.length
                : path_compare.length / 4;
        for (let k: number = 0; k < path_length; k++) {
            if (
                filepath[i].name_path.toUpperCase()[k] !==
                filepath[i + 1].name_path.toUpperCase()[k]
            ) {
                for (let h = path_temp.length - 1; h >= 0; h--) {
                    if (k >= path_temp[h].key) {
                        const int32 = SmartBuffer.fromBuffer(
                            Buffer.alloc(4)
                        ).writeInt32LE(position);
                        path_temp[h].path_compare.writeBuffer(
                            int32.toBuffer().slice(0, 3),
                            k * 4 + 1
                        );
                        break;
                    }
                }
                position += filepath[i + 1].name_path.length - k + 2;
                path_temp.push({ path_compare, key: k });
                break;
            }
        }
    }
    const rsgp_path_info: SmartBuffer = new SmartBuffer();
    for (let i: number = 0; i < filepath.length - 1; i++) {
        const path_orignal: string = filepath[i].name_path.toUpperCase();
        const path_compare: string = filepath[i + 1].name_path.toUpperCase();
        const path_length: number =
            path_orignal.length > path_compare.length
                ? path_orignal.length
                : path_compare.length;
        for (let k: number = 0; k < path_length; k++) {
            if (path_orignal[k] !== path_compare[k]) {
                rsgp_path_info.writeBuffer(
                    path_temp[i].path_compare.toBuffer().slice(k * 4)
                );
                rsgp_path_info.writeInt32LE(filepath[i + 1].composite_index);
                break;
            }
        }
    }
    return rsgp_path_info.toBuffer();
}
