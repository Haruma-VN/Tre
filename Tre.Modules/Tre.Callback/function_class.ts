"use strict";
export default class Void {
    constructor(private name: string, private void_number: number) { };
    public display(): string {
        switch (this.void_number.toString().length) {
            case 1:
                return `      ${this.void_number}. ${this.name}`;
            case 2:
                return `     ${this.void_number}. ${this.name}`;
            case 3:
                return `    ${this.void_number}. ${this.name}`;
            case 4:
                return `   ${this.void_number}. ${this.name}`;
            case 5:
                return `  ${this.void_number}. ${this.name}`;
            case 6:
                return ` ${this.void_number}. ${this.name}`;
            default:
                return `${this.void_number}. ${this.name}`;
        }
    }
    public void_number_readline_argument(): number {
        return this.void_number;
    }
}