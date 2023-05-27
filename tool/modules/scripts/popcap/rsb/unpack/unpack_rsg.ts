"use strict";
import write_rsg from "./write_rsg.js";
import * as color from "../../../../library/color/color.js";
import localization from "../../../../callback/localization.js";
import { SingleBar } from "cli-progress";
import fs_js from "../../../../library/fs/implement.js";
export default function rsb_unpack_rsg(mainfest: any, rsb_path: string, rsg_info: Buffer, rsb_b: Buffer, ptx_info_list: Array<{width: number, height: number, width_plus: number, fmt: number}>, resgroup_method: boolean, unpack_packages: boolean, decode_rton: boolean, split_res_json: boolean) {
    function read_rsg_info(rsg_info_b: Buffer) {
        const rsg_name: string = rsg_info_b.slice(0, 128).toString("utf-8").replaceAll("\x00", ""),
            rsg_offset: number = rsg_info_b.readUInt32LE(128),
            rsg_length: number = rsg_info_b.readUInt32LE(132),
            rsg_index: number = rsg_info_b.readUInt32LE(136),
            rsg_before_format: number = rsg_info_b.readUInt32LE(200);
        return {
            rsg_name,
            rsg_offset,
            rsg_length,
            rsg_index,
            rsg_before_format
        };
    };
    const bar = new SingleBar({
            format: fs_js.create_toolkit_view("progress_bar")
                ? color.fgcyan_string("◉ " + localization("execution_status") + " |") +
                  color.fggreen_string("{bar}") +
                  color.fgcyan_string(`| {percentage}% || {value}/{total}`)
                : color.fgcyan_string("◉ " + localization("execution_actual_size") + ": ") + color.fgcyan_string(`{percentage}% || {value}/{total}`),
            barCompleteChar: "\u2588",
            barIncompleteChar: "\u2591",
            hideCursor: true,
        });
        bar.start(mainfest.group.length, 0, {
            speed: "N/A",
        });
    const rsb_rsg_info: any = new Array();
    for (let i = 0; i < rsg_info.byteLength; i += 204) {
        const rsg_info_ext: Buffer = rsg_info.slice(i, i + 204);
        const rsg_info_t: {rsg_name: string, rsg_offset: number, rsg_length: number, rsg_index: number, rsg_before_format: number} = read_rsg_info(rsg_info_ext);
        rsb_rsg_info.push(rsg_info_t);
    }
    for (let k = 0; k < mainfest.group.length; k++) {
        const rsg_sub_group: any = mainfest.group[k][1];
        const composite_folder: string = mainfest.group[k][0];
        for (let j = 0; j < rsg_sub_group.subgroup.length; j++) {
            const rsg_index: number = rsg_sub_group.subgroup[j].rsg_index;
            const rsg_res_type: number = rsg_sub_group.subgroup[j].rsg_res_type;
            for (let info_index in rsb_rsg_info) {
                if (rsg_index === (rsb_rsg_info[info_index].rsg_index as number)) {
                    const rsg_file_data: Buffer = rsb_b.slice(
                        rsb_rsg_info[info_index].rsg_offset,
                        rsb_rsg_info[info_index].rsg_offset + rsb_rsg_info[info_index].rsg_length
                    );
                    const rsg_info_group: any = write_rsg(rsb_path, rsb_rsg_info[info_index].rsg_name, rsb_rsg_info[info_index].rsg_before_format, ptx_info_list, composite_folder, rsg_res_type, rsg_file_data, resgroup_method, unpack_packages, decode_rton, split_res_json);
                    rsg_sub_group.subgroup[j] = rsg_info_group;
                    rsb_rsg_info.splice(info_index, 1);
                    break;
                }
            }
        };
         bar.update(k + 1);
    };
     bar.stop();
    return Object.fromEntries(mainfest.group);
}
