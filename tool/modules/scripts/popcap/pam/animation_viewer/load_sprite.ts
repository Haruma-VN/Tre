"use strict";
import util from "util";
import fs_js from "../../../../library/fs/implement.js";
import localization from "../../../../callback/localization.js";
import * as color from "../../../../library/color/color.js";
import { readline_integer } from "../../../../readline/util.js";
export default function (
    pam_sprite: string[],
    image_list: string[],
    turn_on_sprite: boolean
) {
    let sprite_could_disable = new Array();
    if (turn_on_sprite) {
        return sprite_could_disable;
    } else {
        fs_js.execution_status("success", "Loaded all sprites");
        for (let i = 0; i < pam_sprite.length; i++) {
            const sprite_log = `    ${color.fgcyan_string(
                "%d"
            )}: '${color.fggreen_string("%s")}' - ${color.fgcyan_string(
                "source:"
            )} ${color.fggreen_string("%s")}`;
            let source_name = "";
            for (let frame of (pam_sprite[i] as any).frame) {
                const source_list = new Array();
                for (let append of frame.append) {
                    if (!append.sprite) {
                        ``;
                        source_list.push(
                            (image_list[append.resource][0] as any).image_name +
                                ".png"
                        );
                    } else {
                        source_list.push(`sprite_${append.resource}`);
                    }
                }
                source_name = source_list.join(", ");
            }
            console.log(
                `${util.format(
                    sprite_log,
                    i + 1,
                    (pam_sprite[i] as any).name,
                    source_name
                )}`
            );
        }
        fs_js.execution_notify(
            "argument",
            "Please enter the number of sprite you want to disable, enter -1 to select all, enter 0 to finish"
        );
        function chooseSprite() {
            let rl_sprite;
            while (true) {
                rl_sprite = readline_integer(-1, pam_sprite.length);
                if (rl_sprite === -1 || rl_sprite === 0) break;
                if (sprite_could_disable.includes(rl_sprite)) {
                    console.log(
                        color.fgred_string(
                            `◉ ${localization(
                                "execution_error"
                            )}: Sprite had been selected`
                        )
                    );
                } else {
                    sprite_could_disable.push(rl_sprite);
                }
            }
            if (rl_sprite === -1) {
                sprite_could_disable = Array.from(
                    { length: pam_sprite.length },
                    (_, i) => i + 1
                );
            }
        }
        chooseSprite();
        if (sprite_could_disable.length === 0) {
            console.log(color.fggreen_string("No sprite is selected"));
        } else if (sprite_could_disable.length === pam_sprite.length) {
            console.log(color.fggreen_string("All sprites is selected"));
        } else {
            console.log(
                color.fggreen_string("The selected sprites are: ") +
                    sprite_could_disable.join(", ")
            );
        }
        return sprite_could_disable;
    }
}
