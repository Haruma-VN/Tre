"use strict";
export default async function (composite_folder_list: Buffer) {
    const new_composite_list_info: any[] = new Array();
    const rsgp_item_in_composite_list: any[] = new Array();
    for (let i: number = 0; i < composite_folder_list.length; i += 1156) {
        const composite_item: Buffer = composite_folder_list.slice(i, i + 1156);
        const rsgp_number_index: number = composite_item
            .slice(1152)
            .readUInt32LE();
        let rsgp_info_offset: number = 128;
        for (let k: number = 0; k < rsgp_number_index; k++) {
            rsgp_item_in_composite_list.push({
                rsgp_pool_index: composite_item
                    .slice(rsgp_info_offset, rsgp_info_offset + 4)
                    .readUInt32LE(),
                composite_pool_index: i / 1156,
            });
            rsgp_info_offset += 16;
        }
        const offset_name: number =
            composite_item.slice(0, 128).indexOf("_CompositeShell") !== -1
                ? composite_item.slice(0, 128).indexOf("_CompositeShell")
                : composite_item.slice(0, 128).indexOf("\x00");
        const composite_name: string = composite_item
            .slice(0, offset_name)
            .toString();
        new_composite_list_info.push({
            composite_name,
            composite_length: rsgp_number_index,
            composite_pool_index: i / 1156,
        });
    }
    return [new_composite_list_info, rsgp_item_in_composite_list];
}
