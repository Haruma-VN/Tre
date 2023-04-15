"use strict";
export default async function (js_string: string): Promise<void> {
    await eval(js_string);
    return;
}