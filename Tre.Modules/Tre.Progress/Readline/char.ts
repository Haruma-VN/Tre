"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
export default function (): string {
    const value = readlineSync.prompt({
        limit: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
        limitMessage: color.fgred_string('$<lastInput> ' + localization("not_a_valid_char_set") + ' /\\d/g'),
    });
    return (value).toString();
}