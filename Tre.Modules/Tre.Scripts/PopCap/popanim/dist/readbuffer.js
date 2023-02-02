"use strict";
export default class ReadBuffer {
    constructor(buffer, offset = 0) {
        this.buffer = buffer;
        this.offset = offset;
    }
    BufferOffsetOut() {
        return this.offset < this.buffer.length;
    }
    ReadInt16() {
        let output = this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return output;
    }
    ReadInt32() {
        let output = this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return output;
    }
    ReadByte() {
        return this.buffer[this.offset++];
    }
    ReadBytes(length) {
        return this.buffer.slice(this.offset, this.offset += length);
    }
    ConsoleNotifyInfo() {
        console.log(`${this.buffer}...${this.offset}...${this.offset++}`);
    }
    NotifyError(error) {
        throw new Error(error);
    }
}
