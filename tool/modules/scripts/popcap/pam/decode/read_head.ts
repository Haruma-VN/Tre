"use strict";
export default function (pam_data: any) {
    const magic = pam_data.readString(4, "hex");
    if (magic !== "5419f0ba") {
        throw new Error("pam_error");
    }
    return {
        version: pam_data.readUInt32LE(),
        frame_rate: pam_data.readUInt8(),
        position: [
            pam_data.readInt16LE() / 20.0,
            pam_data.readInt16LE() / 20.0,
        ],
        size: [pam_data.readInt16LE() / 20.0, pam_data.readInt16LE() / 20.0],
    };
}
