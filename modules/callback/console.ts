"use strict";
import * as color from '../library/color/color.js';
import TypeReadChecker from './public/input/origin.js';
import readline_for_json from "./public/input/readline_for_json.js";
import any_readline from "./public/input/any.js";
import DirectoryChecker from './public/input/directory.js';
import FileChecker from './public/input/file.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../modules/readline/prompt/util.js';
export namespace Console {
    export function WriteLine(...params: any[]): void {
        let text: string = "";
        params.forEach((param) => {
            text += param;
        });
        return console.log(text);
    }
    
    export function ReadFile(): string {
        return FileChecker();
    }

    export function ReadDir(): string {
        return DirectoryChecker();
    }

    export function ReadPath(): string {
        return TypeReadChecker();
    }

    export function IntegerReadLine(min: number, max: number): number {
        return readline_integer(min, max);
    }

    export function SizeReadLine(): number {
        return readline_size();
    }

    export function TextureQualityReadLine(): number {
        return readline_texture();
    }

    export function FileTypeReadLine(executor_file_need_avoid: string, file_type_but_only_extension_name: string): string {
        return any_readline(executor_file_need_avoid, file_type_but_only_extension_name)
    }

    export function ReadJsonPath(executor_file_need_avoid: string): string {
        return readline_for_json(executor_file_need_avoid)
    }

    export function ExpandReadLine(bundle: number[]): number {
        return readline_expand(bundle);
    }

    export function ReadLine() {
        return readline_normal();
    }

    export function YNReadLine(): string {
        return readline_argument();
    }

    export function CharReadLine(): string {
        return readline_char();
    }

    export function Notify(...params: any[]): void {
        let text: string = "";
        params.forEach((param) => {
            text += param;
        });
        return Console.WriteLine(color.fgred_string(`${text}`));
    }
}

export function foreach(array: any[], action: (element: any, index: number, array: any[]) => void): void {
    for (let i: number = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}