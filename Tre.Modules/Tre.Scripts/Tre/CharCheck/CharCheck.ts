"use strict";
import NumericCheck from "./NumericCheck.js";
type StringData = {
    UpperCase: string[],
    LowerCase: string[],
    Number: string[],
}
export default function (data: any): StringData {
    const UpperCaseList: string[] = new Array();
    const LowerCaseList: string[] = new Array();
    const NumberList: string[] = new Array();
    for (let i: number = 0; i < data.length; i++) {
        // Check if Char is numeric
        if (NumericCheck(data[i]) && data[i] != undefined && data[i] != null) {
            if (data[i] === data[i].toUpperCase()) {
                UpperCaseList.push(data[i])
            }
            else if (data[i] === data[i].toLowerCase()) {
                LowerCaseList.push(data[i])
            } else {
                continue;
            }
        }
        //If char is numeric goes here
        else if (data[i] != ' ' && data[i] != '' && data[i] != undefined && data[i] != null) {
            NumberList.push(data[i])
        }
        //  Ignore the undefined content in the string
        else {
            continue;
        }
    };
    return {
        UpperCase: UpperCaseList,
        LowerCase: LowerCaseList,
        Number: NumberList,
    };
}