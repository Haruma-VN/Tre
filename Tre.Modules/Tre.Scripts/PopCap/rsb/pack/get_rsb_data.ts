"use strict";
import get_rsgp_data from './get_rsgp_data.js';
import get_ptx_info from './get_ptx_info.js';
import get_composite_info from './get_composite_info.js';
import { readfilebuffer } from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import { SmartBuffer } from 'smart-buffer';
import { TreErrorMessage } from '../../../../Tre.Debug/Tre.ErrorSystem.js';
export type rsgp_data = {
    Name?: string;
    Number?: number;
}
export interface CompositeShell {
    Number?: number,
    Name?: string,
}
export type ConcatTemp = {
    info_temp?: string;
    temp?: SmartBuffer;
    key?: number;
}
export default async function (RSB_composite_files: string[], TreRSBInfo: any[], rsb_path: string, pool_index: number, composite_pool_index: number): Promise<ArrayBuffer | void> {
    let rsgp_unpacked: any[] = new Array();
    let rsgp_list: any[] = new Array();
    let composite_list: any[] = new Array();
    let AutoPool_Info: SmartBuffer = new SmartBuffer();
    let RSGP_Data_Info: SmartBuffer = new SmartBuffer();
    let RSB_RSGP_Data: SmartBuffer = new SmartBuffer();
    let ptx_before_number: number = 0;
    for (let composite_file of RSB_composite_files) {
        for (let composite_folder of TreRSBInfo) {
            if (composite_folder[0] === composite_file) {
                let composite_shell = true;
                for (let rsgp_item of composite_folder[1]) {
                    try {
                        let rsgp_file_data: rsgp_data = new Object();
                        rsgp_file_data.Name = rsgp_item;
                        rsgp_file_data.Number = pool_index;
                        rsgp_list.push(rsgp_file_data);
                        const rsgp_data_info: any = readfilebuffer(`${rsb_path}/Packet/${rsgp_item}.rsgp`);
                        const rsgp_data_list: any = await get_rsgp_data(rsgp_data_info, pool_index, rsgp_item, ptx_before_number);
                        const rsgp_file: Array<number> = rsgp_data_list[0];
                        ptx_before_number = rsgp_data_list[3];
                        RSB_RSGP_Data.writeBuffer(rsgp_data_info);
                        RSGP_Data_Info.writeBuffer(rsgp_data_list[2]);
                        AutoPool_Info.writeBuffer(rsgp_data_list[1]);
                        rsgp_file.forEach(file => {
                            rsgp_unpacked.push(file);
                        });
                    } catch (error: any) {
                        TreErrorMessage({ error: "Can't open " + rsgp_item, reason: "Can't open " + rsgp_item, system: error.message.toString() }, "Can't open " + rsgp_item);
                        return;
                    }
                    if (rsgp_item.indexOf('_1536') !== -1 || rsgp_item.indexOf('_768') !== -1 || rsgp_item.indexOf('_384') !== -1 || rsgp_item.indexOf('_1200') !== -1 || rsgp_item.toUpperCase().indexOf('_COMMON') !== -1) {
                        composite_shell = false;
                    }
                    pool_index++;
                };
                let composite_file_data: CompositeShell = new Object();
                composite_shell !== true ? composite_file_data.Name = composite_file : composite_file_data.Name = `${composite_file}_CompositeShell`;
                composite_file_data.Number = composite_pool_index;
                composite_list.push(composite_file_data);
                composite_pool_index++;
            };
        };
    };
    function ConcatRSGP_ItemsPath(info_paths: any[], folder_length: number, key_count: number, pos: number, pos_2: number): Buffer {
        let info_array: any[] = new Array();
        for (let i: number = 0; i < info_paths.length - 1; i++) {
            let info_temp: ConcatTemp = new Object();
            const folder_1: string = info_paths[i].Name.toUpperCase();
            const folder_2: string = info_paths[i + 1].Name.toUpperCase();
            let packet: SmartBuffer = SmartBuffer.fromOptions({ size: folder_2.length });
            packet.writeString(folder_2.toUpperCase() + ' ');
            for (let k: number = 1; k < folder_2.length * 4; k = k + 4) {
                packet.insertBuffer(Buffer.alloc(3), k);
            };
            packet.writeBuffer(Buffer.alloc(4));
            info_temp.temp = packet;
            folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length;
            for (let j: number = 0; j < folder_length; j++) {
                if (folder_1[j] !== folder_2[j]) {
                    info_temp.key = j;
                    for (let m: number = info_array.length - 1; m >= 0; m--) {
                        if (j >= info_array[m].key) {
                            let int32le: any = Buffer.alloc(4);
                            int32le.writeInt32LE('0x' + pos.toString(16));
                            info_array[m].temp.writeBuffer(int32le.slice(0, 3), j * 4 + 1);
                            break;
                        }
                    }
                    key_count = j;
                    pos += (folder_2.length - j) + 2;
                    info_array.push(info_temp);
                    break;
                }
            }
        };
        let rsgp_info: SmartBuffer = SmartBuffer.fromBuffer(Buffer.alloc(64000));
        for (let h: number = 0; h < info_paths.length - 1; h++) {
            const folder_1: string = info_paths[h].Name.toUpperCase();
            const folder_2: string = info_paths[h + 1].Name.toUpperCase();
            folder_1.length > folder_2.length ? folder_length = folder_1.length : folder_length = folder_2.length;
            for (let j: number = 0; j < folder_length; j++) {
                if (folder_1[j] !== folder_2[j]) {
                    rsgp_info.writeBuffer(info_array[h].temp.toBuffer().slice(j * 4), pos_2);
                    pos_2 += ((folder_2.length - j) + 2) * 4;
                    rsgp_info.readInt16LE(pos_2 - 7) !== 0 ? rsgp_info.writeBuffer(Buffer.alloc(1), pos_2 - 8) : rsgp_info.writeInt32LE(0, pos_2 - 8);
                    rsgp_info.writeInt32LE(info_paths[h + 1].Number, pos_2 - 4);
                    break;
                }
            }
        };
        return rsgp_info.toBuffer();
    };
    const PTX_Info: Buffer = await get_ptx_info(rsgp_unpacked);
    rsgp_unpacked.push(JSON.parse('{"Name":""}'));
    rsgp_list.push(JSON.parse('{"Name":""}'));
    composite_list.push(JSON.parse('{"Name":""}'));
    rsgp_unpacked.sort(function (a, b) { if (a.Name.toUpperCase() < b.Name.toUpperCase()) { return -1; } if (a.Name.toUpperCase() > b.Name.toUpperCase()) { return 1; } return 0; });
    rsgp_list.sort(function (a, b) { if (a.Name.toUpperCase() < b.Name.toUpperCase()) { return -1; } if (a.Name.toUpperCase() > b.Name.toUpperCase()) { return 1; } return 0; });
    composite_list.sort(function (a, b) { if (a.Name.toUpperCase() < b.Name.toUpperCase()) { return -1; } if (a.Name.toUpperCase() > b.Name.toUpperCase()) { return 1; } return 0; });
    const FileList: Buffer = ConcatRSGP_ItemsPath(rsgp_unpacked, 0, 0, 0, 0);
    const RSGPList: Buffer = ConcatRSGP_ItemsPath(rsgp_list, 0, 0, 0, 0);
    const CompositeList: Buffer = ConcatRSGP_ItemsPath(composite_list, 0, 0, 0, 0);
    const CompositeInfo: any = await get_composite_info(RSB_composite_files.sort(), TreRSBInfo, 0);
    let RSB_Header_Data_Length: number = 112 + FileList.length + RSGPList.length + CompositeInfo.length + CompositeList.length + RSGP_Data_Info.length + AutoPool_Info.length + PTX_Info.length;
    let RSB_surplus = RSB_Header_Data_Length % 4096;
    RSB_surplus % 4096 !== 0 ? RSB_Header_Data_Length = RSB_Header_Data_Length + 4096 - RSB_surplus : {};
    let RSB_Header = new SmartBuffer();
    RSB_Header.writeString('1bsr');
    RSB_Header.writeInt32LE(4);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(RSB_Header_Data_Length);
    RSB_Header.writeInt32LE(FileList.length);
    RSB_Header.writeInt32LE(112);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(RSGPList.length);
    RSB_Header.writeInt32LE(112 + FileList.length);
    RSB_Header.writeInt32LE(pool_index);
    RSB_Header.writeInt32LE(112 + FileList.length + RSGPList.length + CompositeInfo.length + CompositeList.length);
    RSB_Header.writeInt32LE(204);
    RSB_Header.writeInt32LE(composite_pool_index);
    RSB_Header.writeInt32LE(112 + FileList.length + RSGPList.length);
    RSB_Header.writeInt32LE(1156);
    RSB_Header.writeInt32LE(CompositeList.length);
    RSB_Header.writeInt32LE(112 + FileList.length + RSGPList.length + CompositeInfo.length);
    RSB_Header.writeInt32LE(pool_index);
    RSB_Header.writeInt32LE(112 + FileList.length + RSGPList.length + CompositeInfo.length + CompositeList.length + RSGP_Data_Info.length);
    RSB_Header.writeInt32LE(152);
    RSB_Header.writeInt32LE(ptx_before_number);
    RSB_Header.writeInt32LE(112 + FileList.length + RSGPList.length + CompositeInfo.length + CompositeList.length + RSGP_Data_Info.length + AutoPool_Info.length);
    RSB_Header.writeInt32LE(16);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(0);
    RSB_Header.writeInt32LE(RSB_Header_Data_Length);
    let RSGP_file_offset = RSB_Header_Data_Length;
    for (let h: number = 128; h < RSGP_Data_Info.length; h = h + 204) {
        RSGP_Data_Info.writeInt32LE(RSGP_file_offset, h);
        RSGP_file_offset += RSGP_Data_Info.readInt32LE(h + 4)
    };
    let RSB_Finish: SmartBuffer = new SmartBuffer();
    RSB_Finish.writeBuffer(RSB_Header.toBuffer());
    RSB_Finish.writeBuffer(FileList);
    RSB_Finish.writeBuffer(RSGPList);
    RSB_Finish.writeBuffer(CompositeInfo);
    RSB_Finish.writeBuffer(CompositeList);
    RSB_Finish.writeBuffer(RSGP_Data_Info.toBuffer());
    RSB_Finish.writeBuffer(AutoPool_Info.toBuffer());
    RSB_Finish.writeBuffer(PTX_Info);
    RSB_Finish.writeBuffer(Buffer.alloc(4096 - RSB_surplus));
    RSB_Finish.writeBuffer(RSB_RSGP_Data.toBuffer());
    return RSB_Finish.toBuffer();
};