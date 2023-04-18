"use strict";
import promptSync from "prompt-sync";
import localization from "../../callback/localization.js";
import * as color from "../../library/color/color.js";

function prompt(
    question: string = "\x1b[36m◉ ",
    range?: any,
    is_range_integer_number: boolean = false,
    exception_range_message?: string,
    not_in_range?: string,
    use_answer_as_exception_message: boolean = false,
    exception_message_here?: string
): any {
    const prompt = promptSync();
    let answer: any;
    answer = prompt(question);
    if (range === undefined || range === void 0 || range === null) {
        return answer;
    }

    if (use_answer_as_exception_message) {
        exception_range_message = color.fgred_string(
            `◉ ${localization(
                "execution_error"
            )}: ${answer} ${exception_message_here}`
        );
        not_in_range = color.fgred_string(
            `◉ ${localization(
                "execution_error"
            )}: ${answer} ${exception_message_here}`
        );
    }

    while (true) {
        if (typeof range === "string") {
            if (answer === range) {
                break;
            }
        } else if (typeof range === "number") {
            if (Number(answer) === range) {
                break;
            }
        } else if (Array.isArray(range)) {
            if (is_range_integer_number) {
                answer = parseInt(answer);
            }
            if (range.includes(answer)) {
                break;
            }
        } else {
            console.log(exception_range_message);
            answer = prompt(question);
            continue;
        }
        if (not_in_range && Array.isArray(range) && !range.includes(answer)) {
            console.log(not_in_range);
            answer = prompt(question);
            continue;
        }
        break;
    }
    return answer;
}

export default prompt;
