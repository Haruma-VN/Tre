"use strict";
export default function (composite_folder: string[], composite_index: number): Array<any> {
    const new_rsgp_composite_folder = new Array();
    for (let item of composite_folder) {
        new_rsgp_composite_folder.push({ rsgp_name: item, composite_index });
    }
    return new_rsgp_composite_folder;
}