"use strict";
import pack_rsb_everything from "./pack_rsb_everything.js";
import crossPathSort from "cross-path-sort";
import PackRSB from "./pack_rsb_data.js";
import Unpack_NamePath from "./unpack_name_path.js";
import localization from "../../../../callback/localization.js";
import fs_js from "../../../../library/fs/implement.js";

export default async function (
    rsb_path: string,
    pack_simple: boolean = false,
    pack_everything: boolean = false
) {
    let TreRSBInfo: any = new Object();
    let pack_method: string | boolean = false;
    let RSG_file_data_list = new Array();
    let execution_information: string = pack_everything
        ? localization("popcap_rsb_resource_pack_information")
        : localization("popcap_rsb_normal_pack_information");
    execution_information = pack_simple
        ? localization("popcap_rsb_simple_pack_information")
        : execution_information;
    fs_js.execution_information(execution_information);
    fs_js.execution_out(
        `${fs_js.parse_fs(rsb_path).dir}/${fs_js.parse_fs(rsb_path).name}`
    );
    try {
        TreRSBInfo = Object.entries(
            fs_js.read_json(`${rsb_path}/TreRSBInfo.json`)
        );
    } catch (error: any) {
        throw new Error(localization("cannot_read_tre_rsbinfo"));
    }
    if (pack_simple) {
        pack_method = "simple";
    } else if (pack_everything) {
        pack_method = "everything";
        const rsb_info = await pack_rsb_everything(TreRSBInfo, rsb_path);
        TreRSBInfo = rsb_info[0];
        RSG_file_data_list = rsb_info[1];
    }
    let RSB_composite_list = new Array();
    const RSG_items_list = new Array();
    let RSG_items_list_temp = new Array();
    let Resources = "";
    let composite_index = 0;
    TreRSBInfo.forEach((files: any) => {
        if (files[0].indexOf("__MANIFESTGROUP__") !== -1) {
            Resources = files[0];
        } else {
            RSB_composite_list.push(files[0]);
            files[1].forEach((rsg_item: any) => {
                RSG_items_list_temp.push(rsg_item);
            });
        }
    });
    RSB_composite_list = crossPathSort.sort(RSB_composite_list);
    RSB_composite_list.push(Resources);
    RSG_items_list_temp = crossPathSort.sort(RSG_items_list_temp);
    RSG_items_list_temp.forEach((name_path) => {
        RSG_items_list.push({ name_path, composite_index });
        composite_index++;
    });
    RSG_file_data_list = crossPathSort.sort(RSG_file_data_list, {
        pathKey: "rsg_name",
    });
    RSG_items_list.push({ name_path: Resources, composite_index });
    const RSG_items_packet_list = await Unpack_NamePath(
        rsb_path,
        RSG_items_list,
        pack_method,
        RSG_file_data_list
    );
    const rsb_file_data = await PackRSB(
        rsb_path,
        pack_method as any,
        TreRSBInfo,
        RSB_composite_list,
        RSG_items_list,
        RSG_items_packet_list,
        RSG_file_data_list
    );
    fs_js.outfile_fs(
        `${fs_js.parse_fs(rsb_path).dir}/${fs_js.parse_fs(rsb_path).name}`,
        rsb_file_data
    );
    if (pack_everything) {
        fs_js.execution_status("success", localization("finish"));
    }
}
