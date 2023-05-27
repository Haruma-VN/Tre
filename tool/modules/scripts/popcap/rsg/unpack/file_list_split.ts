"use strict";
export default function file_list_split(rsg_b: Buffer): { part_0_list: Array<any>; part_1_list: Array<any> }  {
    const part_0_list: Array<{path: string, offset: number, size: number}> = [];
    const part_1_list: Array<{path: string, offset: number, size: number, id: number, width: number, height: number}> = [];
    let name_path: string = "";
    let fl_offset = 0;
    const name_dict: any = new Array();
    const offset_limit: number = rsg_b.byteLength;
    while (fl_offset < offset_limit) {
        const character_byte: string = rsg_b.slice(fl_offset, fl_offset += 1).toString('utf-8');
        const offset_byte: number = (Buffer.concat([rsg_b.slice(fl_offset, fl_offset += 3), Buffer.alloc(1)]).readUInt32LE()) * 4;
        if (character_byte === "\x00") {
            if (offset_byte !== 0) {
                name_dict.push({
                    name_path, offset_byte
                });
                name_path += character_byte;
            }
            const type_byte: number = rsg_b.readUInt8(fl_offset);
            if (type_byte) {
                part_1_list.push({
                    path: name_path,
                    offset: rsg_b.readUInt32LE(fl_offset += 4),
                    size: rsg_b.readUInt32LE(fl_offset += 4),
                    id: rsg_b.readUInt32LE(fl_offset += 12),
                    width: rsg_b.readUInt32LE(fl_offset += 4),
                    height: rsg_b.readUInt32LE(fl_offset += 4)
                });
            }
            else {
                part_0_list.push({
                    path: name_path,
                    offset: rsg_b.readUInt32LE(fl_offset += 4),
                    size: rsg_b.readUInt32LE(fl_offset += 4)
                });
            }
            fl_offset += 4;
            name_dict.forEach((value: any, index: number) => {
                value.offset_byte < fl_offset ? name_dict.slice(index, index + 1) : (name_path = value.name_path);
            });
            
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
    return {part_0_list, part_1_list};
}