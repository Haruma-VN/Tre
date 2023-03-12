"use strict";
import crypto from "crypto-js";
export namespace Extra.Tre.System {

    export abstract class CryptoJS {
        public abstract MD5Hash(): string;
        public abstract Sha1Hash(): string;
        public abstract Sha3Hash(): string;
        public abstract Sha224Hash(): string;
        public abstract Sha256Hash(): string;
        public abstract Sha384Hash(): string;
        public abstract Sha512Hash(): string;
    }

    export class Encrypt extends CryptoJS {
        constructor(private substr: string, private key?: string) {
            super();
        }

        public MD5Hash(): string {
            return crypto.MD5(this.substr).toString();
        }

        public Sha1Hash(): string {
            return crypto.SHA1(this.substr).toString();
        }

        public Sha3Hash(): string {
            return crypto.SHA3(this.substr).toString();
        }

        public Sha224Hash(): string {
            return crypto.SHA224(this.substr).toString();
        }

        public Sha256Hash(): string {
            return crypto.SHA256(this.substr).toString();
        }

        public Sha384Hash(): string {
            return crypto.SHA384(this.substr).toString();
        }

        public Sha512Hash(): string {
            return crypto.SHA512(this.substr).toString();
        }

        public xorEncrypt(): string {
            const encrypted: any[] = new Array();
            if (this.key) {
                for (let i = 0; i < this.substr.length; i++) {
                    encrypted.push(this.substr.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length));
                }
            }
            return String.fromCharCode.apply(null, encrypted);
        }

        public Base64Encode(): string {
            return Buffer.from(this.substr).toString('base64');
        }

        public Base64Decode(): string {
            return Buffer.from(this.substr, 'base64').toString('ascii');
        }
    }
}