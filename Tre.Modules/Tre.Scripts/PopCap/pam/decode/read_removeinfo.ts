"use strict";
export default function (pam_data: any) {
    let index = pam_data.readInt16LE();
    if (index >= 2047) {
        index = pam_data.readInt32LE();
    }
    return { index };
}