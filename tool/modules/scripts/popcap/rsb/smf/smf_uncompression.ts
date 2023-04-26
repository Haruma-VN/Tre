"use strict";
import zlib from "zlib";
import { parse, resolve } from "node:path";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import { Console } from "../../../../callback/console.js";
import fs_js from "../../../../library/fs/implement.js";

export default async function (path: string): Promise<void> {
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${resolve(`${parse(path).dir}/${parse(path).name}`)}`
    );
    const smf_uncompression = await zlib.inflateSync(
        fs_js.read_file(path, "buffer").slice(8)
    );
    fs_js.write_stream(
        `${parse(path).dir}/${parse(path).name}`,
        smf_uncompression
    );
}
