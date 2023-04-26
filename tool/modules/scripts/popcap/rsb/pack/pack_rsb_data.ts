"use strict";
import pack_rsg_info from "./pack_rsg_info.js";
import finish_rsb from "./finish_rsb.js";
import get_ptx_info from "./get_ptx_info.js";
import headrsb_calculator from "./headrsb_calculator.js";
import concat_item_namepath from "./concat_item_namepath.js";
import SortRSGList from "./sort_rsg_items.js";
import { SmartBuffer } from "smart-buffer";

export default async function (
    rsb_path: string,
    pack_method: string,
    TreRSBInfo: any,
    RSB_composite_list: any,
    RSG_items_list: any,
    RSG_items_packet_list: any,
    RSG_file_data_list: any
) {
    let composite_index = 0;
    const composite_info = new SmartBuffer();
    const RSG_items_list_clone = RSG_items_list.slice();
    const composite_list_info = new Array();
    for (let composite_shell_name of RSB_composite_list) {
        for (let composite_offset in TreRSBInfo) {
            if (composite_shell_name === TreRSBInfo[composite_offset][0]) {
                let iz_composite_shell_folder = true;
                let write_offset_composite_item = 124;
                const new_composite_shell_item = SmartBuffer.fromBuffer(
                    Buffer.alloc(1156)
                );
                const rsg_sort_items = SortRSGList(
                    TreRSBInfo[composite_offset][1].slice()
                );
                const new_rsg_composite_folder = new Array();
                for (let item of rsg_sort_items) {
                    for (let rsg_offset in RSG_items_list_clone) {
                        if (
                            item === RSG_items_list_clone[rsg_offset].name_path
                        ) {
                            const res = parseInt(item.split("_").pop());
                            if (Number.isInteger(res)) {
                                iz_composite_shell_folder = false;
                                new_composite_shell_item
                                    .writeInt32LE(
                                        RSG_items_list_clone[rsg_offset]
                                            .composite_index,
                                        (write_offset_composite_item += 4)
                                    )
                                    .writeInt32LE(res);
                            } else {
                                new_composite_shell_item.writeInt32LE(
                                    RSG_items_list_clone[rsg_offset]
                                        .composite_index,
                                    (write_offset_composite_item += 4)
                                );
                            }
                            write_offset_composite_item += 12;
                            new_rsg_composite_folder.splice(
                                rsg_offset as any,
                                1
                            );
                            RSG_items_list_clone.splice(rsg_offset, 1);
                            break;
                        }
                    }
                }
                let composite_name = composite_shell_name;
                if (iz_composite_shell_folder) {
                    composite_name = composite_name + "_CompositeShell";
                }
                composite_list_info.push({
                    name_path: composite_name,
                    composite_index,
                });
                composite_index++;
                new_composite_shell_item
                    .writeString(composite_name, 0)
                    .writeInt32LE(rsg_sort_items.length, 1152);
                composite_info.writeBuffer(new_composite_shell_item.toBuffer());
                break;
            }
        }
    }
    const ptx_info = await get_ptx_info(RSG_items_packet_list[0]);
    RSG_items_packet_list[0].push({ name_path: "" });
    RSG_items_packet_list[0].sort(function (a: any, b: any) {
        if (
            (a.name_path.toUpperCase() as string) <
            (b.name_path.toUpperCase() as string)
        ) {
            return -1;
        }
        if (
            (a.name_path.toUpperCase() as string) >
            (b.name_path.toUpperCase() as string)
        ) {
            return 1;
        }
        return 0;
    });
    const file_list = await concat_item_namepath(RSG_items_packet_list[0]);
    RSG_items_list.push({ name_path: "" });
    RSG_items_list.sort(function (a: any, b: any) {
        if (a.name_path.toUpperCase() < b.name_path.toUpperCase()) {
            return -1;
        }
        if (a.name_path.toUpperCase() > b.name_path.toUpperCase()) {
            return 1;
        }
        return 0;
    });
    const rsg_list = await concat_item_namepath(RSG_items_list);
    composite_list_info.push({ name_path: "" });
    composite_list_info.sort(function (a: any, b: any) {
        if (a.name_path.toUpperCase() < b.name_path.toUpperCase()) {
            return -1;
        }
        if (a.name_path.toUpperCase() > b.name_path.toUpperCase()) {
            return 1;
        }
        return 0;
    });
    const composite_list = await concat_item_namepath(composite_list_info);
    const headrsb_info = await headrsb_calculator(
        RSG_items_packet_list[1].length,
        file_list.length,
        rsg_list.length,
        composite_list.length,
        composite_info.length,
        RSB_composite_list.length,
        ptx_info.length
    );
    const rsgfile_info = await pack_rsg_info(
        RSG_items_packet_list,
        headrsb_info[1] as any,
        rsb_path,
        pack_method,
        RSG_file_data_list
    );
    return await finish_rsb(
        headrsb_info,
        rsgfile_info,
        file_list,
        rsg_list,
        composite_info.toBuffer(),
        composite_list,
        ptx_info
    );
}
