"use strict";
export var FrameFlags;
(function (FrameFlags) {
    FrameFlags[FrameFlags["Unknown"] = 0] = "Unknown";
    FrameFlags[FrameFlags["Removes"] = 1] = "Removes";
    FrameFlags[FrameFlags["Adds"] = 2] = "Adds";
    FrameFlags[FrameFlags["Moves"] = 4] = "Moves";
    FrameFlags[FrameFlags["FrameName"] = 8] = "FrameName";
    FrameFlags[FrameFlags["Stop"] = 16] = "Stop";
    FrameFlags[FrameFlags["Commands"] = 32] = "Commands";
})(FrameFlags || (FrameFlags = {}));
