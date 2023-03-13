"use strict";
export default function (rsb_rsgp_name_path: any, info_offset: number, info_limit: number) {
    let name_path = "";
    let name_dict = new Array();
    let temp_offset = info_offset;
    const rsgp_name_path = new Array();
    while (temp_offset < info_limit) {
        const character_byte = rsb_rsgp_name_path.slice(temp_offset, temp_offset += 1);
        const temp_bytes = Buffer.concat([rsb_rsgp_name_path.slice(temp_offset, temp_offset += 3), Buffer.alloc(1)]).readInt32LE() * 4;
        const empty_bytes = rsb_rsgp_name_path.slice(temp_offset, temp_offset + 64);
        if (empty_bytes.toString('hex') != (('0' as any) * 64)) {
            if (character_byte == '\x00') {
                if (temp_bytes != 0) {
                    name_dict.push({ name_path, temp_bytes });
                }
                ;
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
        else {
            break;
        }
    }
    return rsgp_name_path;
}
