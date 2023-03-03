"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
export default function (): number {
    const value = readlineSync.prompt({
        limit: [1536, 768, 384, 640, 1200],
        limitMessage: color.fgred_string(`! ${localization("execution_error")}:` +' $<lastInput> ' + localization("not_a_valid_texture_number_input") + '. ' + localization("available") + ': "1536", "768", "384", "640", "1200"'),
    });
    return parseInt(value);
}