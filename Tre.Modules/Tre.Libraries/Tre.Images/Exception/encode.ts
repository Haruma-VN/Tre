"use strict";
import localization from "../../../Tre.Callback/localization.js";

function exception_encode_dimension(width: number, height: number): void {
    // 2^n
    const allowed_items_for_this_dimension: Array<number> = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384];
    if (!allowed_items_for_this_dimension.includes(width)){
        throw new Error(`${localization("width_not_filled_with_2n")}`);
    }
    if(!allowed_items_for_this_dimension.includes(height)){
        throw new Error(`${localization("height_not_filled_with_2n")}`);
    }
}
export default exception_encode_dimension;