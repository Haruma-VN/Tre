"use strict";
import crypto from "crypto-js";
export var Extra;
(function (Extra) {
    var Tre;
    (function (Tre) {
        var System;
        (function (System) {
            class CryptoJS {
            }
            System.CryptoJS = CryptoJS;
            class Encrypt extends CryptoJS {
                substr;
                key;
                constructor(substr, key) {
                    super();
                    this.substr = substr;
                    this.key = key;
                }
                MD5Hash() {
                    return crypto.MD5(this.substr).toString();
                }
                Sha1Hash() {
                    return crypto.SHA1(this.substr).toString();
                }
                Sha3Hash() {
                    return crypto.SHA3(this.substr).toString();
                }
                Sha224Hash() {
                    return crypto.SHA224(this.substr).toString();
                }
                Sha256Hash() {
                    return crypto.SHA256(this.substr).toString();
                }
                Sha384Hash() {
                    return crypto.SHA384(this.substr).toString();
                }
                Sha512Hash() {
                    return crypto.SHA512(this.substr).toString();
                }
                xorEncrypt() {
                    const encrypted = new Array();
                    if (this.key) {
                        for (let i = 0; i < this.substr.length; i++) {
                            encrypted.push(this.substr.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length));
                        }
                    }
                    return String.fromCharCode.apply(null, encrypted);
                }
                AESEncrypt(iv, mode, padding) {
                    if (this.key) {
                        return crypto.AES.encrypt(this.substr, this.key, { iv: iv, mode: crypto.mode[mode], padding: crypto.pad[padding] }).toString();
                    }
                    return "";
                }
                AESDecrypt(iv, mode, padding) {
                    if (this.key) {
                        return crypto.AES.decrypt(this.substr, this.key, { iv: iv, mode: crypto.mode[mode], padding: crypto.pad[padding] }).toString(crypto.enc.Utf8);
                    }
                    return "";
                }
                Base64Encode() {
                    return Buffer.from(this.substr).toString('base64');
                }
                Base64Decode() {
                    return Buffer.from(this.substr, 'base64').toString('ascii');
                }
            }
            System.Encrypt = Encrypt;
        })(System = Tre.System || (Tre.System = {}));
    })(Tre = Extra.Tre || (Extra.Tre = {}));
})(Extra || (Extra = {}));
