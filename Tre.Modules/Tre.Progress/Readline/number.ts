"use strict";
import readlineSync from "readline-sync";
export default function (min: number, max: number): number {
    const args = new Array();
    for (let i = min; i <= max; i++) {
        args.push(i);
    };
    let message = new String();
    if (max - min === 1) {
        message = '$<lastInput> is not a valid integer number. It should be ' + min + ' or ' + max;
    }
    else {
        message = '$<lastInput> is not a valid integer number. It should in distance from [' + min + ' - ' + max + ']';
    }
    const value = readlineSync.prompt({
        limit: args,
        limitMessage: message,
    });
    return parseInt(value);
}