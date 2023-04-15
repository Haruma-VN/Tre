"use strict";
import localization from "../../callback/localization.js";
import * as color from "../../library/color/color.js";
import prompt from "./prompt.js";
export default function (min: number, max: number): number {
    const args = new Array();
    for (let i = min; i <= max; i++) {
        args.push(i);
    };
    let message = "";
    if (max - min === 1) {
        message = localization("not_a_valid_integer_number") + ' ' + localization("it_should_be") + ' ' + min + ' ' + localization("or") + ' ' + max;
    }
    else {
        message = localization("not_a_valid_integer_number") + '. ' + localization("should_be_from_min_to_max") + ' [' + min + ' - ' + max + ']';
    }
    const value = prompt("\x1b[36m◉ ", args, true, color.fgred_string(message), color.fgred_string(message), true, message);
    return parseInt(value);
}