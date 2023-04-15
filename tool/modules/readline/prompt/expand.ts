"use strict";
import localization from "../../callback/localization.js";
import * as color from "../../library/color/color.js";
import prompt from "./prompt.js";
export default function (bundle: number[]): number {
    let value:any = prompt("\x1b[36m◉ ", bundle, true, color.fgred_string(`◉ ${localization("execution_error")}:` + ` ${localization("not_a_valid_input_argument")}`), color.fgred_string(color.fgred_string(`◉ ${localization("execution_error")}:` + ` ${localization("not_a_valid_input_argument")}`)))
    return parseInt(value);
}