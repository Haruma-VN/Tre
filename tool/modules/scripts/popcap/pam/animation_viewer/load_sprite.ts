"use strict";
import util from "util";
import fs_js from "../../../../library/fs/implement.js";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import { readline_integer } from "../../../../readline/util.js";
import { Console } from "../../../../callback/console.js";

export default function load_sprite(animation_sprite: string[], image_list: string[], turn_on_sprite: boolean) {
    let sprite_could_disable = new Array();
    if (turn_on_sprite) {
        return sprite_could_disable;
    } else if (animation_sprite.length === 0) {
        Console.WriteLine(color.fggreen_string(localization("sprites_not_to_choose")));
        return sprite_could_disable;
    } else {
        fs_js.execution_status("success", localization("loaded_sprites"));
        for (let i = 0; i < animation_sprite.length; i++) {
            const sprite_log = `    ${color.fgcyan_string("%d")}: '${color.fggreen_string("%s")}' - ${color.fgcyan_string("source:")} ${color.fggreen_string(
                "%s"
            )}`;
            let source_name = "";
            for (let frame of (animation_sprite[i] as any).frame) {
                const source_list = new Array();
                for (let append of frame.append) {
                    if (!append.sprite) {
                        ``;
                        source_list.push((image_list[0][append.resource][0] as any).image_name + ".png");
                    } else {
                        source_list.push(`sprite_${append.resource}`);
                    }
                }
                source_name = source_list.join(", ");
            }
            Console.WriteLine(`${util.format(sprite_log, i + 1, (animation_sprite[i] as any).name, source_name)}`);
        }
        fs_js.execution_notify("argument", localization("enter_sprites"));
        function chooseSprite() {
            let rl_sprite;
            while (true) {
                rl_sprite = readline_integer(-1, animation_sprite.length);
                if (rl_sprite === -1 || rl_sprite === 0) break;
                if (sprite_could_disable.includes(rl_sprite)) {
                    Console.WriteLine(color.fgred_string(`◉ ${localization("execution_error")}: ${localization("sprite_selected")}`));
                } else {
                    sprite_could_disable.push(rl_sprite);
                }
            }
            if (rl_sprite === -1) {
                sprite_could_disable = Array.from({ length: animation_sprite.length }, (_, i) => i + 1);
            }
        }
        chooseSprite();
        if (sprite_could_disable.length === 0) {
            Console.WriteLine(color.fggreen_string(localization("sprites_not_selected")));
        } else if (sprite_could_disable.length === animation_sprite.length) {
            Console.WriteLine(color.fggreen_string(localization("sprites_selected")));
        } else {
            Console.WriteLine(color.fggreen_string(`${localization("sprties_had_been_selected")}: `) + sprite_could_disable.join(", "));
        }
        return sprite_could_disable;
    }
}
