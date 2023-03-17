"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (pam_command: any) {
    const commandInfo = new SmartBuffer();
    commandInfo.writeInt16LE(pam_command.command.length);
    commandInfo.writeString(pam_command.command);
    commandInfo.writeInt16LE(pam_command.parameter.length);
    commandInfo.writeString(pam_command.parameter);
    return commandInfo.toBuffer();
}