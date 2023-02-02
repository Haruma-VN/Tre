"use strict";
import CryptoJS from "crypto-js";
export default function (message: string, key: string): string {
    return CryptoJS.AES.encrypt(message, key).toString();
}