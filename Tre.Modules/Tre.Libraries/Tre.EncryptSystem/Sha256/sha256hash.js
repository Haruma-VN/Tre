"use strict";
import SHA256 from 'crypto-js/sha256.js';
export default function (message) {
    return SHA256(message).toString();
}
