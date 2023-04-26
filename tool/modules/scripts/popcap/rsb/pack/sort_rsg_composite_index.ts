"use strict";
export default function (
    composite_folder: string[],
    composite_index: number
): Array<any> {
    const new_rsg_composite_folder = new Array();
    for (let item of composite_folder) {
        new_rsg_composite_folder.push({ rsg_name: item, composite_index });
    }
    return new_rsg_composite_folder;
}
