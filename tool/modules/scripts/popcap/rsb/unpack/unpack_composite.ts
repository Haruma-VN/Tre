"use strict";
export default function(rsb_composite: Buffer, head_version: number) {
    const manifest: {head_version: number, group: Array<any>} = { head_version, group: [] };
    for (let i = 0; i < rsb_composite.byteLength; i += 1156) {
        const rsb_composite_name: string = rsb_composite.slice(i, i + 128).filter(byte => byte !== 0x00).toString();
        const composite: boolean = (rsb_composite_name.includes("_CompositeShell") ? true : false);
        const rsg_items_list: {composite: boolean, subgroup: Array<any> } = {composite, subgroup: []};
        const composite_item: number = rsb_composite.readUInt32LE(i + 1152);
        for (let k = 0; k < composite_item; k ++) {
            const read_index: number = (i + k * 16);
            const rsg_index: number = rsb_composite.readUInt32LE(read_index + 128);
            const rsg_res_type: number = rsb_composite.readUInt32LE(read_index + 132);
            rsg_items_list.subgroup.push({rsg_index, rsg_res_type})
        }
        manifest.group.push([rsb_composite_name.replace("_CompositeShell", ""), rsg_items_list])
    }
    return manifest;
}
