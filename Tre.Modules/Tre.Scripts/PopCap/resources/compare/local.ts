"use strict";
import LocalCompareItemsInDirectory from "./third.js";
import { read_single_folder, readjson, makefolder, writefile, readfile } from "../../../../Tre.Libraries/Tre.FileSystem/util.js";
import path from "node:path";
export default function LocalResourcesCompare(vanilla_directory: string, modded_directory: string) {
    const res1 = read_single_folder(vanilla_directory);
    const res2 = read_single_folder(modded_directory);
    const same_items_in_res: string[] = new Array();
    for (const res_data_in_original_packet in res1) {
        for (const res_data_in_modified_packet in res2) {
            if (res1[res_data_in_original_packet] === res2[res_data_in_modified_packet]) {
                same_items_in_res.push(res1[res_data_in_original_packet])
            }
        }
    }
    const output_copy_packet_resource: string[] = LocalCompareItemsInDirectory(res2, same_items_in_res);
    for (const res_data_in_original_packet in res1) {
        for (const res_data_in_modified_packet in res2) {
            if (res1[res_data_in_original_packet] === res2[res_data_in_modified_packet]) {
                const file_origin_vsdiff = readjson(`${vanilla_directory}/${res1[res_data_in_original_packet]}`);
                const file_modified_vsdiff = readjson(`${modded_directory}/${res2[res_data_in_original_packet]}`);
                if (JSON.stringify(file_origin_vsdiff) === JSON.stringify(file_modified_vsdiff)) {
                    continue;
                }
                else {
                    output_copy_packet_resource.push(res2[res_data_in_modified_packet]);
                }
            }
        }
    }
    const folder_output_copy_packet = `${modded_directory}/../${path.parse(modded_directory).name}_cmp.res`;
    makefolder(folder_output_copy_packet);
    for(let copy of output_copy_packet_resource){
        writefile(`${folder_output_copy_packet}/${copy}`, readfile(`${modded_directory}/${copy}`));
    }
}