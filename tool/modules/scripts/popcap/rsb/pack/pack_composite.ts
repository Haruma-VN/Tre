"use strict";
import { SmartBuffer } from "smart-buffer";
import sort_rsg_composite_index from "./sort_rsg_composite_index.js";
import SortRSGList from "./sort_rsg_items.js";
export default async function (composite_folder: any, composite_index: number) {
    let iz_composite_shell_folder = true;
    let write_offset_composite_item = 124;
    const new_composite_shell_item = SmartBuffer.fromBuffer(Buffer.alloc(1156));
    const rsg_sort_items = SortRSGList(composite_folder[1].slice());
    const new_rsg_composite_folder = new Array();
    for (let item of rsg_sort_items) {
        for (let rsg_offset in new_rsg_composite_folder) {
            if (item === new_rsg_composite_folder[rsg_offset].rsg_name) {
                const res = parseInt(item.split("_").pop());
                if (Number.isInteger(res)) {
                    iz_composite_shell_folder = false;
                    new_composite_shell_item
                        .writeInt32LE(
                            new_rsg_composite_folder[rsg_offset]
                                .composite_index,
                            (write_offset_composite_item += 4)
                        )
                        .writeInt32LE(res);
                    write_offset_composite_item += 12;
                } else {
                    new_composite_shell_item.writeInt32LE(
                        new_rsg_composite_folder[rsg_offset].composite_index,
                        (write_offset_composite_item += 4)
                    );
                    write_offset_composite_item += 12;
                }
                new_rsg_composite_folder.splice(rsg_offset as any, 1);
            }
        }
    }
    let composite_list_name = composite_folder[0];
    if (iz_composite_shell_folder) {
        composite_list_name = composite_list_name + "_CompositeShell";
    }
    new_composite_shell_item
        .writeString(composite_list_name, 0)
        .writeInt32LE(rsg_sort_items.length, 1152);
    return [new_composite_shell_item.toBuffer(), composite_index];
}
