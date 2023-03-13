"use strict";
import unpack from "./unpack_rsgp.js";
import fs from "node:fs";
import path from "path";
import pack from './rsgp_pack.js';
import * as color from "../../../Tre.Libraries/Tre.Color/color.js";
import localization from "../../../Tre.Callback/localization.js";
export async function unpack_rsgp(rsgp_data: any, rsgp_path: string, decode_image: boolean = false, decode_rton: boolean = false, removeinfo: boolean = false): Promise<void> {
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(rsgp_path)}`);
    await unpack(rsgp_data, rsgp_path, decode_image, decode_rton, removeinfo, 2);
    return;
}

export async function pack_rsgp(dir: string, is_pack_simple: boolean = false) {
    const rsgp_data = (is_pack_simple) ? await pack(dir, true, false, false, false, false, false) : await pack(dir, false, false, false, false, false, false);
    await fs.writeFileSync(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`, rsgp_data as any);
    console.log(`${color.fggreen_string("◉ " + localization("execution_out")+":\n     ")} ${path.resolve(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`)}`);
    return;
}