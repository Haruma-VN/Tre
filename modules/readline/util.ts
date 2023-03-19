"use strict";
import {
    readline_argument,
    readline_char,
    readline_integer,
    readline_texture,
    readline_size,
    readline_expand,
    readline_normal,
    prompt,
} from './prompt/util.js';
export {
    readline_argument,
    readline_char,
    readline_integer,
    readline_texture,
    readline_size,
    readline_expand,
    readline_normal,
    prompt,
}
export default class {
    constructor(public min: number, public max: number) {
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
    texture() {
        return readline_texture();
    };
    size() {
        readline_size();
    };
    readline_expand(bundles: number[]) {
        readline_expand(bundles);
    };
    readline_normal() {
        readline_normal();
    }
};