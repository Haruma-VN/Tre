"use strict";
export default async function (js_string) {
    await eval(js_string);
    return;
}
