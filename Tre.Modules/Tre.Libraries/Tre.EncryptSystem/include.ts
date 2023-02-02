"use strict";
export default function (): {}[] {
    return [
        {
            parent: "util.js",
            utilities: true,
            modules: [
                "md5hash", "md5file", "sha256hash", "sha256file", "aesencrypt", "aesdecrypt",
            ]
        },
        {
            child: "./MD5/md5hash.js",
            description: "MD5 Hash",
            parent: "util.js",
            function: "md5hash",
        },
        {
            child: "./MD5/md5file.js",
            description: "MD5 Hash",
            parent: "util.js",
            function: "md5file",
        },
        {
            child: "./Sha256/sha256hash.js",
            description: "SHA256 Hash",
            parent: "util.js",
            function: "sha256hash",
        },
        {
            child: "./Sha256/sha256hash.js",
            description: "SHA256 Hash",
            parent: "util.js",
            function: "sha256file",
        },
        {
            child: "./AES/encrypt.js",
            description: "AES Encrypt",
            parent: "util.js",
            function: "aesencrypt",
        },
        {
            child: "./AES/decrypt.js",
            description: "AES Decrypt",
            parent: "util.js",
            function: "aesdecrypt",
        },]
}