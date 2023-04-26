"use strict";
import Rijndael from "rijndael-js";
import { fgred_string } from "../../../../library/color/color.js";
import localization from "../../../../callback/localization.js";
import { Console } from "../../../../callback/console.js";

export default function (rton_data: any, key: string): void | Buffer {
    if (rton_data.slice(0, 2).toString("hex") === "1000") {
        const iv = key.slice(4, 28);
        const decrypt = new Rijndael(key, "cbc");
        const decrypttext = Buffer.from(
            decrypt.decrypt(rton_data.slice(2), iv.length << 3, iv)
        );
        return decrypttext;
    } else {
        Console.WriteLine(
            fgred_string(
                `◉ ${localization("excecution_exception")}: ${localization(
                    "rton_file_is_not_encrypted"
                )}`
            )
        );
    }
}
