"use strict";
import localization from "../../../callback/localization.js";

function max_sharp(width: number, height: number): void {
    let is_valid_width: boolean = false;
    if (1 <= width && width <= 16384) {
        is_valid_width = true;
    }
    let is_valid_height: boolean = false;
    if (1 <= height && height <= 16384) {
        is_valid_height = true;
    }
    if (!is_valid_width) {
        throw new Error(`${localization("width_is_not_valid")}`);
    }
    if (!is_valid_height) {
        throw new Error(`${localization("height_is_not_valid")}`);
    }
}

export default max_sharp;
