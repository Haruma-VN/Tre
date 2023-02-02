'use strict';
import fs from 'fs';
import stringify from '../Tre.Libraries/Tre.JSONSystem/stringify.js';
function TreErrorSystem(error) {
    const dir = "C:/Tre.Vietnam/Tre.Debug/";
    const DateBug = new Date();
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const filename = ((Math.floor(Date.now() / 1000)) + '.' + month[DateBug.getMonth()] + '.' + DateBug.getDate() + '.' + DateBug.getFullYear());
    DateBug.getHours() + DateBug.getDay() + DateBug.getFullYear()
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    };
    return fs.writeFileSync(dir + filename + '.json', error);
};
function TreErrorMessage(error, message) {
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
    fs.writeFileSync(dir + filename + '.json', error);
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
export default function () {
    TreErrorSystem,
        TreErrorMessage,
        MessageOnly
}