"use strict";
import localization from "../../../callback/localization.js";
function display_argument(width: number, height: number): boolean {
    let is_valid_width: boolean = false;
    let is_valid_height: boolean = false;
    if (width >= 1 && width <= 16384) {
        is_valid_width = true;
    }

    if (height >= 1 && height <= 16384) {
        is_valid_height = true;
    }

    if (!is_valid_height) {
        throw new Error(localization("height_is_not_valid"));
    }

    if (!is_valid_width) {
        throw new Error(localization("width_is_not_valid"));
    }

    const allowance_for_compressed_popcap_ptx: Array<number> = [
        2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    ];
    if (
        allowance_for_compressed_popcap_ptx.includes(width) &&
        allowance_for_compressed_popcap_ptx.includes(height)
    ) {
        return true;
    }
    return false;
}

export default display_argument;
