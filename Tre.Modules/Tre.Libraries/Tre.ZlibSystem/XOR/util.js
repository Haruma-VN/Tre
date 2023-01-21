"use strict";
import decrypt from './decrypt.js';
import encrypt from './encrypt.js';
export {
    decrypt,
    encrypt,
}
export default class {
    constructor(key, string) {
        this.key = key;
        this.string = string;
    };
    xor_encrypt() {
        encrypt(this.string, this.key);
    };
    xor_decrypt() {
        decrypt(this.key, this.string);
    };
};