"use strict";
import localization from "../../Tre.Callback/localization.js";
import * as color from "../../Tre.Libraries/Tre.Color/color.js";
import prompt from "./prompt.js";
export default function (bundle: number[]): number {
    let value:any = prompt("\x1b[36mâ ", bundle, true, color.fgred_string(`â ${localization("execution_error")}:` + ` ${localization("not_a_valid_input_argument")}`), color.fgred_string(color.fgred_string(`â ${localization("execution_error")}:` + ` ${localization("not_a_valid_input_argument")}`)))
    return parseInt(value);
}