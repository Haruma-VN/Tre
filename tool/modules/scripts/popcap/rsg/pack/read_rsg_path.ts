"use strict";
import fs_js from "../../../../library/fs/implement.js";
export default function read_rsg_path(packet_info: any, rsg_folder: string, merge_mode: boolean): rsg_path_info {
    let rsg_path_info: rsg_path_info = new Array();
    const rsg_convert_types: Array<string> = [".PNG", ".JSON", ".XFL", ".SOUNDBANK"];
    const rsg_original_tyeps: Array<string> = [".PTX", ".RTON", "", ""];
    function read_dir(rsg_folder_path: string): rsg_path_info {
        const all_files: rsg_path_info = new Array();
        fs_js.one_reader(rsg_folder_path).forEach(function (items) {
            const item_path: string = fs_js.join_fs(rsg_folder_path, items).toUpperCase();
            const item_ext: string = fs_js.js_extname(item_path, false, true);
            if (item_ext === ".PTX") {
                throw new Error(`${items} ptx type does not support without use_packet_data`);
            } else if (rsg_convert_types.indexOf(item_ext) !== -1) {
                let ori_path: string = item_path.slice((rsg_folder.length + 5), (item_path.length - item_ext.length)) + rsg_original_tyeps[Number(rsg_convert_types.indexOf(item_ext))];
                all_files.push({ path: item_path.slice(rsg_folder.length + 5), manifest_index: -1, packet_index: -1});
                const t_index: number = all_files.findIndex((obj) => obj.path === ori_path);
                if (t_index !== -1) {
                    all_files.splice(t_index, 1);
                }
            } else {
                if (fs_js.view_io_stream(item_path).isDirectory()) {
                    all_files.push(...read_dir(item_path));
                } else {
                    all_files.push({ path: item_path.slice(rsg_folder.length + 5), manifest_index: -1, packet_index: -1});
                }
            }
        });
        return all_files;
    }
    if (merge_mode) {
        rsg_path_info = read_dir(`${rsg_folder}/res`);
    } else {
        for (let i = 0; i < packet_info.res.length; i++) {
            rsg_path_info.push({ path: packet_info.res[i].path.join("\\").toUpperCase(), manifest_index: i, packet_index: -1});
        }
    }
    return rsg_path_info;
}
