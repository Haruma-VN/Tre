"use strict";
export default function (pam_data: any, version: number) {
    const images_number = pam_data.readInt16LE();
    const images_info = new Array();
    for (let i = 0; i < images_number; i++) {
        const name = pam_data.readString(pam_data.readInt16LE());
        let size = new Array();
        if (version >= 4) {
            size = [pam_data.readInt16LE(), pam_data.readInt16LE()];
        }
        else {
            size = [-1, -1];
        }
        let transform = new Array();
        if (version == 1) {
            const num = pam_data.readInt16LE() / 1000;
            transform = [
                Math.cos(num),
                - Math.sin(num),
                Math.sin(num),
                Math.cos(num),
                pam_data.readInt16LE() / 20,
                pam_data.readInt16LE() / 20
            ]
        }
        else {
            transform = [
                pam_data.readInt32LE() / 1310720,
                pam_data.readInt32LE() / 1310720,
                pam_data.readInt32LE() / 1310720,
                pam_data.readInt32LE() / 1310720,
                pam_data.readInt16LE() / 20,
                pam_data.readInt16LE() / 20
            ]
        }
        images_info.push({
            name, size, transform
        })
    }
    return images_info;
}