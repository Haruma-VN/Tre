"use strict";
import readlineSync from "readline-sync";
import localization from "../../Tre.Callback/localization.js";
export default function (): number {
    const value = readlineSync.prompt({
        limit: [1536, 768, 384, 640, 1200],
        limitMessage: '$<lastInput> ' + localization("not_a_valid_texture_number_input") + '. ' + localization("available") + ': "1536", "768", "384", "640", "1200"',
    });
    return parseInt(value);
}