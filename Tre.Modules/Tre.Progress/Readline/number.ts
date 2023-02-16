"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
export default function (min: number, max: number): number {
    const args = new Array();
    for (let i = min; i <= max; i++) {
        args.push(i);
    };
    let message = new String();
    if (max - min === 1) {
        message = '$<lastInput> ' + localization("not_a_valid_integer_number") + ' ' + localization("it_should_be") + ' ' + min + ' ' + localization("or") + ' ' + max;
    }
    else {
        message = '$<lastInput> ' + localization("not_a_valid_integer_number") + '. ' + localization("should_be_from_min_to_max") + ' [' + min + ' - ' + max + ']';
    }
    const value = readlineSync.prompt({
        limit: args,
        limitMessage: message,
    });
    return parseInt(value);
}