"use strict";
export default class ReadBuffer {
    constructor(public buffer: any, public offset: number = 0) {
    }
    public BufferOffsetOut(): boolean {
        return this.offset < this.buffer.length;
    }
    public ReadInt16(): number {
        let output = this.buffer.readInt16LE(this.offset);
        this.offset += 2;
        return output;
    }
    public ReadInt32(): number {
        let output = this.buffer.readInt32LE(this.offset);
        this.offset += 4;
        return output;
    }
    public ReadByte(): number {
        return this.buffer[this.offset++];
    }
    public ReadBytes(length: number) {
        return this.buffer.slice(this.offset, this.offset += length);
    }
    protected ConsoleNotifyInfo(): void {
        console.log(`${this.buffer}...${this.offset}...${this.offset++}`);
    }
    private NotifyError(error: never): void {
        throw new Error(error);
    }
}