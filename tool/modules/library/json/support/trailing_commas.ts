"use strict";
function addTrailingCommas(jsonFile: string): string {
    const data = jsonFile.split("\n");
    const lastLine = data.pop();
    const modifiedData = data.map((line) => {
        if (line.match(/^\s*[\[{]|[,{]\s*$/)) {
            return line;
        } else {
            const trimmedLine = line.trim();
            const lastChar = trimmedLine[trimmedLine.length - 1];
            if (lastChar === "," || lastChar === "{" || lastChar === "[") {
                return line;
            } else {
                return `${line},`;
            }
        }
    });
    if (lastLine && !lastLine.match(/^\s*[\]}]\s*$/)) {
        modifiedData.push(`${lastLine},`);
    } else if (lastLine) {
        modifiedData.push(lastLine);
    }
    let result = modifiedData.join("\n");
    result = result.replace(/({|\[)(\s*),(\s*)(}|])/g, "$1$2$4$5");
    return result;
}
export default addTrailingCommas;
