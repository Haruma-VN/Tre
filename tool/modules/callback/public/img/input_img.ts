"use strict";
import FileChecker from "../input/file.js";
import { readline_integer } from "../../../readline/util.js";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../localization.js";
async function input_img(): Promise<Array<string>> {
    const input_arr: Array<string> = new Array();
    input_loop: while (true) {
        const input_test: string = await FileChecker(".png");
        input_arr.push(input_test);
        fs_js.execution_notify(
            "argument",
            localization("would_you_like_to_input_more_path")
        );
        fs_js.execution_boolean_view();
        const input_value: number = readline_integer(0, 1);
        if (input_value === 0) {
            break input_loop;
        }
    }
    return input_arr;
}

export default input_img;
