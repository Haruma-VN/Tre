"use strict";
export default function (message) {
    return console.log(Buffer.from(message, 'base64').toString('ascii'));
};