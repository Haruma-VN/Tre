"use strict";
import ReadBuffer from "./readbuffer.js";
interface TransformObj {
    pos: Position,
    matrix: MatrixDescartes,
    colors: Colors,
    angle: RotationAngle,
}
type RotationAngle = number;
interface Colors {
    red: number,
    green: number,
    blue: number,
    alpha: number,
}
interface MatrixDescartes {
    a: number,
    b: number,
    c: number,
    d: number,
}
interface Position {
    left: number,
    top: number,
}
export default class ReadTransform {
    constructor(public reader: ReadBuffer, private container: TransformObj) {
    }
    public getObject(): TransformObj {
        return this.container;
    }
    public getPosition(): {} {
        const reader = this.reader;
        this.container.pos = {
            left: reader.ReadInt32() / 20,
            top: reader.ReadInt32() / 20,
        }
        return this;
    }
    public getMatrix(): {} {
        const reader = this.reader;
        this.container.matrix = {
            a: reader.ReadInt32() / 65536,
            b: reader.ReadInt32() / 65536,
            c: reader.ReadInt32() / 65536,
            d: reader.ReadInt32() / 65536,
        };
        return this;
    }
    public getColorSpace(): {} {
        const reader = this.reader;
        this.container.colors = {
            red: reader.ReadByte(),
            green: reader.ReadByte(),
            blue: reader.ReadByte(),
            alpha: reader.ReadByte(),
        }
        return this;
    }
    public getRotationAngle(): {}{
        this.container.angle = this.reader.ReadInt16()/1000;
        return this;
    }
}