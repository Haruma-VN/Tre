"use strict";
function get_script(error: any): string {
    const stackLines = error.stack.split("\n");
    const errorLine = stackLines[1];
    const regex = /\((.+):(\d+):(\d+)\)/;
    const match = errorLine.match(regex);

    if (match) {
        const filePath = match[1];
        const fileName = filePath.split(/[\\/]/).pop();
        return fileName;
    } else {
        return "";
    }
}

export default get_script;
