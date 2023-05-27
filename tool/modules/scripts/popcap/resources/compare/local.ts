"use strict";
import fs_js from "../../../../library/fs/implement.js";
import LocalCompareItemsInDirectory from "./third.js";

export default function LocalResourcesCompare(vanilla_directory: string, modded_directory: string) {
    const res1 = fs_js.one_reader(vanilla_directory);
    const res2 = fs_js.one_reader(modded_directory);
    const same_items_in_res: string[] = new Array();
    for (const res_data_in_original_packet in res1) {
        for (const res_data_in_modified_packet in res2) {
            if (res1[res_data_in_original_packet] === res2[res_data_in_modified_packet]) {
                same_items_in_res.push(res1[res_data_in_original_packet]);
            }
        }
    }
    const output_copy_packet_resource: string[] = LocalCompareItemsInDirectory(res2, same_items_in_res);
    for (const res_data_in_original_packet in res1) {
        for (const res_data_in_modified_packet in res2) {
            if (res1[res_data_in_original_packet] === res2[res_data_in_modified_packet]) {
                const file_origin_vsdiff = fs_js.read_json(`${vanilla_directory}/${res1[res_data_in_original_packet]}`);
                const file_modified_vsdiff = fs_js.read_json(
                    `${modded_directory}/${res2[res_data_in_original_packet]}`,
                );
                if (JSON.stringify(file_origin_vsdiff) === JSON.stringify(file_modified_vsdiff)) {
                    continue;
                } else {
                    output_copy_packet_resource.push(res2[res_data_in_modified_packet]);
                }
            }
        }
    }
    const folder_output_copy_packet = `${fs_js.dirname(modded_directory)}/${
        fs_js.parse_fs(modded_directory).name
    }_cmp.res`;
    fs_js.create_directory(folder_output_copy_packet, true);
    for (let copy of output_copy_packet_resource) {
        fs_js.write_file(
            `${folder_output_copy_packet}/${copy}`,
            fs_js.read_file(`${modded_directory}/${copy}`, "buffer"),
            false,
        );
    }
}
