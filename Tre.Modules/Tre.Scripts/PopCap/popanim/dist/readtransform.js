"use strict";
export default class ReadTransform {
    constructor(reader, container) {
        this.reader = reader;
        this.container = container;
    }
    getObject() {
        return this.container;
    }
    getPosition() {
        const reader = this.reader;
        this.container.pos = {
            left: reader.ReadInt32() / 20,
            top: reader.ReadInt32() / 20,
        };
        return this;
    }
    getMatrix() {
        const reader = this.reader;
        this.container.matrix = {
            a: reader.ReadInt32() / 65536,
            b: reader.ReadInt32() / 65536,
            c: reader.ReadInt32() / 65536,
            d: reader.ReadInt32() / 65536,
        };
        return this;
    }
    getColorSpace() {
        const reader = this.reader;
        this.container.colors = {
            red: reader.ReadByte(),
            green: reader.ReadByte(),
            blue: reader.ReadByte(),
            alpha: reader.ReadByte(),
        };
        return this;
    }
    getRotationAngle() {
        this.container.angle = this.reader.ReadInt16() / 1000;
        return this;
    }
}
