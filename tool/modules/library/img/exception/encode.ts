"use strict";
import localization from "../../../callback/localization.js";
import { DimensionError } from "../../../implement/error.js";

function exception_encode_dimension(width: number, height: number, file_path: string): boolean {
    // 2^n
    const allowed_items_for_this_dimension: Array<number> = [
        4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    ];

    const standard_dimension: number = Math.min(...allowed_items_for_this_dimension);

    if (height < standard_dimension) {
        throw new DimensionError(
            `${localization("the_height_is_too_small")}, this.height >= ${standard_dimension}`,
            file_path,
            "height",
        );
    }

    if (width < standard_dimension) {
        throw new DimensionError(
            `${localization("the_width_is_too_small")}, this.width >= ${standard_dimension}`,
            file_path,
            "width",
        );
    }

    if (!allowed_items_for_this_dimension.includes(width)) {
        throw new DimensionError(`${localization("width_not_filled_with_2n")}`, file_path, "width");
    }

    if (!allowed_items_for_this_dimension.includes(height)) {
        throw new DimensionError(`${localization("height_not_filled_with_2n")}`, file_path, "height");
    }

    return true;
}
export default exception_encode_dimension;
