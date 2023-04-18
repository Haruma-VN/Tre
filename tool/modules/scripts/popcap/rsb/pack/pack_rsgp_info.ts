"use strict";
import { SmartBuffer } from "smart-buffer";
import { parse } from "node:path";
import * as fs_util from "../../../../library/fs/util.js";
export default async function (
    RSGP_items_packet_list: any[],
    headlength: number,
    rsb_path: string,
    pack_method: string,
    RSGP_file_data_list: any[]
) {
    const rsgp_data_info_list = RSGP_items_packet_list[1];
    const rsb_rsgp_filedata = new Array();
    const rsgp_data_info = new SmartBuffer();
    const autopool_info = new SmartBuffer();
    let ptx_before_number = 0;
    function GetDataRSGP(file_data: Buffer, rsgp_info: any) {
        const rsgp_item_info = SmartBuffer.fromBuffer(Buffer.alloc(204));
        const autopool_item_info = SmartBuffer.fromBuffer(Buffer.alloc(152));
        const part0_Offset = file_data.slice(24, 28).readInt32LE();
        const part0_Size = file_data.slice(32, 36).readInt32LE();
        const part1_Size = file_data.slice(48, 52).readInt32LE();
        if (rsgp_info.ptx_number !== 0) {
            autopool_item_info.writeString(
                `${parse(rsgp_info.rsgp_name).name}${"_AutoPool"}`
            );
            autopool_item_info.writeInt32LE(part0_Offset, 128);
            autopool_item_info.writeInt32LE(part1_Size);
            autopool_item_info.writeInt32LE(1);
        } else {
            autopool_item_info.writeString(
                `${parse(rsgp_info.rsgp_name).name}${"_AutoPool"}`
            );
            autopool_item_info.writeInt32LE(part0_Size + part0_Offset, 128);
            autopool_item_info.writeInt32LE(0);
            autopool_item_info.writeInt32LE(1);
        }
        const rsgp_head_data = file_data.slice(16, 64);
        rsgp_item_info.writeString(parse(rsgp_info.rsgp_name).name);
        rsgp_item_info.writeInt32LE(headlength, 128);
        rsgp_item_info.writeInt32LE(file_data.length, 132);
        rsgp_item_info.writeInt32LE(rsgp_info.composite_index);
        rsgp_item_info.writeBuffer(rsgp_head_data);
        rsgp_item_info.writeInt32LE(part0_Size, 160);
        rsgp_item_info.writeInt32LE(rsgp_info.ptx_number, 196);
        rsgp_item_info.writeInt32LE(ptx_before_number, 200);
        ptx_before_number += rsgp_info.ptx_number;
        headlength += file_data.length;
        rsgp_data_info.writeBuffer(rsgp_item_info.toBuffer());
        autopool_info.writeBuffer(autopool_item_info.toBuffer());
    }
    for (let i = 0; i < rsgp_data_info_list.length; i++) {
        let file_data: any;
        if (pack_method === "simple") {
            if (rsgp_data_info_list[i].rsgp_name.toUpperCase() === "PACKAGES") {
                file_data = RSGP_items_packet_list[2][0];
            } else if (
                rsgp_data_info_list[i].rsgp_name
                    .toUpperCase()
                    .indexOf("__MANIFESTGROUP__") !== -1
            ) {
                file_data = RSGP_items_packet_list[2][1];
            } else {
                file_data = fs_util.readfilebuffer(
                    `${rsb_path}/Packet/${rsgp_data_info_list[i].rsgp_name}.rsgp`
                );
            }
        } else if (pack_method === "everything") {
            for (let h = 0; h < RSGP_file_data_list.length; h++) {
                if (
                    RSGP_file_data_list[h].rsgp_name.toUpperCase() ===
                    rsgp_data_info_list[i].rsgp_name.toUpperCase()
                ) {
                    file_data = RSGP_file_data_list[h].rsgp_data;
                    RSGP_file_data_list.splice(h, 1);
                    break;
                }
            }
        } else {
            file_data = fs_util.readfilebuffer(
                `${rsb_path}/Packet/${rsgp_data_info_list[i].rsgp_name}.rsgp`
            );
        }
        rsb_rsgp_filedata.push(file_data);
        await GetDataRSGP(file_data, rsgp_data_info_list[i]);
    }
    return [
        rsgp_data_info.toBuffer(),
        autopool_info.toBuffer(),
        rsb_rsgp_filedata,
    ];
}
