"use strict";
import unpack from "./unpack_rsgp.js";
import fs from "node:fs";
import path from "path";
import pack from './rsgp_pack.js';
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";
import localization from "../../../Tre.Callback/localization.js";
export async function unpack_rsgp(rsgp_data: any, rsgp_path: string, decode_image: string = "no", decode_rton: string = "no", removeinfo: boolean = false): Promise<void> {
    console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(rsgp_path)}`);
    await unpack(rsgp_data, rsgp_path, decode_image, decode_rton, removeinfo);
    return;
}
export async function pack_rsgp(dir: string, is_pack_simple:boolean = false) {
    const rsgp_data = await pack(dir, is_pack_simple);
    await fs.writeFileSync(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`, rsgp_data as any);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${path.resolve(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`)}`);
    return;
}