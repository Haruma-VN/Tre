"use strict";
import rsgp_pack from '../../rsgp/rsgp_pack.js';
import fs_js from '../../../../library/fs/implement.js';

export default async function (TreRSBInfo: any, rsb_path: string) {
    const New_TreRSBInfo = new Array();
    const RSGP_file_data_list = new Array();
    for (let composite in TreRSBInfo) {
        const composite_rsgp_list = new Array();
        for (let i = 0; i < TreRSBInfo[composite][1].length; i++) {
            const rsgp_tre_info = Object.entries(TreRSBInfo[composite][1][i])[0];
            const rsgp_name = rsgp_tre_info[0];
            const rsgp_info = rsgp_tre_info[1];
            const rsgp_data = await rsgp_pack(rsb_path, true, false, false, true, true, rsgp_info);
            RSGP_file_data_list.push({ rsgp_name, rsgp_data });
            fs_js.execution_created(rsgp_name);
            composite_rsgp_list.push(rsgp_name);
        }
        New_TreRSBInfo.push([TreRSBInfo[composite][0], composite_rsgp_list]);
    };
    return [New_TreRSBInfo, RSGP_file_data_list];
}