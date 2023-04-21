"use strict";
import { SmartBuffer } from "smart-buffer";
export default function (animation_image: any, imagesCount: number, version: number): Buffer {
    const imageInfo: any = new SmartBuffer();
    for (let i = 0; i < imagesCount; i++) {
        const name: string = animation_image[i].name;
        imageInfo.writeUInt16LE(name.length);
        imageInfo.writeString(name);
        if (version >= 4) {
            if (animation_image[i].size != null && animation_image[i].size.length >= 2) {
                imageInfo.writeInt16LE(animation_image[i].size[0]);
                imageInfo.writeInt16LE(animation_image[i].size[1]);
            }
            else {
                imageInfo.writeInt16LE(-1);
                imageInfo.writeInt16LE(-1);
            }
        }
        if (version == 1) {
            if (animation_image[i].transform == null && animation_image[i].transform.length < 2) {
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(0);
            }
            else if (animation_image[i].transform.length >= 6) {
                let Rcos = Math.acos(animation_image[i].transform[0]);
                if (animation_image[i].transform[1] * ((version == 2 as any)? -1 : 1) < 0) {
                    Rcos = -Rcos;
                }
                imageInfo.writeInt16LE(Rcos);
                imageInfo.writeInt16LE(animation_image[i].transform[4] * 20);
                imageInfo.writeInt16LE(animation_image[i].transform[5] * 20);
            }
            else if (animation_image[i].transform.length >= 4) {
                let Rcos = Math.acos(animation_image[i].transform[0]);
                if (animation_image[i].transform[1] * ((version == 2 as any)? -1 : 1) < 0) {
                    Rcos = -Rcos;
                }
                imageInfo.writeInt16LE(Rcos);
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(0);
            }
            else if (animation_image[i].transform.length >= 4) {
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(animation_image[i].transform[0] * 20);
                imageInfo.writeInt16LE(animation_image[i].transform[1] * 20);
            }
        }
        else {
            if (animation_image[i].transform == null && animation_image[i].transform.length < 2) {
                imageInfo.writeInt32LE(1310720);
                imageInfo.writeInt32LE(0);
                imageInfo.writeInt32LE(0);
                imageInfo.writeInt32LE(1310720);
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(0);
            }
            else if (animation_image[i].transform.length >= 6) {
                imageInfo.writeInt32LE(animation_image[i].transform[0] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[2] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[1] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[3] * 1310720);
                imageInfo.writeInt16LE(animation_image[i].transform[4] * 20);
                imageInfo.writeInt16LE(animation_image[i].transform[5] * 20);
            }
            else if (animation_image[i].transform.length >= 4) {
                imageInfo.writeInt32LE(animation_image[i].transform[0] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[2] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[1] * 1310720);
                imageInfo.writeInt32LE(animation_image[i].transform[3] * 1310720);
                imageInfo.writeInt16LE(0);
                imageInfo.writeInt16LE(0);
            }
            else if (animation_image[i].transform.length >= 2) {
                imageInfo.writeInt32LE(1310720);
                imageInfo.writeInt32LE(0);
                imageInfo.writeInt32LE(0);
                imageInfo.writeInt32LE(1310720);
                imageInfo.writeInt16LE(animation_image[i].transform[0] * 20);
                imageInfo.writeInt16LE(animation_image[i].transform[1] * 20);
            }
        }
    }
    return imageInfo.toBuffer();
}