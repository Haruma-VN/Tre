"use strict";
export default function(message){
    return console.log(Buffer.from(message).toString('base64'));
}