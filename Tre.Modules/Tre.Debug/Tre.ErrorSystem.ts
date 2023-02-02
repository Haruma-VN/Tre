'use strict';
import fs from 'fs';
import stringify from '../Tre.Libraries/Tre.JSONSystem/stringify.js';
function TreErrorSystem(error: {} | string): void {
    const dir = "C:/Tre.Vietnam/Tre.Debug/";
    const DateBug = new Date();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const filename = ((Math.floor(Date.now() / 1000)) + '.' + month[DateBug.getMonth()] + '.' + DateBug.getDate() + '.' + DateBug.getFullYear());
    DateBug.getHours() + DateBug.getDay() + DateBug.getFullYear()
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    if (typeof error === "string") {
        return fs.writeFileSync(dir + filename + '.json', error);
    }
    else {
        return fs.writeFileSync(dir + filename + '.json', stringify(error));
    }
};
function TreErrorMessage(error: {}, message: string): void {
    if (typeof error == 'object') {
        error = stringify(error);
    };
    const dir = "C:/Tre.Vietnam/Tre.Debug/";
    const DateBug = new Date();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const filename = ((Math.floor(Date.now() / 1000)) + '.' + month[DateBug.getMonth()] + '.' + DateBug.getDate() + '.' + DateBug.getFullYear());
    DateBug.getHours() + DateBug.getDay() + DateBug.getFullYear()
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    if (typeof error === "string") {
        fs.writeFileSync(dir + filename + '.json', error);
    }
    else {
        fs.writeFileSync(dir + filename + '.json', stringify(error));
    }
    return console.log('\x1b[31m' + message + '\x1b[0m');
}
function MessageOnly(message) {
    return console.log('\x1b[31m' + message + '\x1b[0m');
}
export {
    TreErrorMessage,
    TreErrorSystem,
    MessageOnly,
}