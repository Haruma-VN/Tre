"use strict";
import CryptoJS from "crypto-js";
export default function (message, key) {
    return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
}
