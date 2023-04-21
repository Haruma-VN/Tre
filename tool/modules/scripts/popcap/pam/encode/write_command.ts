"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (animation_command: any) {
    const commandInfo: any = new SmartBuffer();
    commandInfo.writeUInt16LE(animation_command[0].length);
    commandInfo.writeString(animation_command[0]);
    commandInfo.writeUInt16LE(animation_command[1].length);
    commandInfo.writeString(animation_command[1]);
    return commandInfo.toBuffer();
}