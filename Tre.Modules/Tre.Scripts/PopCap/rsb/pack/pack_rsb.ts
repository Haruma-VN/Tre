"use strict";
import fs from 'fs-extra';
import crossPathSort from 'cross-path-sort';
import { parse, resolve } from 'node:path';
import { readjson } from '../../../../Tre.Libraries/Tre.FileSystem/util.js';
import get_rsb_data from "./get_rsb_data.js"
import { TreErrorMessage } from '../../../../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
import localization from '../../../../Tre.Callback/localization.js';
import * as color from "../../../../Tre.Libraries/Tre.Color/color.js";

export default async function (rsb_path: string): Promise<void> {
    try {
        var TreRSBInfo = Object.entries(readjson(`${rsb_path}/TreRSBInfo.json`));
    } catch (error: any) {
        TreErrorMessage({ error: "Can't read TreRSBInfo", reason: "Can't read TreRSBInfo", system: error.message.toString() }, "Can't read TreRSBInfo");
        return;
    }
    let RSB_composite_files: string[] = new Array();
    let resources: string = "";
    TreRSBInfo.forEach(file => {
        if (file[0].indexOf('__MANIFESTGROUP__') !== -1) resources = file[0]
        else RSB_composite_files.push(file[0]);
    });
    RSB_composite_files = crossPathSort.sort(RSB_composite_files);
    RSB_composite_files.push(resources);
    const rsb_data: any = await get_rsb_data(RSB_composite_files, TreRSBInfo, rsb_path, 0, 0);
    let rsb_output_bundle_data = fs.createWriteStream(`${parse(rsb_path).dir}/${parse(rsb_path).name}.rsb`);
    rsb_output_bundle_data.write(rsb_data);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${resolve(`${parse(rsb_path).dir}/${parse(rsb_path).name}.rsb`)}`);
    rsb_output_bundle_data.close();
};
