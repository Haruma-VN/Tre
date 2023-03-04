"use strict";
import localization from "../../Tre.Callback/localization.js";
import prompt from "./prompt.js";
export default function (): string {
    const value = prompt("\x1b[36m◉ ", ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'], 
    false, `! ${localization("execution_error")}:` +' $<lastInput> ' + localization("not_a_valid_char_set") + ' /\\d/g', `! ${localization("execution_error")}:` +' $<lastInput> ' + localization("not_a_valid_char_set") + ' /\\d/g',
    true, localization("not_a_valid_char_set") + ' /\\d/g');
    return (value).toString();
}