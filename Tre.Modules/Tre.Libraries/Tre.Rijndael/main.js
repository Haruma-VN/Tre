"use strict";
import Rijndael from 'rijndael-js';
import fs from 'fs';
const encrypted = Buffer.from(fs.readFileSync('./PLANTTYPES.RTON'));
const key = '65bd1b2305f46eb2806b935aab7630bb'
const iv = (key)
const decipher = new Rijndael(key, 'cbc');
const decryptedPadded = decipher.decrypt(encrypted, 256, iv);
const decrypted = padder.unpad(decryptedPadded, 32);
const clearText = decrypted.toString('utf8');

console.log(clearText);
// ciphertext.toString("base64");
// const plaintext = (cipher.decrypt(ciphertext, 256, iv));
// fs.writeFileSync('./PLANTTYPES.MOD.RTON', Buffer.toString(ciphertext))
// console.log(Buffer.toString(plaintext))
// original === plaintext.toString();