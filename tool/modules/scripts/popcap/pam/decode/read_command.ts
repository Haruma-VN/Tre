"use strict";
export default function (pam_data: any): {
    command: string,
    parameter: string,
} {
    return {
        command: pam_data.readString(pam_data.readUInt16LE()),
        parameter: pam_data.readString(pam_data.readUInt16LE())
    };
}
