"use strict";
import unpack from "./unpack_rsgp.js";
import { writejson } from '../../../Tre.Libraries/Tre.FileSystem/util.js';
import fs from "node:fs";
import path from "path";
import pack from './rsgp_pack.js';
export function unpack_rsgp(rsgp_data: any, rsgp_path: string, decode_image: boolean, decode_rton: boolean, removeinfo: boolean): void {
    unpack(rsgp_data, rsgp_path, decode_image, decode_rton, removeinfo);
    return;
}
export async function pack_rsgp(dir: string) {
    const rsgp_data = await pack(dir);
    await fs.writeFileSync(`${path.parse(dir).dir}/${path.parse(dir).name}.rsgp`, rsgp_data as any);
}