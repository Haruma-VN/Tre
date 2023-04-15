"use strict";
export default function(pam_data: any) {
    return {
        command: pam_data.readString(pam_data.readInt16LE()),
        parameter: pam_data.readString(pam_data.readInt16LE())
    }
}