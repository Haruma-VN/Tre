"use strict";
import zlib from "zlib";
import fs from "fs-extra";
import { parse, resolve } from "node:path";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";

export default async function (path: string): Promise<void> {
    console.log(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${resolve(`${parse(path).dir}/${parse(path).name}`)}`
    );
    let write = fs.createWriteStream(`${parse(path).dir}/${parse(path).name}`);
    const smf_uncompression = await zlib.inflateSync(
        fs.readFileSync(path).slice(8)
    );
    await write.write(smf_uncompression);
    write.close();
}
