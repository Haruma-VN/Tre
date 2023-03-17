"use strict";
import { SmartBuffer } from "smart-buffer";
import writeRemoveInfo from './write_removeinfo.js';
import writeAppendInfo from './write_appendinfo.js';
import writeMoveInfo from './write_moveinfo.js';
import writeCommand from './write_command.js';
export default function (pam_frame: any, version: number): Buffer {
    const frameInfo = new SmartBuffer();
    const FrameFlags = {
        Removes: 1,
        Adds: 2,
        Moves: 4,
        FrameName: 8,
        Stop: 16,
        Commands: 32
    };
    let flags = 0;
    if (pam_frame.remove != null && pam_frame.remove.length > 0) flags += FrameFlags.Removes;
    if (pam_frame.append != null && pam_frame.append.length > 0) flags += FrameFlags.Adds;
    if (pam_frame.change != null && pam_frame.change.length > 0) flags += FrameFlags.Moves;
    if (pam_frame.label != null) flags += FrameFlags.FrameName;
    if (pam_frame.stop) flags += FrameFlags.Stop;
    if (pam_frame.command != null && pam_frame.command.length > 0) flags += FrameFlags.Commands;
    frameInfo.writeUInt8(flags);
    if ((flags & FrameFlags.Removes) != 0) {
        const remove_count = pam_frame.remove.length;
        if (remove_count >= 0 && remove_count < 255) {
            frameInfo.writeUInt8(remove_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeInt16LE(remove_count);
        }
        for (let i = 0; i < remove_count; i++) {
            frameInfo.writeBuffer(writeRemoveInfo(pam_frame.remove[i].index));
        }
    }
    if ((flags & FrameFlags.Adds) != 0) {
        const append_count = pam_frame.append.length
        if (append_count >= 0 && append_count < 255) {
            frameInfo.writeUInt8(append_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeInt16LE(append_count);
        }
        for (let i = 0; i < append_count; i++) {
            frameInfo.writeBuffer(writeAppendInfo(pam_frame.append[i], version));
        }
    }
    if ((flags & FrameFlags.Moves) != 0) {
        const change_count = pam_frame.change.length;
        if (change_count >= 0 && change_count < 255) {
            frameInfo.writeUInt8(change_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeInt16LE(change_count);
        }
        for (let i = 0; i < change_count; i++) {
            frameInfo.writeBuffer(writeMoveInfo(pam_frame.change[i], version));
        }
    }
    if ((flags & FrameFlags.FrameName) != 0) {
        frameInfo.writeInt16LE(pam_frame.label.length);
        frameInfo.writeString(pam_frame.label);
    }
    if ((flags & FrameFlags.Stop) != 0) {
    }
    if ((flags & FrameFlags.Commands) != 0) {
        let command_count = pam_frame.command.length;
        if (command_count > 255) {
            command_count = 255;
        }
        frameInfo.writeUInt8(command_count);
        for (let i = 0; i < command_count; i++) {
            frameInfo.writeBuffer(writeCommand(pam_frame.command[i]));
        }
    }
    return frameInfo.toBuffer();
}