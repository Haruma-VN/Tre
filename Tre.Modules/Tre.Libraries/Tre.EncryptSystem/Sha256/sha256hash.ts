"use strict";
import SHA256 from 'crypto-js/sha256.js';
export default function (message: string): string {
    return SHA256(message).toString()
}