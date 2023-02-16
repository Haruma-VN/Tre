"use strict";
import { SmartBuffer } from 'smart-buffer';
import { parse } from 'node:path';
export interface NameArray {
    name?: string,
    key?: number
}
export default async function (RSGP_data: any, pool_index: number, rsgp_file: string, ptx_before_number: number): Promise<Array<number>> {
    const file_data: SmartBuffer = SmartBuffer.fromBuffer(RSGP_data);
    const part0_Offset: number = file_data.readInt32LE(24);
    const part0_Size: number = file_data.readInt32LE(32);
    const part1_Size: number = file_data.readInt32LE(48);
    const info_size: number = file_data.readInt32LE(72);
    const info_offset: number = file_data.readInt32LE(76);
    const info_limit: number = info_size + info_offset;
    const rsgp_data: Buffer = file_data.toBuffer().slice(16, 64);
    let rsgp_data_list: any[] = new Array();
    let rsgp_unpacked: any[] = new Array();
    let autopool_buffer: SmartBuffer = SmartBuffer.fromBuffer(Buffer.alloc(152));
    let rsgp_info_buffer: SmartBuffer = SmartBuffer.fromBuffer(Buffer.alloc(204));
    let ptx_number: number = 0;
    function Decompression(image: boolean, temp_offset: number, name_path: string): void {
        const file_data_size = file_data.toBuffer().slice(temp_offset - 4, temp_offset).readInt32LE();
        if (image) {
            const image_width = file_data.toBuffer().slice(temp_offset + 12, temp_offset + 16).readInt32LE();
            const image_height = file_data.toBuffer().slice(temp_offset + 16, temp_offset + 20).readInt32LE();
            let atlas_json: { Name?: string; Width?: number, Height?: number, Fmt?: number, Number?: number } = new Object();
            atlas_json.Name = name_path;
            atlas_json.Width = image_width;
            atlas_json.Height = image_height;
            switch (file_data_size / (image_width * image_height)) {
                case 4:
                    atlas_json.Fmt = 0;
                    break;
                case 1.5:
                    atlas_json.Fmt = 147;
                    break;
                case 0.5:
                    atlas_json.Fmt = 30;
                    break;
            };
            atlas_json.Number = pool_index;
            rsgp_unpacked.push(atlas_json);
            ptx_number++
        }
        else {
            let rsgp_json: { Name?: string; Number?: number } = new Object();
            rsgp_json.Name = name_path;
            rsgp_json.Number = pool_index;
            rsgp_unpacked.push(rsgp_json);
        }
    }
    function GetSmartPath(image: boolean, temp_offset: number): void {
        let name_path: string = "";
        let name_dict: NameArray[] = new Array();
        while (temp_offset < info_limit) {
            let character_byte = file_data.toBuffer().slice(temp_offset, temp_offset + 1);
            let temp_bytes = Buffer.from(file_data.toBuffer().slice(temp_offset + 1, temp_offset + 4).toString('hex') + '00', 'hex').readInt32LE() * 4;
            if (parseInt(character_byte.toString('hex'), 16) != 0) {
                if (temp_bytes != 0) {
                    let name_array: NameArray = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                    name_path += character_byte.toString();
                    temp_offset += 4;
                }
                else {
                    name_path += character_byte.toString();
                    temp_offset += 4;
                };
            }
            else if (parseInt(character_byte.toString('hex'), 16) == 0) {
                if (temp_bytes != 0) {
                    let name_array: NameArray = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                };
                image === true ? Decompression(true, temp_offset += 16, name_path, temp_offset += 20) : Decompression(false, temp_offset += 16, name_path);
                name_dict.forEach((value, index) => {
                    if (value.key != undefined) {
                        if (name_path != undefined) {
                            value.key + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name;
                            name_path = name_path?.toString();
                        }
                    }
                });
            }
        }
    };

    function GetDataForGame(image: boolean): void {
        if (image == true) {
            autopool_buffer.writeString(`${parse(rsgp_file).name}${'_AutoPool'}`);
            autopool_buffer.writeInt32LE(part0_Offset, 128);
            autopool_buffer.writeInt32LE(part1_Size);
            autopool_buffer.writeInt32LE(1);
        }
        else {
            autopool_buffer.writeString(`${parse(rsgp_file).name}${'_AutoPool'}`);
            autopool_buffer.writeInt32LE(part0_Size + part0_Offset, 128);
            autopool_buffer.writeInt32LE(0);
            autopool_buffer.writeInt32LE(1);
        };
        rsgp_info_buffer.writeString(parse(rsgp_file).name);
        rsgp_info_buffer.writeInt32LE(file_data.length, 132);
        rsgp_info_buffer.writeInt32LE(pool_index);
        rsgp_info_buffer.writeBuffer(rsgp_data);
        rsgp_info_buffer.writeInt32LE(part0_Size, 160);
        rsgp_info_buffer.writeInt32LE(ptx_number, 196);
        rsgp_info_buffer.writeInt32LE(ptx_before_number, 200);
        ptx_before_number += ptx_number;
    }
    if (part1_Size !== 0) {
        await GetSmartPath(true, info_offset);
        await GetDataForGame(true);
    }
    else {
        await GetSmartPath(false, info_offset);
        await GetDataForGame(false);
    };
    rsgp_data_list.push(rsgp_unpacked);
    rsgp_data_list.push(autopool_buffer.toBuffer());
    rsgp_data_list.push(rsgp_info_buffer.toBuffer());
    rsgp_data_list.push(ptx_before_number);
    return rsgp_data_list;
}
