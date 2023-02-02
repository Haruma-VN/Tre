"use strict";
import CryptoJS from "crypto-js";
export default function (message: string, key: string): string {
    return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
}