"use strict";
export default function (pam_data: any) {
    let index = pam_data.readUInt16LE();
    if (index >= 2047) {
        index = pam_data.readUInt32LE();
    }
    return { index };
}
