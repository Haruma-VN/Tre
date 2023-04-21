"use strict";
import parse_remove_info from './read_removeinfo.js';
import parse_append_info from './read_appendinfo.js';
import parse_move_info from './read_moveinfo.js';
import parse_command from './read_command.js';
export default function (animation_data: any, version: number) {
    const FrameFlags: any = {
        Removes: 1,
        Adds: 2,
        Moves: 4,
        FrameName: 8,
        Stop: 16,
        Commands: 32,
    };
    const flags: number = animation_data.readUInt8();
    let remove: any = new Array();
    if ((flags & FrameFlags.Removes) != 0) {
        let remove_count = animation_data.readUInt8();
        if (remove_count == 255) {
            remove_count = animation_data.readUInt16LE();
        }
        for (let i = 0; i < remove_count; i++) {
            remove.push(parse_remove_info(animation_data));
        }
    }
    let append: any = new Array();
    if ((flags & FrameFlags.Adds) != 0) {
        let append_count = animation_data.readUInt8();
        if (append_count == 255) {
            append_count = animation_data.readUInt16LE();
        }
        for (let i = 0; i < append_count; i++) {
            append.push(parse_append_info(animation_data, version));
        }
    }
    let change: any = new Array();
    if ((flags & FrameFlags.Moves) != 0) {
        let change_count = animation_data.readUInt8();
        if (change_count == 255) {
            change_count = animation_data.readUInt16LE();
        }
        for (let i = 0; i < change_count; i++) {
            change.push(parse_move_info(animation_data));
        }
    }
    let label: number | null = null;
    if ((flags & FrameFlags.FrameName) != 0) {
        label = animation_data.readString(animation_data.readUInt16LE());
    }
    let stop: boolean = false;
    if ((flags & FrameFlags.Stop) != 0) {
        stop = true;
    }
    let command: any = new Array();
    if ((flags & FrameFlags.Commands) != 0) {
        const command_count = animation_data.readUInt8();
        for (let i = 0; i < command_count; i++) {
            command.push(parse_command(animation_data));
        }
    }
    return {
        label, stop, command, remove, append, change
    };
}
