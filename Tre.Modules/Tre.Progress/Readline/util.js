"use strict";
import readline_integer from './number.js';
import readline_char from './char.js';
import readline_argument from './argument.js';
export {
    readline_argument,
    readline_char,
    readline_integer,
}
export default class {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    argument() {
        return readline_argument();
    };
    char() {
        return readline_char();
    };
    integer() {
        return readline_integer(this.min, this.max);
    };
};