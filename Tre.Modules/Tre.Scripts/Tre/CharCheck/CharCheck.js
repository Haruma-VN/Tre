"use strict";
import NumericCheck from "./NumericCheck.js";
export default function (data) {
    const UpperCaseList = new Array();
    const LowerCaseList = new Array();
    const NumberList = new Array();
    for (let i = 0; i < data.length; i++) {
        // Check if Char is numeric
        if (NumericCheck(data[i]) && data[i] != undefined && data[i] != null) {
            if (data[i] === data[i].toUpperCase()) {
                UpperCaseList.push(data[i]);
            }
            else if (data[i] === data[i].toLowerCase()) {
                LowerCaseList.push(data[i]);
            }
            else {
                continue;
            }
        }
        //If char is numeric goes here
        else if (data[i] != ' ' && data[i] != '' && data[i] != undefined && data[i] != null) {
            NumberList.push(data[i]);
        }
        //  Ignore the undefined content in the string
        else {
            continue;
        }
    }
    ;
    return {
        UpperCase: UpperCaseList,
        LowerCase: LowerCaseList,
        Number: NumberList,
    };
}
