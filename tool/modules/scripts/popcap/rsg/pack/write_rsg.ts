"use strict";
import { SmartBuffer } from "smart-buffer";
import beautify_offset from "./beautify_offset.js";
import compressor from "./compressor.js";
export default function write_rsg(rsg_file_data: any, rsg_smart_path: path_temp, rsg_head_version: number, compression_flags: number): Buffer {
    const atlas_res_group: any = new Array();
    const data_res_group: any = new Array();
    const smart_path_container: any = new SmartBuffer();
    let atlas_w_pos: number = 0;
    let data_w_pos: number = 0;
    for (let i = 0; i < rsg_smart_path.length; i++) {
        const str_b_temp: Buffer = Buffer.alloc((rsg_smart_path[i].path_slice.length * 4) + 4);
        for (let h = 0; h < rsg_smart_path[i].position.length; h++) {
            str_b_temp.writeUInt32LE((rsg_smart_path[i].position[h].w_position), Number((rsg_smart_path[i].position[h].offset * 4) + 1));
        }
        for (let k = 0; k < rsg_smart_path[i].path_slice.length; k++) {
            str_b_temp.writeUint8(rsg_smart_path[i].path_slice.charCodeAt(k), Number(k * 4));
        }
        if (rsg_smart_path[i].is_atlas) {
            atlas_res_group.push(rsg_file_data[rsg_smart_path[i].packet_index].item_data);
            
            const append_b: number = beautify_offset(rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength);
            if (append_b > 0) {
                atlas_res_group.push(Buffer.alloc(append_b));
            }
            smart_path_container.writeBuffer(str_b_temp).writeUInt32LE(1).writeUInt32LE(data_w_pos).writeUInt32LE(rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength)
            .writeInt32LE(rsg_file_data[rsg_smart_path[i].packet_index].ptx_info.id).writeBigUInt64LE(0n)
            .writeInt32LE(rsg_file_data[rsg_smart_path[i].packet_index].ptx_info.width).writeInt32LE(rsg_file_data[rsg_smart_path[i].packet_index].ptx_info.height);
            atlas_w_pos += (rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength + append_b);
        }
        else {
            data_res_group.push(rsg_file_data[rsg_smart_path[i].packet_index].item_data);
            const append_b: number = beautify_offset(rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength);
            if (append_b > 0) {
                data_res_group.push(Buffer.alloc(append_b));
            }
            smart_path_container.writeBuffer(str_b_temp).writeUInt32LE(0).writeUInt32LE(data_w_pos).writeUInt32LE(rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength);
            data_w_pos += (rsg_file_data[rsg_smart_path[i].packet_index].item_data.byteLength + append_b);
        }
    };
    let file_list_length = smart_path_container.length;
    smart_path_container.writeBuffer(Buffer.alloc(beautify_offset(file_list_length + 92)));
    const compression_data: {
        atlas_res_group: Array<Buffer>;
        data_res_group: Array<Buffer>;
        atlas_g_before_compressed: number;
        atlas_g_after_compressed: number;
        data_g_before_compressed: number;
        data_g_after_compressed: number;
     } = compressor(Buffer.concat(atlas_res_group), Buffer.concat(data_res_group), compression_flags);
     let w_item_pos: number = 0;
     const rsg_head_info: any = new SmartBuffer();
     rsg_head_info.writeString("pgsr").writeUInt32LE(rsg_head_version).writeBigUInt64LE(0n).writeUInt32LE(compression_flags).writeUInt32LE((w_item_pos += (smart_path_container.length + 92)))
     .writeUInt32LE(w_item_pos).writeUInt32LE(compression_data.data_g_after_compressed).writeUInt32LE(compression_data.data_g_before_compressed).writeUInt32LE(0)
     .writeUInt32LE((w_item_pos += compression_data.data_g_after_compressed)).writeUInt32LE(compression_data.atlas_g_after_compressed).writeUInt32LE(compression_data.atlas_g_before_compressed)
     .writeBigUInt64LE(0n).writeBigUInt64LE(0n).writeUInt32LE(0).writeUInt32LE(file_list_length).writeUInt32LE(92).writeBigUInt64LE(0n).writeUInt32LE(0);
     const packet_data: Buffer = Buffer.concat([
        rsg_head_info.toBuffer(), smart_path_container.toBuffer(), ...compression_data.data_res_group, ...compression_data.atlas_res_group
     ]);
    return packet_data;
}