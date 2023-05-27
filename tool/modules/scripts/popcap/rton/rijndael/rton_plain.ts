"use strict";
import Rijndael from "rijndael-js";
import localization from "../../../../callback/localization.js";
import { UnsupportedFileType } from "../../../../implement/error.js";
export default function (rton_data: any, key: string, file_path: string): Buffer {
    if (rton_data.slice(0, 2).toString("hex") === "1000") {
        const iv: string = key.slice(4, 28);
        const decrypt: any = new Rijndael(key, "cbc");
        const decrypttext: Buffer = Buffer.from(decrypt.decrypt(rton_data.slice(2), iv.length << 3, iv));
        return decrypttext;
    } else if (rton_data.slice(0, 4).toString() === "RTON") {
        return rton_data;
    } else {
        throw new UnsupportedFileType(`${localization("rton_file_is_not_encrypted")}`, file_path);
    }
}
