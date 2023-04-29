"use strict";

function get_extension(filename: string) {
    const firstDotIndex = filename.indexOf(".");
    if (firstDotIndex === -1) {
        return "";
    }
    return filename.substring(firstDotIndex);
}

export default get_extension;
