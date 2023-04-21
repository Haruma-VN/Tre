"use strict";
import { SmartBuffer } from "smart-buffer";
import write_remove_info from './write_removeinfo.js';
import write_append_info from './write_appendinfo.js';
import write_move_info from './write_moveinfo.js';
import write_command from './write_command.js';
export default function (animation_frame: any, version: number): Buffer {
    const frameInfo: any = new SmartBuffer();
    const FrameFlags = {
        Removes: 1,
        Adds: 2,
        Moves: 4,
        FrameName: 8,
        Stop: 16,
        Commands: 32
    };
    let flags: number = 0;
    if (animation_frame.remove != null && animation_frame.remove.length > 0) flags += FrameFlags.Removes;
    if (animation_frame.append != null && animation_frame.append.length > 0) flags += FrameFlags.Adds;
    if (animation_frame.change != null && animation_frame.change.length > 0) flags += FrameFlags.Moves;
    if (animation_frame.label != null) flags += FrameFlags.FrameName;
    if (animation_frame.stop) flags += FrameFlags.Stop;
    if (animation_frame.command != null && animation_frame.command.length > 0) flags += FrameFlags.Commands;
    frameInfo.writeUInt8(flags);
    if ((flags & FrameFlags.Removes) != 0) {
        const remove_count: number = animation_frame.remove.length;
        if (remove_count >= 0 && remove_count < 255) {
            frameInfo.writeUInt8(remove_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeUInt16LE(remove_count);
        }
        for (let i = 0; i < remove_count; i++) {
            frameInfo.writeBuffer(write_remove_info(animation_frame.remove[i].index));
        }
    }
    if ((flags & FrameFlags.Adds) != 0) {
        const append_count: number = animation_frame.append.length
        if (append_count >= 0 && append_count < 255) {
            frameInfo.writeUInt8(append_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeUInt16LE(append_count);
        }
        for (let i = 0; i < append_count; i++) {
            frameInfo.writeBuffer(write_append_info(animation_frame.append[i], version));
        }
    }
    if ((flags & FrameFlags.Moves) != 0) {
        const change_count: number = animation_frame.change.length;
        if (change_count >= 0 && change_count < 255) {
            frameInfo.writeUInt8(change_count);
        }
        else {
            frameInfo.writeUInt8(255);
            frameInfo.writeUInt16LE(change_count);
        }
        for (let i = 0; i < change_count; i++) {
            frameInfo.writeBuffer(write_move_info(animation_frame.change[i], version));
        }
    }
    if ((flags & FrameFlags.FrameName) != 0) {
        frameInfo.writeUInt16LE(animation_frame.label.length);
        frameInfo.writeString(animation_frame.label);
    }
    if ((flags & FrameFlags.Stop) != 0) {
    }
    if ((flags & FrameFlags.Commands) != 0) {
        let command_count = animation_frame.command.length;
        if (command_count > 255) {
            command_count = 255;
        }
        frameInfo.writeUInt8(command_count);
        for (let i = 0; i < command_count; i++) {
            frameInfo.writeBuffer(write_command(animation_frame.command[i]));
        }
    }
    return frameInfo.toBuffer();
}