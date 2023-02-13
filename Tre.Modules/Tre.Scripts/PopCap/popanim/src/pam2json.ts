"use strict";
import fs from "node:fs";
import OutChecker from "./outchecker";
import ReadBuffer from "./readbuffer";
import RefAppend from './refappend';
import readreferase from "./readreferase";
import ReadTransform from "./readtransform";
import fixtype from "./fixtype";
import readscript from "./readscript";
import readanim from "./readanim.js";
export interface SubInfo {
    name: string,
    info?: {
        fps: string,
        frameCount: number,
        start: number,
        end: number,
    }
    frames?: {

    }
}
export default class ReadPam {
    constructor(pamName: string) {
        this.reader = new ReadBuffer(fs.readFileSync(pamName), 17);
    }
    public start(jsonPath: string) {
        const { reader } = this;
        return {
            sprites: this.readSprites(reader, []),
            subsanim: this.readSubAnims(reader, []),
            main: this.readMainAnims(reader, {}),
        }
    }
    public readSprites(reader: ReadBuffer, sprites: {}[]) {
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
    public readSubAnims(reader: ReadBuffer, subAnims: {}[]) {
        let subAnimCount = reader.ReadInt16();
        for (let i = 0; i < subAnimCount; i++) {
            let nameLength = reader.ReadInt16();
            let sub: SubInfo = {
                name: reader.ReadBytes(nameLength).toString(),
            };
            reader.offset += 4;
            sub.info = {
                fps: reader.ReadInt16(),
                frameCount: reader.ReadInt16(),
                start: reader.ReadInt16(),
                end: reader.ReadInt16(),
            };
            sub.frames = new ReadTransform(reader, sub.info.frameCount);
            subAnims.push(sub);
        }
        return subAnims;
    }
    readMainAnims(reader: ReadBuffer, mainAnims: readanim) {
        reader.offset += 7;
        mainAnims.info = {
            fps: reader.ReadInt16(),
            frameCount: reader.ReadInt16(),
            start: reader.ReadInt16(),
            end: reader.ReadInt16(),
        };
        mainAnims.frames = new ReadTransform(reader, mainAnims.info.frameNum, true);
        return mainAnims;
    }
}