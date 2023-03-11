"use strict";
export default function (rsb_rsgp_name_path: any, info_offset: number, info_limit: number) {
    let name_path: string = "";
    let name_dict: any[] = new Array();
    let temp_offset: number = info_offset;
    const rsgp_name_path: any[] = new Array();
    while (temp_offset < info_limit) {
        const character_byte = rsb_rsgp_name_path.slice(temp_offset, temp_offset += 1);
        const temp_bytes = Buffer.concat([(rsb_rsgp_name_path.slice(temp_offset, temp_offset += 3) as any), Buffer.alloc(1)]).readInt32LE() * 4;
        if (character_byte == '\x00') {
            if (temp_bytes != 0) {
                name_dict.push({ name_path, temp_bytes });
            };
            const rsgp_pool_index = rsb_rsgp_name_path.slice(temp_offset, temp_offset += 4).readInt32LE();
            rsgp_name_path.push({ name_path, rsgp_pool_index });
            name_dict.forEach((value, index) => {
                value.temp_bytes + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name_path;
            });
        }
        else {
            if (temp_bytes != 0) {
                name_dict.push({ name_path, temp_bytes });
                name_path += character_byte;
            }
            else {
                name_path += character_byte;
            }
        }
    }
    return rsgp_name_path;
}