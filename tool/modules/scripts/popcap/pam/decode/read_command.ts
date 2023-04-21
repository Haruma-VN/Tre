"use strict";
export default function(animation_data: any) {
    return [
        animation_data.readString(animation_data.readUInt16LE()),
        animation_data.readString(animation_data.readUInt16LE())
    ]
}