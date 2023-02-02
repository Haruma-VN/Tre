"use strict";
import CryptoJS from "crypto-js";
export default function (message, key) {
    return CryptoJS.AES.encrypt(message, key).toString();
}