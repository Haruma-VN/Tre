"use strict";
export enum FrameFlags {
    Unknown = 0,
    Removes = 1,
    Adds = 2,
    Moves = 4,
    FrameName = 8,
    Stop = 16,
    Commands = 32
}