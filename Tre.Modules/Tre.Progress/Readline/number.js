"use strict";
import readlineSync from "readline-sync";
export default function (min, max) {
    const args = new Array();
    for (let i = min; i <= max; i++) {
        args.push(i);
    };
    let message = new String();
    if (max - min === 1) {
        message = '$<lastInput> is not a valid integer number. It should be 1 or 2'
    }
    else {
        message = '$<lastInput> is not a valid integer number. It should in distance from [' + min + ' - ' + max + ']';
    }
    const value = readlineSync.prompt({
        limit: args,
        limitMessage: message,
    });
    return value;
}