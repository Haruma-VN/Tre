"use strict";
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
export namespace Console {
    export function WriteLine(...params: any[]): void {
        let text: string = "";
        params.forEach((param) => {
            text += param;
        });
        return console.log(text);
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

    export function Notify(...params: any[]): void{
        let text: string = "";
        params.forEach((param) => {
            text += param;
        });
        return Console.WriteLine(color.fgred_string(`${text}`));
    }
}