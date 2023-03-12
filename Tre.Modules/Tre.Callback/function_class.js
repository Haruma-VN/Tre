"use strict";
export default class Void {
    name;
    void_number;
    constructor(name, void_number) {
        this.name = name;
        this.void_number = void_number;
    }
    display() {
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
    void_number_readline_argument() {
        return this.void_number;
    }
    change_void_display_number(new_void_display_number) {
        this.void_number = new_void_display_number;
    }
    display_text_only() {
        return this.name;
    }
    error_void_display(error) {
        return console.log(`${error}`);
    }
}
