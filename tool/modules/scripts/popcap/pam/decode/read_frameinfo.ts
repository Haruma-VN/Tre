"use strict";
import readRemoveInfo from './read_removeinfo.js';
import readAppendInfo from './read_appendinfo.js';
import readMoveInfo from './read_moveinfo.js';
import readCommand from './read_command.js';
export default function (pam_data: any, version: number) {
    const FrameFlags = {
        Removes: 1,
        Adds: 2,
        Moves: 4,
        FrameName: 8,
        Stop: 16,
        Commands: 32,
    };
    const flags = pam_data.readUInt8();
    let remove = new Array();
    if ((flags & FrameFlags.Removes) != 0) {
        let remove_count = pam_data.readUInt8();
        if (remove_count == 255) {
            remove_count = pam_data.readInt16LE();
        }
        for (let i = 0; i < remove_count; i++) {
            remove.push(readRemoveInfo(pam_data));
        }
    }
    let append = new Array();
    if ((flags & FrameFlags.Adds) != 0) {
        let append_count = pam_data.readUInt8();
        if (append_count == 255) {
            append_count = pam_data.readInt16LE();
        }
        for (let i = 0; i < append_count; i++) {
            append.push(readAppendInfo(pam_data, version));
        }
    }
    let change = new Array();
    if ((flags & FrameFlags.Moves) != 0) {
        let change_count = pam_data.readUInt8();
        if (change_count == 255) {
            change_count = pam_data.readInt16LE();
        }
        for (let i = 0; i < change_count; i++) {
            change.push(readMoveInfo(pam_data, version));
        }
    }
    let label = null;
    if ((flags & FrameFlags.FrameName) != 0) {
        label = pam_data.readString(pam_data.readInt16LE());
    }
    let stop = false;
    if ((flags & FrameFlags.Stop) != 0) {
        stop = true;
    }
    let command = new Array();
    if ((flags & FrameFlags.Commands) != 0) {
        const command_count = pam_data.readUInt8();
        for (let i = 0; i < command_count; i++) {
            command.push(readCommand(pam_data));
        }
    }
    return {
        label, stop, command, remove, append, change
    };
}
