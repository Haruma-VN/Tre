"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (pam_command: any): Buffer {
    const commandInfo = new SmartBuffer();
    commandInfo.writeUInt16LE(pam_command.command.length);
    commandInfo.writeString(pam_command.command);
    commandInfo.writeUInt16LE(pam_command.parameter.length);
    commandInfo.writeString(pam_command.parameter);
    return commandInfo.toBuffer();
}
