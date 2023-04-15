"use strict";
import localization from "../../callback/localization.js";
import prompt from "./prompt.js";
export default function (): number {
    const value = prompt("\x1b[36m◉ ", [1536, 768,384,640,1200], true, localization("not_a_valid_texture_number_input") + '. ' + localization("available") + ': "1536", "768", "384", "640", "1200"', localization("not_a_valid_texture_number_input") + '. ' + localization("available") + ': "1536", "768", "384", "640", "1200"', true, localization("not_a_valid_texture_number_input") + '. ' + localization("available") + ': "1536", "768", "384", "640", "1200"');
    return parseInt(value);
}