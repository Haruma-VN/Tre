"use strict";
import localization from "../../../../callback/localization.js";

export default function (pam_json: any, ratio: number) {
    const new_frame_rate = ratio * pam_json.frame_rate;
    if (new_frame_rate > 120) {
        throw new Error(localization("frame_rate_must_be_smaller_than_120fps"));
    }
    pam_json.frame_rate = new_frame_rate;
    for (let i = 0; i < pam_json.sprite.length; i++) {
        pam_json.sprite[i].frame_rate = new_frame_rate;
    }
    pam_json.main_sprite.frame_rate = new_frame_rate;
    pam_json.main_sprite.work_area = [
        pam_json.main_sprite.work_area[0],
        pam_json.main_sprite.work_area[1] * ratio,
    ];
    const frame = pam_json.main_sprite.frame;
    const new_frame = new Array();
    for (let i = 0; i < frame.length; i++) {
        let stop = false;
        frame[i].frame_rate = new_frame_rate;
        if (frame[i].stop) {
            frame[i].stop = false;
            stop = true;
        }
        new_frame.push(frame[i]);
        for (let k = 0; k < ratio - 1; k++) {
            if (stop && k === ratio - 2) {
                new_frame.push({
                    label: null,
                    stop: true,
                    command: [],
                    remove: [],
                    append: [],
                    change: [],
                });
            } else {
                new_frame.push({
                    label: null,
                    stop: false,
                    command: [],
                    remove: [],
                    append: [],
                    change: [],
                });
            }
        }
    }
    pam_json.main_sprite.frame = new_frame;
    return pam_json;
}
