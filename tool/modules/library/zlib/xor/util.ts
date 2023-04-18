"use strict";
import decrypt from "./decrypt.js";
import encrypt from "./encrypt.js";
export { decrypt, encrypt };
export default class {
    constructor(public key: string, public string: string) {}
    xor_encrypt() {
        encrypt(this.string, this.key);
    }
    xor_decrypt() {
        decrypt(this.key, this.string);
    }
}
