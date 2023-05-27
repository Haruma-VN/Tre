"use strict";
export default function file_list_split(file_list_b: Buffer): Array<{path: string, rsg_pool_index: number}> {
    const rsg_name_path: Array<{path: string, rsg_pool_index: number}> = [];
    let name_path: string = "";
    let fl_offset = 0;
    let name_temp: string | null = null;
    const name_dict: any = new Array();
    const offset_limit: number = file_list_b.byteLength;
    while (fl_offset < offset_limit) {
        const character_byte: string = file_list_b.slice(fl_offset, fl_offset += 1).toString('utf-8');
        const offset_byte: number = (Buffer.concat([file_list_b.slice(fl_offset, fl_offset += 3), Buffer.alloc(1)]).readUInt32LE()) * 4;
        if (character_byte === "\x00") {
            if (offset_byte !== 0) {
                name_dict.push({
                    name_path, offset_byte
                });
                name_path += character_byte;
            }
            const rsg_pool_index: number = file_list_b.readUInt32LE(fl_offset);
            if (name_temp !== name_path) {
                rsg_name_path.push({ path:name_path, rsg_pool_index });
                name_dict.forEach((value: any, index: number) => {
                    value.offset_byte < fl_offset ? name_dict.slice(index, index + 1) : (name_path = value.name_path);
                });
                name_temp = name_path;
            }
            fl_offset += 4
            
        }
        else {
            if (offset_byte !== 0) {
                name_dict.push({
                    name_path, offset_byte
                });
                name_path += character_byte;
            }
            else {
                name_path += character_byte;
            }
        }
    }
    return rsg_name_path;
}