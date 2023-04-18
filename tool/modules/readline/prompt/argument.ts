"use strict";
import prompt from "./prompt.js";
import localization from "../../callback/localization.js";
import * as color from "../../library/color/color.js";
export default function (): string {
    const value = prompt(
        "\x1b[36m◉ ",
        ["y", "n"],
        false,
        color.fgred_string(localization("not_a_valid_boolean_input_argument")),
        color.fgred_string(
            `! ${localization("execution_error")}:` +
                localization("not_a_valid_boolean_input_argument")
        ),
        true,
        localization("not_a_valid_boolean_input_argument")
    );
    return value.toString();
}
