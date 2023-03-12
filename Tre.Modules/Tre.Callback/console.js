"use strict";
import * as color from '../Tre.Libraries/Tre.Color/color.js';
import TypeReadChecker from './Public/ReadLine/origin.js';
import readline_for_json from "./Public/ReadLine/readline_for_json.js";
import any_readline from "./Public/ReadLine/any.js";
import DirectoryChecker from './Public/ReadLine/directory.js';
import FileChecker from './Public/ReadLine/file.js';
import { readline_argument, readline_char, readline_integer, readline_size, readline_texture, readline_expand, readline_normal } from '../../Tre.Modules/Tre.Progress/Readline/util.js';
export var Console;
(function (Console) {
    function WriteLine(...params) {
        let text = "";
        params.forEach((param) => {
            text += param;
        });
        return console.log(text);
    }
    Console.WriteLine = WriteLine;
    function ReadFile() {
        return FileChecker();
    }
    Console.ReadFile = ReadFile;
    function ReadDir() {
        return DirectoryChecker();
    }
    Console.ReadDir = ReadDir;
    function ReadPath() {
        return TypeReadChecker();
    }
    Console.ReadPath = ReadPath;
    function IntegerReadLine(min, max) {
        return readline_integer(min, max);
    }
    Console.IntegerReadLine = IntegerReadLine;
    function SizeReadLine() {
        return readline_size();
    }
    Console.SizeReadLine = SizeReadLine;
    function TextureQualityReadLine() {
        return readline_texture();
    }
    Console.TextureQualityReadLine = TextureQualityReadLine;
    function FileTypeReadLine(executor_file_need_avoid, file_type_but_only_extension_name) {
        return any_readline(executor_file_need_avoid, file_type_but_only_extension_name);
    }
    Console.FileTypeReadLine = FileTypeReadLine;
    function ReadJsonPath(executor_file_need_avoid) {
        return readline_for_json(executor_file_need_avoid);
    }
    Console.ReadJsonPath = ReadJsonPath;
    function ExpandReadLine(bundle) {
        return readline_expand(bundle);
    }
    Console.ExpandReadLine = ExpandReadLine;
    function ReadLine() {
        return readline_normal();
    }
    Console.ReadLine = ReadLine;
    function YNReadLine() {
        return readline_argument();
    }
    Console.YNReadLine = YNReadLine;
    function CharReadLine() {
        return readline_char();
    }
    Console.CharReadLine = CharReadLine;
    function Notify(...params) {
        let text = "";
        params.forEach((param) => {
            text += param;
        });
        return Console.WriteLine(color.fgred_string(`${text}`));
    }
    Console.Notify = Notify;
})(Console || (Console = {}));
export function foreach(array, action) {
    for (let i = 0; i < array.length; i++) {
        action(array[i], i, array);
    }
}
