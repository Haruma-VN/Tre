"use strict";
export function reset_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[0m' + text + '\x1b[0m';
}
export function bright_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[1m' + text + '\x1b[0m';
}
export function dim_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[2m' + text + '\x1b[0m';
}
export function underscore_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[4m' + text + '\x1b[0m';
}
export function blink_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[5m' + text + '\x1b[0m';
}
export function reverse_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[7m' + text + '\x1b[0m';
}
export function hidden_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[8m' + text + '\x1b[0m';
}
export function fgblack_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[30m' + text + '\x1b[0m';
}
export function fgred_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[31m' + text + '\x1b[0m';
}
export function fggreen_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[32m' + text + '\x1b[0m';
}
export function yellow_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[33m' + text + '\x1b[0m';
}
export function fgblue_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[34m' + text + '\x1b[0m';
}
export function fgmagenta_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[35m' + text + '\x1b[0m';
}
export function fgcyan_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[36m' + text + '\x1b[0m';
}
export function fgwhite_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[37m' + text + '\x1b[0m';
}
export function fggray_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[90m' + text + '\x1b[0m';
}
export function bgblack_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[40m' + text + '\x1b[0m';
}
export function bgred_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[41m' + text + '\x1b[0m';
}
export function bggreen_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[42m' + text + '\x1b[0m';
}
export function bgyellow_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[43m' + text + '\x1b[0m';
}
export function bgblue_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[44m' + text + '\x1b[0m';
}
export function bgmagenta_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[45m' + text + '\x1b[0m';
}
export function bgcyan_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[46m' + text + '\x1b[0m';
}
export function bgwhite_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[47m' + text + '\x1b[0m';
}
export function bggray_string(...params: string[]): string {
    const text: string = params.reduce((a, b) => {
        return a + b
    });
    return '\x1b[100m' + text + '\x1b[0m';
}