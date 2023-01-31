"use strict";
import ReadBuffer from "./readbuffer.js";
import ReadTransform from "./readtransform.js";
import fs from "ndoe:fs";
export default class {
    constructor(pamName) {
        this.reader = new ReadBuffer(fs.readFileSync(pamName), 17);
    }
    start() {
        const { reader } = this;
        return {
            sprites: this.readSprites(reader, []),
            subsanim: this.readSubAnims(reader, []),
            main: this.readMainAnims(reader, {}),
        };
    }
    readSprites(reader, sprites) {
        let spriteCount = reader.ReadInt16();
        for (let i = 0; i < spriteCount; i++) {
            let nameLength = reader.ReadInt16();
            let { groups: { imageID, resID } } = /(?<imageID>\w+)\|(?<resID>\w+)/.exec(reader.ReadBytes(nameLength).toString());
            sprites.push({
                imageID, resID,
                'Bundles': {
                    "width": reader.ReadInt16(),
                    "height": reader.ReadInt16(),
                    "a": reader.ReadInt32() / 65536,
                    "c": reader.ReadInt32() / 65536,
                    "b": reader.ReadInt32() / 65536,
                    "d": reader.ReadInt32() / 65536,
                    "left": reader.ReadInt16() / 20,
                    "top": reader.ReadInt16() / 20,
                }
            });
        }
        return sprites;
    }
    readSubAnims(reader, subAnims) {
        let subAnimCount = reader.ReadInt16();
        for (let i = 0; i < subAnimCount; i++) {
            let nameLength = reader.ReadInt16();
            let sub = {
                name: reader.ReadBytes(nameLength).toString(),
            };
            reader.offset += 4;
            sub.info = {
                fps: reader.ReadInt16(),
                frameCount: reader.ReadInt16(),
                start: reader.ReadInt16(),
                end: reader.ReadInt16(),
            };
            sub.frames = ReadTransform(reader, sub.info.frameCount);
            subAnims.push(sub);
        }
        return subAnims;
    }
    readMainAnims(reader, mainAnims) {
        reader.offset += 7;
        mainAnims.info = {
            fps: reader.ReadInt16(),
            frameCount: reader.ReadInt16(),
            start: reader.ReadInt16(),
            end: reader.ReadInt16(),
        };
        mainAnims.frames = ReadTransform(reader, mainAnims.info.frameNum, true);
        return mainAnims;
    }
}
