"use strict";
import imageSize from "../Dimension/dimension.js";
import { calculate, resize } from '../Resize/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
export default async function (dir: string, orig: number | string, mod: number | string, new_dir: string) {
    if (typeof orig === 'string') {
        orig = parseInt(orig);
    }
    if (typeof mod === 'string') {
        mod = parseInt(mod);
    }
    const input: { width: number, height: number } = await imageSize(dir).then((data: any) => data).catch((error) => {
        TreErrorMessage({ error: "Cannot get dimension of image", system: error.toString() }, error)
    }).finally(() => { });
    const transform_x = calculate(orig, mod);
    await resize(dir, input.width * transform_x, input.height * transform_x, new_dir).catch((error) => {
        TreErrorMessage({ error: "Cannot resize spritesheet", reason: "Unknown", system: error.toString() }, "Unknown bug occur please check debug folder for more details.");
        return;
    });;
    return;
};