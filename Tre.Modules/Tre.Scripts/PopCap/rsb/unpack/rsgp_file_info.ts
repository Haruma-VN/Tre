"use strict";
export default function (rsgp_head_offset: number, rsgp_list_data_info: any) {
    const rsgp_list_info = new Array();
    for (let i:number = 0; i < rsgp_list_data_info.length; i += 204) {
        const rsgp_list_item = rsgp_list_data_info.slice(i, i + 204);
        rsgp_list_info.push({rsgp_name_item: rsgp_list_item.slice(0, 128), 
            rsgp_item_offset: rsgp_head_offset, 
            rsgp_item_size: (rsgp_list_item.slice(164, 168).readUInt32LE() + rsgp_list_item.slice(168, 172).readUInt32LE()),
            rsgp_item_pool_index: rsgp_list_item.slice(136, 140).readUInt32LE(),
            rsgp_temp_info_fixing_rac_shuttle_obb: rsgp_list_item.slice(140, 188)
        });
        rsgp_head_offset += (rsgp_list_item.slice(164, 168).readUInt32LE() + rsgp_list_item.slice(168, 172).readUInt32LE());
    };
    return rsgp_list_info;
}