"use strict";
import { calculate, resize } from "../../../../library/img/resize/util.js";
import fs_js from "../../../../library/fs/implement.js";
import { ResizeImageError } from "../../../../implement/error.js";

export default async function (dir: string, orig: number | string, mod: number | string, new_dir?: string) {
    if (new_dir === null || new_dir === undefined || new_dir === void 0) {
        new_dir = `${dir}/${fs_js.parse_fs(dir).name}_${mod}.spg`;
    }
    if (typeof orig === "string") {
        orig = parseInt(orig);
    }
    if (typeof mod === "string") {
        mod = parseInt(mod);
    }
    const input: { width: number; height: number } = await fs_js
        .get_async_dimension(dir)
        .then((data: any) => data)
        .catch((error: any) => {
            throw new ResizeImageError(error.message, dir, error);
        });
    const transform_x = calculate(orig, mod);
    if (input.width / transform_x <= 1 || input.height / transform_x <= 1) {
        await resize(dir, input.width, input.height, new_dir, true);
    } else {
        await resize(dir, Math.ceil(input.width / transform_x), Math.ceil(input.height / transform_x), new_dir, true);
    }
    return new_dir;
}
