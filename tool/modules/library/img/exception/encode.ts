"use strict";
import localization from "../../../callback/localization.js";

function exception_encode_dimension(width: number, height: number): boolean {
    // 2^n
    const allowed_items_for_this_dimension: Array<number> = [
        4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    ];

    const standard_dimension: number = Math.min(
        ...allowed_items_for_this_dimension
    );

    if (height < standard_dimension) {
        throw new Error(
            `${localization(
                "the_height_is_too_small"
            )}, this.height >= ${standard_dimension}`
        );
    }

    if (width < standard_dimension) {
        throw new Error(
            `${localization(
                "the_width_is_too_small"
            )}, this.width >= ${standard_dimension}`
        );
    }

    if (!allowed_items_for_this_dimension.includes(width)) {
        throw new Error(`${localization("width_not_filled_with_2n")}`);
    }

    if (!allowed_items_for_this_dimension.includes(height)) {
        throw new Error(`${localization("height_not_filled_with_2n")}`);
    }

    return true;
}
export default exception_encode_dimension;
