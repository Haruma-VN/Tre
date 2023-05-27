"use strict";
import localization from "../../../callback/localization.js";
import { DimensionError } from "../../../implement/error.js";

function max_sharp(width: number, height: number, file_path: string): void {
    let is_valid_width: boolean = false;
    if (1 <= width && width <= 16384) {
        is_valid_width = true;
    }
    let is_valid_height: boolean = false;
    if (1 <= height && height <= 16384) {
        is_valid_height = true;
    }
    if (!is_valid_width) {
        throw new DimensionError(`${localization("width_is_not_valid")}`, file_path, "width");
    }
    if (!is_valid_height) {
        throw new DimensionError(`${localization("height_is_not_valid")}`, file_path, "height");
    }
    return;
}

export default max_sharp;
