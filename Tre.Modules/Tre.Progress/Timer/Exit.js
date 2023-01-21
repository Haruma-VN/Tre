"use strict";
export default async function (time) {
    console.log('\x1b[32m' + 'Time spent: ' + time + 's' + '\x1b[0m');
    console.log('\x1b[32m' + 'Press any key to exit this execution...' + '\x1b[0m');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
};