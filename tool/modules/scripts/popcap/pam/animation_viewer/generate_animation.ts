"use strict";
import read_image from "./read_image.js";
import fs_js from "../../../../library/fs/implement.js";
import position_calculator from "./position_calculator.js";
import read_sprite from "./read_sprite.js";
import load_sprite from "./load_sprite.js";
import { parse } from "node:path";
import localization from "../../../../../modules/callback/localization.js";
import { Console } from "../../../../callback/console.js";
/**
 * Function to create an APNG from JSON data and image files
 *
 * @param {any} animation_json - The JSON object describing the animation
 * @param {string} animation_path - The path to the JSON file describing the animation
 * @param {string} media_path - The path to the directory containing the image files for the animation
 * @returns {void}
 */
export default async function (
    animation_json: any,
    animation_path: string,
    media_path: string
) {
    const setting: any = fs_js.create_toolkit_view("gif");
    if (
        typeof setting.texture_reslution !== "number" ||
        typeof setting.width_append !== "number" ||
        typeof setting.height_append !== "number" ||
        typeof setting.x_position_append !== "number" ||
        typeof setting.y_position_append !== "number" ||
        typeof setting.frame_rate !== "number"
    ) {
        throw new Error(localization("wrong_type"));
    }
    if (
        typeof setting.image_name_by_id !== "boolean" ||
        typeof setting.create_apng !== "boolean" ||
        typeof setting.split_label !== "boolean" ||
        typeof setting.generate_image_frames !== "boolean"
    ) {
        throw new Error(localization("wrong_type"));
    }
    if (!setting.create_apng && !setting.generate_image_frames) {
        Console.WriteLine(localization("no_mode_to_process"));
        return;
    }
    const apng_folder_path: string = `${parse(animation_path).dir}/${
        parse(animation_path).name
    }.apng`;
    const image_list: any = await read_image(
        animation_json.image,
        media_path,
        setting.image_name_by_id,
        setting.texture_reslution
    );
    const sprite_list: any = new Array();
    for (let i = 0; i < animation_json.sprite.length; i++) {
        const sprite: any = await read_sprite(
            animation_json.sprite[i],
            animation_json.sprite,
            image_list,
            sprite_list,
            Array() as any,
            i,
            Array() as any,
            animation_json.frame_rate,
            setting,
            apng_folder_path
        );
        sprite_list.push(sprite);
    }
    const max_position: any = position_calculator(animation_json);
    const sprite_could_disable = await load_sprite(
        animation_json.sprite,
        image_list,
        setting.turn_on_sprite
    );
    await read_sprite(
        animation_json.main_sprite,
        animation_json.sprite,
        image_list,
        sprite_list,
        max_position,
        -1,
        sprite_could_disable,
        animation_json.frame_rate,
        setting,
        apng_folder_path
    );
    return;
}
