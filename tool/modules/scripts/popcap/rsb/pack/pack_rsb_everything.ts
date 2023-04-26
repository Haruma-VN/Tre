"use strict";
import rsg_pack from "../../rsg/rsg_pack.js";
import fs_js from "../../../../library/fs/implement.js";
import { SingleBar } from "cli-progress";
import * as color from "../../../../library/color/color.js";
import localization from "../../../../callback/localization.js";

export default async function (TreRSBInfo: any, rsb_path: string) {
    const New_TreRSBInfo = new Array();
    const RSG_file_data_list = new Array();
    const bar = new SingleBar({
        format: fs_js.create_toolkit_view("progress_bar")
            ? color.fgcyan_string(
                  "◉ " + localization("execution_status") + " |"
              ) +
              color.fggreen_string("{bar}") +
              color.fgcyan_string(`| {percentage}% || {value}/{total}`)
            : color.fgcyan_string(
                  "◉ " + localization("execution_actual_size") + ": "
              ) + color.fgcyan_string(`{percentage}% || {value}/{total}`),
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true,
    });
    bar.start(TreRSBInfo.length, 0, {
        speed: "N/A",
    });
    let popcap_rsg_count: number = 0;
    for (let composite in TreRSBInfo) {
        const composite_rsg_list = new Array();
        for (let i = 0; i < TreRSBInfo[composite][1].length; i++) {
            const rsg_tre_info = Object.entries(TreRSBInfo[composite][1][i])[0];
            const rsg_name = rsg_tre_info[0];
            const rsg_info = rsg_tre_info[1];
            const rsg_data = await rsg_pack(
                rsb_path,
                true,
                false,
                false,
                true,
                true,
                rsg_info
            );
            RSG_file_data_list.push({ rsg_name, rsg_data });
            composite_rsg_list.push(rsg_name);
        }
        bar.increment();
        popcap_rsg_count++;
        bar.update(popcap_rsg_count);
        New_TreRSBInfo.push([TreRSBInfo[composite][0], composite_rsg_list]);
    }
    bar.stop();
    return [New_TreRSBInfo, RSG_file_data_list];
}
