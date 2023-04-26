"use strict";
export default function (
    rsg_head_offset: any,
    rsb_buffer_for_unpacking: Buffer,
    rsg_list_data_info: Buffer
) {
    const rsg_list_info = new Array();
    const rsb_buffer_length = rsb_buffer_for_unpacking.length;
    const begin_offset = rsg_list_data_info.slice(128, 132).readUInt32LE();
    if (begin_offset !== rsg_head_offset) {
        rsg_head_offset = 0;
    }
    for (let i = 0; i < rsg_list_data_info.length; i += 204) {
        const rsg_list_item = rsg_list_data_info.slice(i, i + 204);
        const rsg_size_length_1 = rsg_list_item.slice(164, 168).readUInt32LE();
        const rsg_size_length_2 = rsg_list_item.slice(168, 172).readUInt32LE();
        const rsg_item_size = rsg_size_length_1 + rsg_size_length_2;
        if (rsg_head_offset >= rsb_buffer_length - 4) {
            rsg_head_offset = 0;
        }
        if (
            rsb_buffer_for_unpacking
                .slice(rsg_head_offset + 76, rsg_head_offset + 80)
                .readUInt32LE() !== 92
        ) {
            rsg_head_offset = rsg_list_item.slice(128, 132).readUInt32LE();
            if (rsg_head_offset >= rsb_buffer_length - 4) {
                rsg_head_offset = 0;
            }
            if (
                rsb_buffer_for_unpacking
                    .slice(rsg_head_offset + 76, rsg_head_offset + 80)
                    .readUInt32LE() === 92
            ) {
                RSGList();
            }
        } else {
            RSGList();
        }
        function RSGList() {
            rsg_list_info.push({
                rsg_name_item: rsg_list_item.slice(0, 128),
                rsg_item_offset: rsg_head_offset,
                rsg_item_size,
                rsg_item_pool_index: rsg_list_item
                    .slice(136, 140)
                    .readUInt32LE(),
                rsg_temp_info_fixing_rac_rsb: rsg_list_item.slice(140, 188),
            });
            rsg_head_offset += rsg_item_size;
        }
    }
    return rsg_list_info;
}
