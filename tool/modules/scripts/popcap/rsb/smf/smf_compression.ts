"use strict";
import zlib from "zlib";
import { resolve } from "node:path";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import { Console } from "../../../../callback/console.js";
import fs_js from "../../../../library/fs/implement.js";

export default async function (path: string): Promise<void> {
    Console.WriteLine(
        `${color.fggreen_string(
            "◉ " + localization("execution_out") + ":\n     "
        )} ${resolve(`${path}.smf`)}`
    );
    const smf_compression = await zlib.deflateSync(
        fs_js.read_file(path, "buffer"),
        {
            level: 9,
        }
    );
    fs_js.write_stream(
        `${path}.smf`,
        Buffer.concat([Buffer.from("D4FEADDE00204C05", "hex"), smf_compression])
    );
}
