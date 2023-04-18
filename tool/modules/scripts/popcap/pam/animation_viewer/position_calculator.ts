"use strict";
export default function (pam_json: any) {
    const x_tranformArray = new Array();
    const y_transformArray = new Array();
    function pushSpritePositon(sprite: any) {
        for (let frame of sprite.frame) {
            for (let move of frame.change) {
                x_tranformArray.push(move.transform[move.transform.length - 2]);
                y_transformArray.push(
                    move.transform[move.transform.length - 1]
                );
            }
        }
    }
    function getMin(arr: any) {
        return arr.reduce(
            (min: number, v: number) => (min <= v ? min : v),
            Infinity
        );
    }
    for (let i = 0; i < pam_json.image.length; i++) {
        x_tranformArray.push(pam_json.image[i].transform[4]);
        y_transformArray.push(pam_json.image[i].transform[5]);
    }
    for (let k = 0; k < pam_json.sprite.length; k++) {
        pushSpritePositon(pam_json.sprite[k]);
    }
    pushSpritePositon(pam_json.main_sprite);
    const x_tranform = Math.abs(Math.floor(getMin(x_tranformArray)));
    const y_transform = Math.abs(Math.floor(getMin(y_transformArray)));
    return [x_tranform, y_transform];
}
