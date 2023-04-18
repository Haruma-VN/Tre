"use strict";
export default function (pam_json: any) {
    let extrajson = pam_json;
    delete extrajson.frame_rate;
    delete extrajson.size;
    for (let i = 0; i < extrajson.image.length; i++) {
        delete extrajson.image[i].transform;
    }
    for (let k = 0; k < extrajson.sprite.length; k++) {
        delete extrajson.sprite[k].description;
        delete extrajson.sprite[k].frame_rate;
        delete extrajson.sprite[k].work_area;
        delete extrajson.sprite[k].frame;
    }
    delete extrajson.main_sprite.description;
    delete extrajson.main_sprite.frame_rate;
    delete extrajson.main_sprite.work_area;
    delete extrajson.main_sprite.frame;
    return extrajson;
}
