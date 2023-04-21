"use strict";
export default function(animation_data: any) {
    const magic = animation_data.readString(4, 'hex');
    if (magic.toUpperCase() != '5419F0BA') {
        throw new Error('pam_error');
    }
    return {
        version: animation_data.readUInt32LE(),
        frame_rate: animation_data.readUInt8(),
        position: [animation_data.readInt16LE() / 20.0, animation_data.readInt16LE() / 20.00],
        size: [animation_data.readInt16LE() / 20.0, animation_data.readInt16LE() / 20.00]
    }
}