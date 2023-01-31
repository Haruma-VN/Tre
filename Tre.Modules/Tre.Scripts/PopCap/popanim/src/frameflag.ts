"use strict";
export enum FrameFlags {
    Unknown,
    Removes,
    Adds,
    Moves = 4,
    FrameName = 8,
    Stop = 16,
    Commands = 32
}