"use strict";
import readline_integer from './number.js';
import readline_char from './char.js';
import readline_argument from './argument.js';
import readline_texture from './texture.js';
import readline_size from './size.js';
export {
    readline_argument,
    readline_char,
    readline_integer,
    readline_texture,
    readline_size,
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
    texture(){
        return readline_texture();
    };
    size(){
        readline_size();
    };
};