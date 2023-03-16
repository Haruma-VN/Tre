"use strict";
import localization from "../../Tre.Callback/localization.js";
import prompt from "./prompt.js";
export default function (): number {
    const value = prompt("\x1b[36m◉ ", [16384, 8192, 4096, 2048, 1024, 512, 256, 128, 64],
        true, `! ${localization("execution_error")}:` + ' $<lastInput> ' + localization("not_a_valid_texture_number_input") + ' ' + localization("available") + ': "16384", "8192", "4096", "2048", "1024", "512", "256", "128", "64", "32"',
        `! ${localization("execution_error")}:` + ' $<lastInput> ' + localization("not_a_valid_texture_number_input") + ' ' + localization("available") + ': "16384", "8192", "4096", "2048", "1024", "512", "256", "128", "64", "32"',
        true, localization("not_a_valid_texture_number_input") + ' ' + localization("available") + ': "16384", "8192", "4096", "2048", "1024", "512", "256", "128", "64", "32"')
    return parseInt(value);
}