"use strict";
export default function (
    rsgp_head_offset: any,
    rsb_buffer_for_unpacking: Buffer,
    rsgp_list_data_info: Buffer
) {
    const rsgp_list_info = new Array();
    const rsb_buffer_length = rsb_buffer_for_unpacking.length;
    const begin_offset = rsgp_list_data_info.slice(128, 132).readUInt32LE();
    if (begin_offset !== rsgp_head_offset) {
        rsgp_head_offset = 0;
    }
    for (let i = 0; i < rsgp_list_data_info.length; i += 204) {
        const rsgp_list_item = rsgp_list_data_info.slice(i, i + 204);
        const rsgp_size_length_1 = rsgp_list_item
            .slice(164, 168)
            .readUInt32LE();
        const rsgp_size_length_2 = rsgp_list_item
            .slice(168, 172)
            .readUInt32LE();
        const rsgp_item_size = rsgp_size_length_1 + rsgp_size_length_2;
        if (rsgp_head_offset >= rsb_buffer_length - 4) {
            rsgp_head_offset = 0;
        }
        if (
            rsb_buffer_for_unpacking
                .slice(rsgp_head_offset + 76, rsgp_head_offset + 80)
                .readUInt32LE() !== 92
        ) {
            rsgp_head_offset = rsgp_list_item.slice(128, 132).readUInt32LE();
            if (rsgp_head_offset >= rsb_buffer_length - 4) {
                rsgp_head_offset = 0;
            }
            if (
                rsb_buffer_for_unpacking
                    .slice(rsgp_head_offset + 76, rsgp_head_offset + 80)
                    .readUInt32LE() === 92
            ) {
                RsgpList();
            }
        } else {
            RsgpList();
        }
        function RsgpList() {
            rsgp_list_info.push({
                rsgp_name_item: rsgp_list_item.slice(0, 128),
                rsgp_item_offset: rsgp_head_offset,
                rsgp_item_size,
                rsgp_item_pool_index: rsgp_list_item
                    .slice(136, 140)
                    .readUInt32LE(),
                rsgp_temp_info_fixing_rac_rsb: rsgp_list_item.slice(140, 188),
            });
            rsgp_head_offset += rsgp_item_size;
        }
    }
    return rsgp_list_info;
}
