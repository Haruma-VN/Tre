"use strict";
function get_script(error: any): {
    fileName: string;
    functionName: string;
} {
    const stackLines = error.stack.split("\n");
    const errorLine = stackLines[1];
    const regex = /at\s(.+?)\s\((.+):(\d+):(\d+)\)/;
    const match = errorLine.match(regex);

    if (match) {
        const functionName = match[1];
        const filePath = match[2];
        const fileName = filePath.split(/[\\/]/).pop();
        return {
            fileName,
            functionName,
        };
    } else {
        return {
            fileName: "",
            functionName: "",
        };
    }
}

export default get_script;
