"use strict";

import localization from "../../../../callback/localization.js";
import { BrokenFile } from "../../../../implement/error.js";

export default function (animation_data: any, file_path: string) {
    const magic = animation_data.readString(4, "hex");
    if (magic.toUpperCase() != "5419F0BA") {
        throw new BrokenFile(localization("pam_error"), file_path, localization("pam_file_error"));
    }
    return {
        version: animation_data.readUInt32LE(),
        frame_rate: animation_data.readUInt8(),
        position: [animation_data.readInt16LE() / 20.0, animation_data.readInt16LE() / 20.0],
        size: [animation_data.readInt16LE() / 20.0, animation_data.readInt16LE() / 20.0],
    };
}
