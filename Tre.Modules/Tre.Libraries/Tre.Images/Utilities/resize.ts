"use strict";
import imageSize from "../Dimension/dimension.js";
import { calculate, resize } from '../Resize/util.js';
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import localization from "../../../Tre.Callback/localization.js";
export default async function (dir: string, orig: number | string, mod: number | string, new_dir: string) {
    if (typeof orig === 'string') {
        orig = parseInt(orig);
    }
    if (typeof mod === 'string') {
        mod = parseInt(mod);
    }
    const input: { width: number, height: number } = await imageSize(dir).then((data: any) => data).catch((error: any) => {
        TreErrorMessage({ error: localization("cannot_get_image_dimension"), system: error.message.toString() }, error)
    }).finally(() => { });
    const transform_x = calculate(orig, mod);
    if (input.width / transform_x <= 1 || input.height / transform_x <= 1) {
        await resize(dir, input.width, input.height, new_dir);
    }
    else {
        await resize(dir, Math.ceil(input.width / transform_x), Math.ceil(input.height / transform_x), new_dir);
    }
    return;
};