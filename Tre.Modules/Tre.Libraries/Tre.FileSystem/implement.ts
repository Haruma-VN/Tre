"use strict";
import fs from "fs";
import * as js_json from "../Tre.JSONSystem/util.js";
import path from "path";

class fs_js {

    constructor() {

    }

    /*-------------------------------------------------------------------------------------------------*/
    static get_full_path(
        file_system_path_as_string: string,
    ): string {
        //#region 
        return path.resolve(file_system_path_as_string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static write_file<T,>(
        file_system_path: string,
        file_system_data_write_to_file: Buffer | ArrayBuffer | string
    ): void {
        //#region 
        const auto_encoding_system: "hex" | "utf-8" = (file_system_data_write_to_file instanceof Buffer) ? "hex" : "utf-8";
        try {
            fs.writeFileSync(file_system_path,
                (file_system_data_write_to_file as any),
                {
                    encoding: auto_encoding_system,
                    flag: "w",
                })
        } catch (error: any) {
            throw new Error(`Write ${this.get_full_path(file_system_path)} failed, code ${error.message}`)
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static read_file(
        file_system_path: string,
        file_system_encoding_view: "buffer" | "utf8",
    ): any {
        //#region 
        const create_file_system_encoding_view: "hex" | "utf-8" = (file_system_encoding_view == "buffer") ? "hex" : "utf-8";
        try {
            return fs.readFileSync(file_system_path, {
                encoding: create_file_system_encoding_view,
                flag: "r"
            })
        } catch (error: any) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, code ${error.message}`);
        }
        //#endregion
    }

    static is_json_extension(
        file_system_path: string,
    ): boolean {
        if (path.parse(file_system_path).ext.toString().toLowerCase() === ".json") {
            return true;
        }
        return false;
    }

    /*-------------------------------------------------------------------------------------------------*/
    static read_json(
        file_system_path: string,
        file_system_force_reading_trailing_commas: boolean = true,
    ): {} {
        //#region 
        if (!this.is_json_extension(file_system_path)) {
            throw new Error(`${this.get_full_path(`${file_system_path}`)} is not having the extension ".json"`);
        }
        try {
            return js_json.parse(this.read_file(file_system_path, "utf8"), file_system_force_reading_trailing_commas);
        } catch (error: any) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, the json file might be corrupted ${error.message}`)
        }
        //#endregion
    }

    static write_json(
        file_system_output_path: string,
        file_system_json_data_view: string | {} | object
    ): void {
        //#region 

        if (typeof file_system_json_data_view === "string") {
            return this.write_file(file_system_output_path, file_system_json_data_view);
        }

        if (file_system_json_data_view instanceof Object) {
            return this.write_file(file_system_output_path,
                js_json.stringify(file_system_json_data_view));
        }


        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static js_exists(
        file_system_path: string,
    ): boolean {
        //#region 
        return fs.existsSync(file_system_path);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static outfile_fs(
        file_system_directory_output: string,
        file_system_data_output: any,
        file_system_is_output_directory: boolean = true,
    ): void {
        //#region 
        const file_system_directory_output_as_list_string: Array<string> = file_system_directory_output
            .replace(/\\/g, '/').split("/");
        const file_system_directory_output_as_file_string: string = file_system_directory_output_as_list_string.pop() as string;
        const file_system_directory_output_as_folder_of_joined_strings: string = file_system_directory_output_as_list_string.join("/");
        if (!fs.existsSync(file_system_directory_output_as_folder_of_joined_strings)) {
            fs.mkdirSync(file_system_directory_output_as_folder_of_joined_strings, { recursive: true })
        }
        if (file_system_is_output_directory) {
            this.write_file(`${file_system_directory_output_as_folder_of_joined_strings}/${file_system_directory_output_as_file_string}`,
                file_system_data_output)
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static view_io_stream(
        file_system_file_path_as_string: string,
    ): fs.Stats {
        if (this.js_exists(file_system_file_path_as_string)) {
            return fs.statSync(file_system_file_path_as_string);
        }
        else {
            throw new Error(`Cannot specify the path ${this.get_full_path(file_system_file_path_as_string)}`);
        }
    }

    /*-------------------------------------------------------------------------------------------------*/
    static is_file(
        file_system_directory_input_as_string: string
    ): boolean {
        //#region 
        if (this.js_exists(file_system_directory_input_as_string)) {
            return (this.view_io_stream(file_system_directory_input_as_string).isFile());
        }
        else {
            throw new Error(`Cannot specify the path ${this.get_full_path(file_system_directory_input_as_string)}`)
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static is_directory(
        file_system_directory_input_as_string: string
    ): boolean {
        //#region 
        if (this.js_exists(file_system_directory_input_as_string)) {
            return (this.view_io_stream(file_system_directory_input_as_string).isDirectory()
                && !this.view_io_stream(file_system_directory_input_as_string).isFile());
        }
        else {
            throw new Error(`Cannot find specify the path ${this.get_full_path(file_system_directory_input_as_string)}`)
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static js_remove(
        file_system_delete_path: string,
    ): void {
        //#region 
        if (this.js_exists(file_system_delete_path)) {
            fs.unlinkSync(file_system_delete_path);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static create_directory(
        file_system_directory_file_path_output: string
    ): void {

        //#region 
        if (this.js_exists(file_system_directory_file_path_output)) {
            this.js_remove(file_system_directory_file_path_output);
        }

        fs.mkdirSync(file_system_directory_file_path_output);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static full_reader(
        file_system_directory_file_path_input: string
    ): any {
        //#region 
        const create_output_strings_array: Array<string> = new Array();
        fs.readdirSync(file_system_directory_file_path_input).forEach((file: string) => {
            let file_system_full_path_directory: string = path.join(file_system_directory_file_path_input, file);
            if (fs.lstatSync(file_system_full_path_directory).isDirectory()) {
                create_output_strings_array.push((this.full_reader(file_system_full_path_directory) as string));
            } else {
                create_output_strings_array.push(file_system_full_path_directory);
            }
        });
        return create_output_strings_array.reduce(function (
            file_system_specific_file_path: string,
            file_system_resolve_path: string
        ) {
            return (file_system_specific_file_path as string).concat((file_system_resolve_path as string))
        }, (new Array() as any));
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    static one_reader(
        file_system_path: string
    ): Array<string> {
        //#region 
        try {
            return fs.readdirSync(file_system_path);
        } catch (error: any) {
            throw new Error(`Cannot read the path ${this.get_full_path(file_system_path)}, code ${error.message}`);
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static get_file_extension(
        file_system_file_path: string,
    ): string {
        //#region 
        return (path.parse(file_system_file_path).base.slice(path.parse(file_system_file_path).base.indexOf(".")))
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static throw_error(
        ...expected_error_message: Array<string>
    ): string {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < expected_error_message.length; ++i) {
            text += expected_error_message;
        }

        return (text) as string;
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    static write_stream(
        file_system_static_path: string,
        file_system_write_data_view: Buffer | ArrayBuffer | string,
    ): void {
        //#region 
        const create_write_stream_fs_js: fs.WriteStream = fs.createWriteStream(
            file_system_static_path, {
            flags: 'w'
        });
        create_write_stream_fs_js.on('error', function (error: any) {
            throw new Error(`${fs_js.throw_error(`Write failed to ${error.message as string}`)}`);
        });
        create_write_stream_fs_js.write(file_system_write_data_view);
        create_write_stream_fs_js.end();
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static read_stream(
        file_system_static_path: string,
    ): Promise<Buffer> {
        return new Promise(function (
            resolve: any,
            reject: any) {
            //#region 
            const create_read_stream_view: fs.ReadStream = fs.createReadStream(file_system_static_path);
            create_read_stream_view.on('error', (err: NodeJS.ErrnoException) => {
                if ((err.code) as string === 'ENOENT') {
                    reject(new Error(`Not found ${file_system_static_path}`));
                } else {
                    reject(err as NodeJS.ErrnoException);
                }
            });
            const chunks: Array<Buffer> = new Array();
            create_read_stream_view.on('data' as string, (chunk: Buffer) => {
                chunks.push(chunk as Buffer);
            });
            create_read_stream_view.on('end' as string, () => {
                resolve(Buffer.concat(chunks));
            });
        });
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static return_this_tool_current_location(): string {
        //#region 
        return this.get_full_path(process.cwd());
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static return_this_tool_toolkit_json_location(): string {
        //#region 
        return this.get_full_path(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static js_basename(
        file_system_path: string,
        force_lower_case: boolean = false,
        force_upper_case: boolean = false,
    ): string {
        //#region 
        if (force_lower_case) {
            return path.basename(file_system_path as string).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.basename(file_system_path as string).toString().toUpperCase();
        }
        return path.basename(file_system_path as string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    static js_extname(
        file_system_path: string,
        force_lower_case: boolean = false,
        force_upper_case: boolean = false,
    ): string {
        //#region 
        if (force_lower_case) {
            return path.extname(file_system_path as string).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.extname(file_system_path as string).toString().toUpperCase();
        }
        return path.extname(file_system_path as string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    static js_check_extname(
        file_system_path: string,
        input_the_system_extname_checker_as_string: string,
    ): boolean {
        //#region 
        const create_auto_checker: string = (!(input_the_system_extname_checker_as_string.indexOf(".") === -1)) ? input_the_system_extname_checker_as_string :
            "." + input_the_system_extname_checker_as_string;
        return (this.js_extname(file_system_path, true).toString().toLowerCase() === create_auto_checker.toString().toLowerCase());
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    static js_check_basename(
        file_system_path: string,
        input_the_system_basename_checker_as_string: string,
    ): boolean {
        //#region 
        return (this.js_basename(file_system_path, true).toString().toLowerCase() === input_the_system_basename_checker_as_string.toString().toLowerCase());
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    /**
     * Copies a file from the source path to the destination path.
     * @param file_system_path_of_the_copy_start The path of the file to copy.
     * @param file_system_path_of_the_copy_end The path to copy the file to.
     * @throws Throws an error if the source file cannot be read or the destination file cannot be written.
     */


    static fs_copy(
        file_system_path_of_the_copy_start: string,
        file_system_path_of_the_copy_end: string
    ): void {
        const create_buffer_view_file: Buffer = this.read_file(file_system_path_of_the_copy_start,
            "buffer");
        this.write_file(file_system_path_of_the_copy_end, create_buffer_view_file as Buffer);
    }
    /*-------------------------------------------------------------------------------------------------*/


    static fs_move(
        file_system_path_of_the_move_start: string,
        file_system_path_of_the_move_end: string
    ): void {
        //#region 
        const create_buffer_view_file: Buffer = this.read_file(file_system_path_of_the_move_start,
            "buffer");
        this.write_file(file_system_path_of_the_move_end, create_buffer_view_file as Buffer);
        this.js_remove(file_system_path_of_the_move_start);
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/

    static fs_filesize(
        file_system_directory_get_file_size: string,
    ): number {
        //#region 
        let create_view_file_size: number = 0;
        try {
            const check_fs_js_stats: fs.Stats = fs.statSync(file_system_directory_get_file_size);
            create_view_file_size = check_fs_js_stats.size as number;
        } catch (err: any) {
            throw new Error(`${err.message as NodeJS.ErrnoException}`);
        }
        return create_view_file_size;
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/


    protected fs_write_success(...messages: string[]): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < messages.length; ++i) {
            text += messages[i];
        }
        console.log(text);
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/
}

export default fs_js;