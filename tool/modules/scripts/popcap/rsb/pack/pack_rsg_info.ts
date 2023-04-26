"use strict";
import { SmartBuffer } from "smart-buffer";
import { parse } from "node:path";
import fs_js from "../../../../library/fs/implement.js";
export default async function (
    RSG_items_packet_list: any[],
    headlength: number,
    rsb_path: string,
    pack_method: string,
    RSG_file_data_list: any[]
) {
    const rsg_data_info_list = RSG_items_packet_list[1];
    const rsb_rsg_filedata = new Array();
    const rsg_data_info = new SmartBuffer();
    const autopool_info = new SmartBuffer();
    let ptx_before_number = 0;
    function GetDataRSG(file_data: Buffer, rsg_info: any) {
        const rsg_item_info = SmartBuffer.fromBuffer(Buffer.alloc(204));
        const autopool_item_info = SmartBuffer.fromBuffer(Buffer.alloc(152));
        const part0_Offset = file_data.slice(24, 28).readInt32LE();
        const part0_Size = file_data.slice(32, 36).readInt32LE();
        const part1_Size = file_data.slice(48, 52).readInt32LE();
        if (rsg_info.ptx_number !== 0) {
            autopool_item_info.writeString(
                `${parse(rsg_info.rsg_name).name}${"_AutoPool"}`
            );
            autopool_item_info.writeInt32LE(part0_Offset, 128);
            autopool_item_info.writeInt32LE(part1_Size);
            autopool_item_info.writeInt32LE(1);
        } else {
            autopool_item_info.writeString(
                `${parse(rsg_info.rsg_name).name}${"_AutoPool"}`
            );
            autopool_item_info.writeInt32LE(part0_Size + part0_Offset, 128);
            autopool_item_info.writeInt32LE(0);
            autopool_item_info.writeInt32LE(1);
        }
        const rsg_head_data = file_data.slice(16, 64);
        rsg_item_info.writeString(parse(rsg_info.rsg_name).name);
        rsg_item_info.writeInt32LE(headlength, 128);
        rsg_item_info.writeInt32LE(file_data.length, 132);
        rsg_item_info.writeInt32LE(rsg_info.composite_index);
        rsg_item_info.writeBuffer(rsg_head_data);
        rsg_item_info.writeInt32LE(part0_Size, 160);
        rsg_item_info.writeInt32LE(rsg_info.ptx_number, 196);
        rsg_item_info.writeInt32LE(ptx_before_number, 200);
        ptx_before_number += rsg_info.ptx_number;
        headlength += file_data.length;
        rsg_data_info.writeBuffer(rsg_item_info.toBuffer());
        autopool_info.writeBuffer(autopool_item_info.toBuffer());
    }
    for (let i = 0; i < rsg_data_info_list.length; i++) {
        let file_data: any;
        if (pack_method === "simple") {
            if (rsg_data_info_list[i].rsg_name.toUpperCase() === "PACKAGES") {
                file_data = RSG_items_packet_list[2][0];
            } else if (
                rsg_data_info_list[i].rsg_name
                    .toUpperCase()
                    .indexOf("__MANIFESTGROUP__") !== -1
            ) {
                file_data = RSG_items_packet_list[2][1];
            } else {
                file_data = fs_js.read_file(
                    `${rsb_path}/Packet/${rsg_data_info_list[i].rsg_name}.rsg`,
                    "buffer"
                );
            }
        } else if (pack_method === "everything") {
            for (let h = 0; h < RSG_file_data_list.length; h++) {
                if (
                    RSG_file_data_list[h].rsg_name.toUpperCase() ===
                    rsg_data_info_list[i].rsg_name.toUpperCase()
                ) {
                    file_data = RSG_file_data_list[h].rsg_data;
                    RSG_file_data_list.splice(h, 1);
                    break;
                }
            }
        } else {
            file_data = fs_js.read_file(
                `${rsb_path}/Packet/${rsg_data_info_list[i].rsg_name}.rsg`,
                "buffer"
            );
        }
        rsb_rsg_filedata.push(file_data);
        await GetDataRSG(file_data, rsg_data_info_list[i]);
    }
    return [
        rsg_data_info.toBuffer(),
        autopool_info.toBuffer(),
        rsb_rsg_filedata,
    ];
}
