"use strict";
import readImage from "./read_image.js";
import loadSprite from "./load_sprite.js";
import readSprite from "./read_sprite.js";
import readMainSprite from "./read_mainsprite.js";
import positionCalculator from "./position_calculator.js";
import pam_json_decode from "../decode/read_pam.js";
import fs_js from "../../../../library/fs/implement.js";
export default async function (
    pam_data: any,
    pam_path: string,
    media_path: string
) {
    const pam_json = await pam_json_decode(pam_data);
    const setting: any = fs_js.create_toolkit_view("gif");
    if (
        typeof setting.texture_reslution !== "number" ||
        typeof setting.width_append !== "number" ||
        typeof setting.height_append !== "number" ||
        typeof setting.x_position_append !== "number" ||
        typeof setting.y_position_append !== "number" ||
        typeof setting.gif_loop !== "number" ||
        typeof setting.gif_quality !== "number" ||
        typeof setting.frame_rate !== "number"
    ) {
        throw new Error("");
    }
    if (
        typeof setting.image_name_by_id !== "boolean" ||
        typeof setting.create_gif !== "boolean" ||
        typeof setting.split_label !== "boolean" ||
        typeof setting.generate_image_frames !== "boolean"
    ) {
        throw new Error("");
    }
    if (setting.algorithm !== "neuquant" && setting.algorithm !== "octree") {
        throw new Error("invaid algorithm mode");
    }
    if (setting.gif_quality > 30 || setting.gif_quality < 0) {
        throw new Error("gif_quality in setting must be range of 0 - 30");
    }
    const max_position = positionCalculator(pam_json);
    const image_list = await readImage(
        pam_json.image,
        media_path,
        setting.image_name_by_id,
        setting.texture_reslution
    );
    const sprite_list = await readSprite(pam_json.sprite, image_list);
    const sprite_could_disable = await loadSprite(
        pam_json.sprite,
        image_list,
        setting.turn_on_sprite
    );
    await readMainSprite(
        pam_json.main_sprite,
        pam_json.sprite,
        image_list,
        sprite_list,
        max_position,
        pam_path,
        pam_json.frame_rate,
        sprite_could_disable,
        setting
    );
}
