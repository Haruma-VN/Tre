"use strict";
// TODOLIST: ADDING MORE ENCRYPT SYSTEM
// BASED ON https://www.npmjs.com/package/crypto-js
import md5hash from './MD5/md5hash.js';
import md5file from './MD5/md5file.js';
import sha256hash from './SHA256/sha256hash.js';
import sha256file from './SHA256/sha256file.js';
import aesencrypt from './AES/encrypt.js';
import aesdecrypt from './AES/decrypt.js';
export {
    md5hash,
    md5file,
    sha256hash,
    sha256file,
    aesencrypt,
    aesdecrypt
};