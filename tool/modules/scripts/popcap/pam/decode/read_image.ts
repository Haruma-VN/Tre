"use strict";
export default function (animation_data: any, version: number) {
    const images_number = animation_data.readUInt16LE();
    const images_info = new Array();
    for (let i = 0; i < images_number; i++) {
        const name = animation_data.readString(animation_data.readUInt16LE());
        let size = new Array();
        if (version >= 4) {
            size = [animation_data.readInt16LE(), animation_data.readInt16LE()];
        }
        else {
            size = [-1, -1];
        }
        let transform = new Array();
        if (version == 1) {
            const num = animation_data.readInt16LE() / 1000;
            transform = [
                Math.cos(num),
                - Math.sin(num),
                Math.sin(num),
                Math.cos(num),
                animation_data.readInt16LE() / 20,
                animation_data.readInt16LE() / 20
            ]
        }
        else {
            transform = [
                animation_data.readInt32LE() / 1310720,
                animation_data.readInt32LE() / 1310720,
                animation_data.readInt32LE() / 1310720,
                animation_data.readInt32LE() / 1310720,
                animation_data.readInt16LE() / 20,
                animation_data.readInt16LE() / 20
            ]
        }
        images_info.push({
            name, size, transform
        })
    }
    return images_info;
}