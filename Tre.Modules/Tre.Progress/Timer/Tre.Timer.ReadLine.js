"use strict";
export default async function (readline, callback) {
    const before = Date.now();
    const obj = await readline();
    callback(obj);
    const now = Date.now();
    const time = (now - before);
    console.log('\x1b[32m' + 'Time spent: ' + time + '\x1b[0m');
    console.log('\x1b[32m' + 'Press any key to exit this execution...' + '\x1b[0m');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
}