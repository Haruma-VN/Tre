"use strict";
import imageSize from "../Dimension/dimension.js";
import { calculate, resize } from '../Resize/util.js';
export default async function (dir, orig, mod, new_dir) {
    const input = await imageSize(dir).finally((data) => data);
    const transform_x = calculate(orig, mod);
    await resize(dir, input.width * transform_x, input.height * transform_x, new_dir).catch((error) => {
        TreErrorMessage({error: "Cannot resize spritesheet", reason: "Unknown", system: error}, "Unknown");
        return;
    });;
    return;
};