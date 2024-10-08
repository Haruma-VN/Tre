"use strict";
import { createCanvas, Image, loadImage, Canvas, SKRSContext2D } from "@napi-rs/canvas";
import { decodeFrames } from "modern-gif";
import fs from "node:fs";
import * as js_json from "../json/util.js";
import path from "../../implement/path.js";
import * as color from "../color/color.js";
import localization from "../../callback/localization.js";
import zlib from "zlib";
import crypto from "crypto";
import dataview_checker from "../../callback/default/checker.js";
import { execSync } from "child_process";
import { Console } from "../../callback/console.js";
import { args, arguments_list } from "../../implement/arguments.js";
import {
    CannotReadFileSystem,
    CannotWriteFile,
    DimensionError,
    ExtensionDoesNotMeetsRequirement,
    JSONParseSyntaxError,
    JoinImageError,
    MissingFile,
    RuntimeError,
    UnknownFormat,
} from "../../implement/error.js";
interface FrameData {
    getImage: () => NodeJS.ReadableStream;
}

class fs_js {
    /*-------------------------------------------------------------------------------------------------*/

    public static get_full_path(file_system_path_as_string: string): string {
        //#region
        return path.resolve(file_system_path_as_string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static write_file(
        file_system_path: string,
        file_system_data_write_to_file: Buffer | ArrayBuffer | string,
        stop_execution_out: boolean,
        is_utf16_le: boolean = false,
    ): void {
        //#region

        if (this.js_exists(file_system_path)) {
            this.js_remove(file_system_path);
        }

        let auto_encoding_system: auto_file_system_encoding =
            file_system_data_write_to_file instanceof Buffer ? "hex" : "utf-8";
        if (is_utf16_le) {
            auto_encoding_system = "utf16le";
        }
        try {
            if (!stop_execution_out) {
                this.execution_out(file_system_path);
            }
            fs.writeFileSync(file_system_path, file_system_data_write_to_file as auto, {
                encoding: auto_encoding_system,
                flag: "w",
            });
        } catch (error: auto) {
            throw new CannotWriteFile(`${error.message}`, file_system_path);
        }
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static read_file(file_system_path: string, file_system_encoding_view: encoding_view): auto {
        //#region
        try {
            switch (file_system_encoding_view) {
                case "hex":
                    return fs.readFileSync(file_system_path, {
                        encoding: "hex",
                        flag: "r",
                    });
                case "buffer":
                    return fs.readFileSync(file_system_path);
                case "utf8":
                    return fs.readFileSync(file_system_path, {
                        encoding: "utf-8",
                        flag: "r",
                    });
                case "utf16le":
                    return fs.readFileSync(file_system_path, {
                        encoding: "utf16le",
                        flag: "r",
                    });
                default:
                    return fs.readFileSync(file_system_path) as never;
            }
        } catch (error: auto) {
            throw new CannotReadFileSystem(error.message, file_system_path, "file");
        }
        //#endregion
    }

    public static is_json_extension(file_system_path: string): bool {
        if (path.parse(file_system_path).ext.toString().toLowerCase() === ".json") {
            return true;
        }
        return false;
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static read_json(file_system_path: string, file_system_force_reading_trailing_commas: bool = true): {} {
        //#region
        if (!this.js_exists(file_system_path)) {
            throw new MissingFile(`${localization("does_not_exists")}`, `${this.resolve(file_system_path)}`);
        }
        if (!this.is_json_extension(file_system_path)) {
            throw new ExtensionDoesNotMeetsRequirement(
                `${localization("not_having_extension_json")}`,
                `${this.get_full_path(`${file_system_path}`)}`,
            );
        }
        try {
            return js_json.parse(
                this.read_file(file_system_path, "utf8"),
                file_system_path,
                file_system_force_reading_trailing_commas,
            );
        } catch (error: auto) {
            throw new JSONParseSyntaxError(`${error.message as evaluate_error}`, file_system_path);
        }
        //#endregion
    }

    public static write_json(
        file_system_output_path: string,
        file_system_json_data_view: string | {} | object,
        not_notify: boolean,
    ): void {
        //#region

        if (typeof file_system_json_data_view === "string") {
            return this.write_file(file_system_output_path, file_system_json_data_view, not_notify);
        }

        if (file_system_json_data_view instanceof Object) {
            return this.write_file(file_system_output_path, js_json.stringify(file_system_json_data_view), not_notify);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static js_exists(file_system_path: string): bool {
        //#region
        return fs.existsSync(file_system_path);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static outfile_fs(
        file_system_directory_output: string,
        file_system_data_output: auto,
        prevent_execution_out: boolean,
        file_system_is_output_directory: bool = true,
    ): void {
        //#region
        if (this.js_exists(file_system_directory_output)) {
            this.js_remove(file_system_directory_output);
        }
        const file_system_directory_output_as_list_string: Array<string> = file_system_directory_output
            .replace(/\\/g, "/")
            .split("/");
        const file_system_directory_output_as_file_string: string =
            file_system_directory_output_as_list_string.pop() as string;
        const file_system_directory_output_as_folder_of_joined_strings: string =
            file_system_directory_output_as_list_string.join("/");
        if (!fs.existsSync(file_system_directory_output_as_folder_of_joined_strings)) {
            fs.mkdirSync(file_system_directory_output_as_folder_of_joined_strings, {
                recursive: true,
            });
        }
        if (file_system_is_output_directory) {
            this.write_file(
                `${file_system_directory_output_as_folder_of_joined_strings}/${file_system_directory_output_as_file_string}`,
                file_system_data_output,
                true,
            );
        }
        if (!prevent_execution_out) {
            this.execution_out(file_system_directory_output);
        }
        return;

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static view_io_stream(file_system_file_path_as_string: string): fs.Stats {
        if (this.js_exists(file_system_file_path_as_string)) {
            return fs.statSync(file_system_file_path_as_string);
        } else {
            throw new CannotReadFileSystem(
                `${localization("cannot_specify_the_path")}`,
                `${this.get_full_path(file_system_file_path_as_string)}`,
                "unknown",
            );
        }
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static is_file(file_system_directory_input_as_string: string): bool {
        //#region
        if (this.js_exists(file_system_directory_input_as_string)) {
            return this.view_io_stream(file_system_directory_input_as_string).isFile();
        } else {
            throw new CannotReadFileSystem(
                `${localization("cannot_specify_the_path")}`,
                `${this.get_full_path(file_system_directory_input_as_string)}`,
                "unknown",
            );
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static is_directory(file_system_directory_input_as_string: string): bool {
        //#region
        if (this.js_exists(file_system_directory_input_as_string)) {
            return (
                this.view_io_stream(file_system_directory_input_as_string).isDirectory() &&
                !this.view_io_stream(file_system_directory_input_as_string).isFile()
            );
        } else {
            throw new CannotReadFileSystem(
                `${localization("cannot_specify_the_path")}`,
                `${this.get_full_path(file_system_directory_input_as_string)}`,
                "unknown",
            );
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static js_remove(file_system_delete_path: string): void {
        //#region
        if (this.js_exists(file_system_delete_path)) {
            fs.unlinkSync(file_system_delete_path);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static create_directory(
        file_system_directory_file_path_output: string,
        file_system_create_auto_recursive: boolean = false,
    ): void {
        //#region
        if (file_system_create_auto_recursive) {
            fs.mkdirSync(file_system_directory_file_path_output, {
                recursive: file_system_create_auto_recursive,
            });
        } else {
            if (!this.js_exists(file_system_directory_file_path_output)) {
                fs.mkdirSync(file_system_directory_file_path_output);
            }
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static full_reader(file_system_directory_file_path_input: string): auto {
        //#region
        const create_output_strings_array: Array<string> = new Array();
        fs.readdirSync(file_system_directory_file_path_input).forEach((file: string) => {
            let file_system_full_path_directory: string = path.join(file_system_directory_file_path_input, file);
            if (fs.lstatSync(file_system_full_path_directory).isDirectory()) {
                create_output_strings_array.push(this.full_reader(file_system_full_path_directory) as string);
            } else {
                create_output_strings_array.push(file_system_full_path_directory);
            }
        });
        return create_output_strings_array.reduce(function (
            file_system_specific_file_path: string,
            file_system_resolve_path: string,
        ) {
            return (file_system_specific_file_path as string).concat(file_system_resolve_path as string);
        },
        new Array() as auto);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static one_reader(file_system_path: string): Array<string> {
        //#region
        try {
            return fs.readdirSync(file_system_path);
        } catch (error: auto) {
            throw new CannotReadFileSystem(`${error.message}`, `${file_system_path}`, "directory");
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static get_file_extension(file_system_file_path: string): string {
        //#region
        return path.parse(file_system_file_path).base.slice(path.parse(file_system_file_path).base.indexOf("."));
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static throw_error(...expected_error_message: Array<string>): string {
        //#region
        let text: string = "";
        for (let i: number = 0; i < expected_error_message.length; ++i) {
            text += expected_error_message;
        }

        throw new Error(text as view_debug_text);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static write_stream(
        file_system_static_path: string,
        file_system_write_data_view: Buffer | ArrayBuffer | string,
    ): void {
        //#region
        const create_write_stream_fs_js: fs.WriteStream = fs.createWriteStream(file_system_static_path, {
            flags: "w",
        });
        create_write_stream_fs_js.on("error", (error: auto) => {
            throw new CannotWriteFile(`${error.message as string}`, file_system_static_path);
        });
        create_write_stream_fs_js.write(file_system_write_data_view);
        create_write_stream_fs_js.close();
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static read_stream(file_system_static_path: string): Promise<Buffer> {
        return new Promise(function (resolve: auto, reject: auto) {
            //#region
            const create_read_stream_view: fs.ReadStream = fs.createReadStream(file_system_static_path);
            create_read_stream_view.on("error", (err: evaluate_error) => {
                if ((err as any).code === "ENOENT") {
                    reject(new Error(`${localization("not_found")} ${file_system_static_path}`));
                } else {
                    reject(err as evaluate_error);
                }
            });
            const chunks: Array<Buffer> = new Array();
            create_read_stream_view.on("data" as string, (chunk: Buffer) => {
                chunks.push(chunk as Buffer);
            });
            create_read_stream_view.on("end" as string, () => {
                resolve(Buffer.concat(chunks));
            });
        });
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static return_this_tool_current_location(): string {
        //#region
        return this.get_full_path(path.dirname(args.main_js as any));
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static return_this_tool_toolkit_json_location(): string {
        //#region
        return this.get_full_path(path.dirname(args.main_js as any) + "/extension/settings/toolkit.json");
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static js_basename(
        file_system_path: string,
        force_lower_case: bool = false,
        force_upper_case: bool = false,
    ): string {
        //#region
        if (force_lower_case) {
            return path
                .basename(file_system_path as string)
                .toString()
                .toLowerCase();
        }
        if (force_upper_case) {
            return path
                .basename(file_system_path as string)
                .toString()
                .toUpperCase();
        }
        return path.basename(file_system_path as string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static js_extname(
        file_system_path: string,
        force_lower_case: bool = false,
        force_upper_case: bool = false,
    ): string {
        //#region
        if (force_lower_case) {
            return path
                .extname(file_system_path as string)
                .toString()
                .toLowerCase();
        }
        if (force_upper_case) {
            return path
                .extname(file_system_path as string)
                .toString()
                .toUpperCase();
        }
        return path.extname(file_system_path as string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static js_check_extname(file_system_path: string, input_the_system_extname_checker_as_string: string): bool {
        //#region
        const create_auto_checker: string = !(input_the_system_extname_checker_as_string.indexOf(".") === -1)
            ? input_the_system_extname_checker_as_string
            : "." + input_the_system_extname_checker_as_string;
        return (
            this.js_extname(file_system_path, true).toString().toLowerCase() ===
            create_auto_checker.toString().toLowerCase()
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static js_check_basename(
        file_system_path: string,
        input_the_system_basename_checker_as_string: string,
    ): bool {
        //#region
        return (
            this.js_basename(file_system_path, true).toString().toLowerCase() ===
            input_the_system_basename_checker_as_string.toString().toLowerCase()
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    /**
     * Copies a file from the source path to the destination path.
     * @param file_system_path_of_the_copy_start The path of the file to copy.
     * @param file_system_path_of_the_copy_end The path to copy the file to.
     * @throws Throws an error if the source file cannot be read or the destination file cannot be written.
     */

    public static fs_copy(file_system_path_of_the_copy_start: string, file_system_path_of_the_copy_end: string): void {
        const create_buffer_view_file: Buffer = this.read_file(file_system_path_of_the_copy_start, "buffer");
        this.write_file(file_system_path_of_the_copy_end, create_buffer_view_file as Buffer, false);
    }
    /*-------------------------------------------------------------------------------------------------*/

    public static fs_move(file_system_path_of_the_move_start: string, file_system_path_of_the_move_end: string): void {
        //#region
        const create_buffer_view_file: Buffer = this.read_file(file_system_path_of_the_move_start, "buffer");
        this.write_file(file_system_path_of_the_move_end, create_buffer_view_file as Buffer, false);
        this.js_remove(file_system_path_of_the_move_start);
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/

    public static fs_filesize(file_system_directory_get_file_size: string): number {
        //#region
        let create_view_file_size: number = 0;
        try {
            const check_fs_js_stats: fs.Stats = fs.statSync(file_system_directory_get_file_size);
            create_view_file_size = check_fs_js_stats.size as number;
        } catch (err: auto) {
            throw new Error(`${err.message as evaluate_error}`);
        }
        return create_view_file_size;
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/

    protected static fs_write_success(...messages: string[]): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < messages.length; ++i) {
            text += messages[i];
        }
        Console.WriteLine(text);
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/

    public static js_dir(file_system_input_path: string): string {
        //#region
        return path.dirname(file_system_input_path);
        //#endregion
    }

    public static get_dimension(
        file_system_input_path: string,
        width_output_as_property: string = "width",
        height_output_as_property: string = "height",
    ): {
        [x: string]: number;
    } {
        //#region
        if (this.js_exists(file_system_input_path)) {
            const create_image_canvas: Image = new Image();
            let dimension_image: { width: number; height: number } = { width: 0, height: 0 };
            create_image_canvas.onload = function () {
                dimension_image = {
                    width: create_image_canvas.width,
                    height: create_image_canvas.height,
                };
            };
            create_image_canvas.src = fs_js.read_file(file_system_input_path, "buffer");
            if (typeof create_image_canvas.width === "number" && typeof create_image_canvas.height === "number") {
                return {
                    [width_output_as_property]: dimension_image.width as number,
                    [height_output_as_property]: dimension_image.height as number,
                };
            } else {
                throw new DimensionError(
                    `${localization("cannot_get")} ${this.get_full_path(file_system_input_path)} ${localization(
                        "dimension",
                    )}`,
                    file_system_input_path,
                    "width",
                );
            }
        } else {
            throw new CannotReadFileSystem(
                `${localization("cannot_read")}`,
                `${this.get_full_path(file_system_input_path)}`,
                "file",
            );
        }

        //#endregion
    }

    public static async get_async_dimension(
        file_system_input_path: string,
        width_output_as_property: string = "width",
        height_output_as_property: string = "height",
    ): Promise<{
        [x: string]: number;
    }> {
        //#region
        if (this.js_exists(file_system_input_path)) {
            const { width, height } = await loadImage(file_system_input_path);
            if (typeof width === "number" && typeof height === "number") {
                return {
                    [width_output_as_property]: width as number,
                    [height_output_as_property]: height as number,
                };
            } else {
                throw new DimensionError(
                    `${localization("cannot_get")} ${this.get_full_path(file_system_input_path)} ${localization(
                        "dimension",
                    )}`,
                    file_system_input_path,
                    "height",
                );
            }
        } else {
            throw new CannotReadFileSystem(
                `${localization("cannot_read")}`,
                `${this.get_full_path(file_system_input_path)}`,
                "file",
            );
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static create_dimension(
        file_system_width: number,
        file_system_height: number,
        width_output_as_property: string = "width",
        height_output_as_property: string = "height",
    ): {
        [x: string]: number;
    } {
        //#region
        if (file_system_width < 0) {
            file_system_width = Math.abs(file_system_width);
        }

        if (file_system_height < 0) {
            file_system_height = Math.abs(file_system_height);
        }

        return {
            [width_output_as_property]:
                typeof file_system_width === "number" ? file_system_width : parseInt(file_system_width),
            [height_output_as_property]:
                typeof file_system_height === "number" ? file_system_height : parseInt(file_system_height),
        };
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static js_strict(data_view_strict: auto): data_view_strict is undefined | void | null {
        //#region
        if (data_view_strict === undefined || data_view_strict === void 0 || data_view_strict === null) {
            return true;
        }
        return false;
        //#endregion
    }

    public static extract_image(
        file_system_input_path: string,
        sharp_data_for_width: number,
        sharp_data_for_height: number,
        sharp_data_for_x: number,
        sharp_data_for_y: number,
        file_system_output_path: string | undefined,
    ): void {
        //#region
        if (
            file_system_output_path === undefined ||
            file_system_input_path === void 0 ||
            file_system_input_path === null
        ) {
            file_system_output_path = `${this.dirname(`${file_system_input_path}`)}/${this.js_basename(
                file_system_input_path,
            )}.view.png`;
        }

        this.js_remove(file_system_output_path);
        let img_extracted_png: Buffer = Buffer.alloc(0);
        if (this.js_exists(file_system_input_path)) {
            const img: Image = new Image();
            img.onload = function () {
                const canvas: Canvas = createCanvas(img.width, img.height);
                const ctx: SKRSContext2D = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const imageData: any = ctx.getImageData(
                    sharp_data_for_x,
                    sharp_data_for_y,
                    sharp_data_for_width,
                    sharp_data_for_height,
                );
                const img_extracted: Canvas = createCanvas(sharp_data_for_width, sharp_data_for_height);
                const img_extracted_ctx: SKRSContext2D = img_extracted.getContext("2d");
                img_extracted_ctx.putImageData(imageData, 0, 0);
                img_extracted_png = img_extracted.toBuffer("image/png");
            };
            img.src = fs_js.read_file(file_system_input_path, "buffer");
        }
        fs_js.outfile_fs(file_system_output_path, img_extracted_png, true);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static pack_image(
        file_system_directory_file_path_output: string,
        file_system_width: number,
        file_system_height: number,
        file_system_assertation_array: Array<{
            input: string;
            left: number;
            top: number;
        }>,
        file_system_channel_output: 3 | 4 = 4,
        file_system_adjustment_background: {
            file_system_output_red_channel?: number;
            file_system_output_blue_channel?: number;
            file_system_output_green_channel?: number;
            file_system_output_alpha_channel?: number;
        },
    ): Void {
        //#region
        if (
            file_system_adjustment_background.file_system_output_red_channel === undefined ||
            file_system_adjustment_background.file_system_output_red_channel === void 0 ||
            file_system_adjustment_background.file_system_output_red_channel === null
        ) {
            file_system_adjustment_background.file_system_output_red_channel = 0;
        }

        if (
            file_system_adjustment_background.file_system_output_blue_channel === undefined ||
            file_system_adjustment_background.file_system_output_blue_channel === void 0 ||
            file_system_adjustment_background.file_system_output_blue_channel === null
        ) {
            file_system_adjustment_background.file_system_output_blue_channel = 0;
        }

        if (
            file_system_adjustment_background.file_system_output_green_channel === undefined ||
            file_system_adjustment_background.file_system_output_green_channel === void 0 ||
            file_system_adjustment_background.file_system_output_green_channel === null
        ) {
            file_system_adjustment_background.file_system_output_green_channel = 0;
        }

        if (
            file_system_adjustment_background.file_system_output_alpha_channel === undefined ||
            file_system_adjustment_background.file_system_output_alpha_channel === void 0 ||
            file_system_adjustment_background.file_system_output_alpha_channel === null
        ) {
            file_system_adjustment_background.file_system_output_alpha_channel = 0;
        }

        const create_new_canvas_composite: Canvas = createCanvas(file_system_width, file_system_height);
        const create_new_ctx_composite: SKRSContext2D = create_new_canvas_composite.getContext("2d");
        create_new_ctx_composite.fillStyle = `rgba(${file_system_adjustment_background.file_system_output_red_channel},
            ${file_system_adjustment_background.file_system_output_blue_channel},
            ${file_system_adjustment_background.file_system_output_green_channel},
            ${file_system_adjustment_background.file_system_output_alpha_channel})`;

        for (let i = 0; i < file_system_assertation_array.length; i++) {
            const img_composite: Image = new Image();
            img_composite.onload = function () {
                const img_canvas: Canvas = createCanvas(img_composite.width, img_composite.height);
                const img_ctx: SKRSContext2D = img_canvas.getContext("2d");
                img_ctx.drawImage(img_composite, 0, 0);
                create_new_ctx_composite.drawImage(
                    img_canvas,
                    file_system_assertation_array[i].top,
                    file_system_assertation_array[i].left,
                );
            };
            img_composite.onerror = function (error: auto) {
                throw new JoinImageError(`${error.message as evaluate_error}`, file_system_directory_file_path_output);
            };
            img_composite.src = fs_js.read_file(file_system_assertation_array[i].input, "buffer");
        }
        fs_js.outfile_fs(
            file_system_directory_file_path_output,
            create_new_canvas_composite.toBuffer("image/png"),
            true,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static extract_alpha_channel(file_system_input_path: string): Buffer {
        //#region
        const img: Image = new Image();
        let alpha_channel: Uint8ClampedArray = new Uint8ClampedArray();
        img.onload = function () {
            const canvas: Canvas = createCanvas(img.width, img.height);
            const ctx: SKRSContext2D = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, img.width, img.height).data;
            const alpha: Uint8ClampedArray = new Uint8ClampedArray(imageData.length / 4);
            for (let i = 0; i < imageData.length / 4; i++) {
                alpha[i] = imageData[i * 4 + 3];
            }
            alpha_channel = alpha;
        };
        img.src = fs_js.read_file(file_system_input_path, "buffer");
        return Buffer.from(alpha_channel);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static extract_red_channel(file_system_input_path: string): Buffer {
        //#region
        const img: Image = new Image();
        let red_channel: Uint8ClampedArray = new Uint8ClampedArray();
        img.onload = function () {
            const canvas: Canvas = createCanvas(img.width, img.height);
            const ctx: SKRSContext2D = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, img.width, img.height).data;
            const red: Uint8ClampedArray = new Uint8ClampedArray(imageData.length / 4);
            for (let i = 0; i < imageData.length / 4; i++) {
                red[i] = imageData[i * 4];
            }
            red_channel = red;
        };
        img.src = fs_js.read_file(file_system_input_path, "buffer");
        return Buffer.from(red_channel);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static extract_blue_channel(file_system_input_path: string): Buffer {
        //#region
        const img: Image = new Image();
        let blue_channel: Uint8ClampedArray = new Uint8ClampedArray();
        img.onload = function () {
            const canvas: Canvas = createCanvas(img.width, img.height);
            const ctx: SKRSContext2D = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, img.width, img.height).data;
            const blue: Uint8ClampedArray = new Uint8ClampedArray(imageData.length / 4);
            for (let i = 0; i < imageData.length / 4; i++) {
                blue[i] = imageData[i * 4 + 1];
            }
            blue_channel = blue;
        };
        img.src = fs_js.read_file(file_system_input_path, "buffer");
        return Buffer.from(blue_channel);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static extract_green_channel(file_system_input_path: string): Buffer {
        //#region
        const img: Image = new Image();
        let green_channel: Uint8ClampedArray = new Uint8ClampedArray();
        img.onload = function () {
            const canvas: Canvas = createCanvas(img.width, img.height);
            const ctx: SKRSContext2D = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, img.width, img.height).data;
            const green: Uint8ClampedArray = new Uint8ClampedArray(imageData.length / 4);
            for (let i = 0; i < imageData.length / 4; i++) {
                green[i] = imageData[i * 4 + 2];
            }
            green_channel = green;
        };
        img.src = fs_js.read_file(file_system_input_path, "buffer");
        return Buffer.from(green_channel);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static extract_raw(file_system_input_path: string): Buffer {
        //#region
        const img: Image = new Image();
        let raw_channel: Uint8ClampedArray = new Uint8ClampedArray();
        img.onload = function () {
            const canvas: Canvas = createCanvas(img.width, img.height);
            const ctx: SKRSContext2D = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imageData: Uint8ClampedArray = ctx.getImageData(0, 0, img.width, img.height).data;
            raw_channel = imageData;
        };
        img.src = fs_js.read_file(file_system_input_path, "buffer");
        return Buffer.from(raw_channel);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    /* 720 = 0 + 2*360 ( k = 2 ), bỏ k*360 lấy 0 */
    /* 780 = 60 + 2*360 ( k = 2 ), bỏ k*360 lấy 60 */
    /* 810 = 110 + 2*360 ( k = 2 ), bỏ k*360 lấy 110 */

    public static degree_circle(degree: number): number {
        const k: number = Math.floor(degree / 360);
        const offset: number = k * 360;
        const result: number = degree - offset;
        return result;
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static tre_thirdparty_for_texture_compression =
        path.dirname(args.main_js as any) + "/extension/third/texture_compression.exe";

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly tre_thirdparty_for_encode =
        path.dirname(args.main_js as any) + "/extension/third/encode/";

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly tre_thirdparty_location_etcpak = this.tre_thirdparty_for_encode + "etcpak.exe";

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly tre_thirdparty_location_pvrtc = this.tre_thirdparty_for_encode + "PVRTexToolCLI.exe";

    /*-------------------------------------------------------------------------------------------------*/

    public static check_etcpak(file_system_etcpak_default_path?: string): bool {
        //#region

        if (
            file_system_etcpak_default_path === undefined ||
            file_system_etcpak_default_path === void 0 ||
            file_system_etcpak_default_path === null
        ) {
            file_system_etcpak_default_path = this.tre_thirdparty_location_etcpak;
        }

        if (this.js_exists(file_system_etcpak_default_path)) {
            return true;
        } else {
            throw new Error(
                `${localization("cannot_find_etcpak")} ${this.get_full_path(file_system_etcpak_default_path)}`,
            );
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static check_pvrtc(file_system_pvrtc_default_path?: string): bool {
        //#region

        if (
            file_system_pvrtc_default_path === undefined ||
            file_system_pvrtc_default_path === void 0 ||
            file_system_pvrtc_default_path === null
        ) {
            file_system_pvrtc_default_path = this.tre_thirdparty_location_pvrtc;
        }

        if (this.js_exists(file_system_pvrtc_default_path)) {
            return true;
        } else {
            throw new Error(
                `${localization("cannot_find_pvrtc")} ${this.get_full_path(file_system_pvrtc_default_path)}`,
            );
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static readonly tre_thirdparty_real_esrgan_location =
        path.dirname(args.main_js as any) + "/extension/third/real_esrgan";

    public static check_real_esrgan(file_system_real_esrgan_third_default_path?: string): bool {
        //#region
        if (
            file_system_real_esrgan_third_default_path === undefined ||
            file_system_real_esrgan_third_default_path === void 0 ||
            file_system_real_esrgan_third_default_path === null
        ) {
            file_system_real_esrgan_third_default_path = this.tre_thirdparty_real_esrgan_location;
        }

        if (this.js_exists(file_system_real_esrgan_third_default_path)) {
            return true;
        } else {
            throw new Error(
                `${localization("cannot_find_real_esrgan")} ${this.get_full_path(
                    file_system_real_esrgan_third_default_path,
                )}`,
            );
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_out(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(
            `${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")}${this.get_full_path(text)}`,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_in(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(
            `${color.fggreen_string("◉ " + localization("execution_in"))}:\n     ${this.get_full_path(text)}`,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_information(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(
            `${color.fggreen_string("◉ " + localization("execution_information") + ":")} ` + `${text}`,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_finish(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(`${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` + `${text}`);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_created(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(
            `${color.fggreen_string("◉ " + localization("execution_created") + ":")} ` + `${text}`,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_status(status: "failed" | "success" | "argument" | "none", ...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        switch (status) {
            case "success":
                return Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_status") + ":")} ` + `${text}`,
                );
            case "failed":
                return Console.WriteLine(
                    `${color.fgred_string("◉ " + localization("execution_status") + ":")} ` + `${text}`,
                );
            case "argument":
                return Console.WriteLine(
                    color.fgcyan_string(
                        `${color.fgcyan_string("◉ " + localization("execution_status") + ":")} ` + `${text}`,
                    ),
                );
            case "none":
                return Console.WriteLine(
                    `${color.fgwhite_string("◉ " + localization("execution_status") + ":")} ` + `${text}`,
                );
            default:
                return message as never;
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_notify(
        notify: "failed" | "success" | "argument" | "received" | "void",
        ...message: Array<auto>
    ): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        switch (notify) {
            case "success":
                return Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_finish") + ":\n     ")} ` + `${text}`,
                );
            case "failed":
                return Console.WriteLine(
                    color.fgred_string(`${"◉ " + localization("execution_failed") + ": " + `${text}`}`),
                );
            case "argument":
                return Console.WriteLine(
                    color.fgcyan_string(
                        `${color.fgcyan_string("◉ " + localization("execution_argument") + ":")} ` +
                            `${color.fgcyan_string(text)}`,
                    ),
                );
            case "received":
                return Console.WriteLine(
                    `${color.fggreen_string("◉ " + localization("execution_received") + ":\n     ")} ` + `${text}`,
                );
            case "void":
                return Console.WriteLine(`${color.fgwhite_string(text)}`);
            default:
                return message as never;
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static assertation_create(
        notify: "failed" | "success" | "argument" | "received" | "void",
        ...assertation_array: Array<string>
    ): void {
        //#region
        assertation_array.forEach(function (assertation_arg: string) {
            switch (notify) {
                case "success":
                    return Console.WriteLine(
                        `${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` +
                            `${assertation_arg}`,
                    );
                case "failed":
                    return Console.WriteLine(
                        `${color.fgred_string("◉ " + localization("execution_failed") + ":")} ` + `${assertation_arg}`,
                    );
                case "argument":
                    return Console.WriteLine(
                        `${color.fgcyan_string("◉ " + localization("execution_argument") + ":")} ` +
                            `${assertation_arg}`,
                    );
                case "received":
                    return Console.WriteLine(
                        `${color.fggreen_string("◉ " + localization("execution_received") + ":")} ` +
                            `${assertation_arg}`,
                    );
                case "void":
                    return Console.WriteLine(`${color.fgwhite_string(assertation_arg)}`);
                default:
                    return assertation_arg as never;
            }
        });
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_dimension_validate(evaluate_width: number, evaluate_height: number, file_path: string): bool {
        //#region
        if (evaluate_width <= 1 || evaluate_width >= 16384) {
            throw new DimensionError(`${localization("width_not_in_range_1_to_16384")}`, file_path, "width");
        }

        if (evaluate_height <= 1 || evaluate_height >= 16384) {
            throw new DimensionError(`${localization("height_not_in_range_1_to_16384")}`, file_path, "height");
        }

        return true;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_dimension_view_and_validate(evaluate_file_system_as_string: string): Promise<bool> {
        //#region

        const create_image_dimension_view: {
            [x: string]: number;
        } = await this.get_dimension(evaluate_file_system_as_string, "width", "height");
        const create_dimension_validator: bool = this.create_dimension_validate(
            create_image_dimension_view.width,
            create_image_dimension_view.height,
            evaluate_file_system_as_string,
        );
        if (create_dimension_validator) {
            return true;
        }
        return false;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static base64_encode(file_input_as_string: string): string {
        //#region
        return Buffer.from(file_input_as_string).toString("base64");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static base64_decode(file_input_as_string: string, encoding: js_encode): string {
        //#region
        return Buffer.from(file_input_as_string, "base64").toString(encoding);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static get_filename(file_input_as_string: string): string {
        //#region
        return path.parse(file_input_as_string).name + path.parse(file_input_as_string).ext;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_zlib_fs_js(
        file_input_as_string: string,
        zlib_level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        file_output_as_string?: string,
    ) {
        //#region
        if (file_output_as_string === undefined || file_output_as_string === void 0 || file_output_as_string === null) {
            file_output_as_string = `${this.dirname(file_input_as_string)}/${this.get_filename(
                file_input_as_string,
            )}.bin`;
        }

        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = await fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = await fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number;
        } = {
            level: zlib_level,
        };
        await create_fs_js_read_stream.pipe(zlib.createGzip(zlib_compression_option)).pipe(create_fs_js_out_stream);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_deflate_fs_js(
        file_input_as_string: string,
        zlib_level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        file_output_as_string?: string,
    ) {
        //#region
        if (file_output_as_string === undefined || file_output_as_string === void 0 || file_output_as_string === null) {
            file_output_as_string = `${this.dirname(file_input_as_string)}/${this.get_filename(
                file_input_as_string,
            )}.bin`;
        }

        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number;
        } = {
            level: zlib_level,
        };
        await create_fs_js_read_stream.pipe(zlib.createDeflate(zlib_compression_option)).pipe(create_fs_js_out_stream);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_gzip_fs_js(
        file_input_as_string: string,
        zlib_level?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9,
        file_output_as_string?: string,
    ) {
        //#region
        if (file_output_as_string === undefined || file_output_as_string === void 0 || file_output_as_string === null) {
            file_output_as_string = `${this.dirname(file_input_as_string)}/${this.get_filename(
                file_input_as_string,
            )}.bin`;
        }

        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number;
        } = {
            level: zlib_level,
        };
        await create_fs_js_read_stream.pipe(zlib.createGunzip(zlib_compression_option)).pipe(create_fs_js_out_stream);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_brotli_fs_js(file_input_as_string: string, file_output_as_string?: string) {
        //#region
        if (file_output_as_string === undefined || file_output_as_string === void 0 || file_output_as_string === null) {
            file_output_as_string = `${this.dirname(file_input_as_string)}/${this.get_filename(
                file_input_as_string,
            )}.bin`;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        await create_fs_js_read_stream.pipe(zlib.createBrotliCompress()).pipe(create_fs_js_out_stream);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static md5_hash(input_string: string): string {
        //#region
        return crypto.createHash("md5").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha1_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha1").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha256_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha256").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha512_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha512").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static ripemd160_hash(input_string: string): string {
        //#region
        return crypto.createHash("ripemd160").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static whirlpool_hash(input_string: string): string {
        //#region
        return crypto.createHash("whirlpool").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_224_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha3-224").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_256_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha3-256").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_384_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha3-384").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_512_hash(input_string: string): string {
        //#region
        return crypto.createHash("sha3-512").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static blake2b_hash(input_string: string): string {
        //#region
        return crypto.createHash("blake2b").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static blake2s_hash(input_string: string): string {
        //#region
        return crypto.createHash("blake2s").update(input_string).digest("hex");

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_hash(allocate_string: string, method: hash_method): string {
        //#region
        switch (method) {
            case "md5":
                return this.md5_hash(allocate_string);
            case "blake2b":
                return this.blake2b_hash(allocate_string);
            case "blake2s":
                return this.blake2s_hash(allocate_string);
            case "ripemd160":
                return this.ripemd160_hash(allocate_string);
            case "sha1":
                return this.sha1_hash(allocate_string);
            case "sha256":
                return this.sha256_hash(allocate_string);
            case "sha3-224":
                return this.sha3_224_hash(allocate_string);
            case "sha3-256":
                return this.sha3_256_hash(allocate_string);
            case "sha3-384":
                return this.sha3_384_hash(allocate_string);
            case "sha3-512":
                return this.sha3_512_hash(allocate_string);
            case "sha512":
                return this.sha512_hash(allocate_string);
            case "whirlpool":
                return this.whirlpool_hash(allocate_string);
            default:
                return allocate_string as never;
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly dimension_view_for_2n_square: Array<number> = [
        2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    ];

    public static async create_square_view(file_input_as_string: string): Promise<bool> {
        //#region
        const create_sharp_data_view: {
            [x: string]: number;
        } = (await this.get_dimension(file_input_as_string)) as {
            width: number;
            height: number;
        };

        let is_valid_height: bool = false;
        let is_valid_width: bool = false;

        const create_validate: bool = this.create_dimension_validate(
            create_sharp_data_view.width,
            create_sharp_data_view.height,
            file_input_as_string,
        );

        if (create_validate) {
            if (!this.dimension_view_for_2n_square.includes(create_sharp_data_view.height)) {
                is_valid_height = true;
            }

            if (!this.dimension_view_for_2n_square.includes(create_sharp_data_view.width)) {
                is_valid_width = true;
            }
        }
        if (!is_valid_width) {
            throw new DimensionError(`${localization("width_not_filled")}`, file_input_as_string, "width");
        }

        if (!is_valid_height) {
            throw new DimensionError(`${localization("height_not_filled")}`, file_input_as_string, "height");
        }
        return is_valid_height && is_valid_width;

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_resize(
        file_system_path_for_image_as_string: string,
        allocate_width: number,
        allocate_height: number,
        file_system_path_for_output_image?: string,
    ): Void {
        //#region
        if (
            file_system_path_for_output_image === null ||
            file_system_path_for_output_image === undefined ||
            file_system_path_for_output_image === void 0
        ) {
            // create output
            file_system_path_for_output_image = `${this.dirname(
                file_system_path_for_image_as_string,
            )}/${this.js_basename(file_system_path_for_image_as_string)}.output.png`;
        }
        const img_canvas: Image = new Image();
        let img_resized: Buffer = Buffer.alloc(0);
        img_canvas.onload = function () {
            const rs_canvas = createCanvas(allocate_width, allocate_height);
            const img_context: SKRSContext2D = rs_canvas.getContext("2d");
            img_context.drawImage(img_canvas, 0, 0, allocate_width, allocate_height);
            img_resized = rs_canvas.toBuffer("image/png");
        };
        img_canvas.onerror = function (err: auto) {
            if (err as auto) {
                throw new CannotWriteFile(`${err.message as string}`, file_system_path_for_image_as_string);
            }
        };
        img_canvas.src = fs_js.read_file(file_system_path_for_image_as_string, "buffer");
        fs_js.outfile_fs(file_system_path_for_output_image, img_resized, true);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static evaluate_resize_percentages(
        evaluate_percentages_number: evaluate_percentages_number,
        evaluate_width: evaluate_width,
        evaluate_height: evaluate_height,
    ): {
        width: number;
        height: number;
    } {
        //#region
        return this.create_dimension(
            evaluate_width * evaluate_percentages_number,
            evaluate_percentages_number * evaluate_height,
        ) as {
            width: number;
            height: number;
        };

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async create_dimension_resize(
        file_system_path_for_image_as_string: string,
        evaluate_number: number,
        file_system_path_for_output_image?: string,
    ): Promise<Void> {
        //#region
        const create_dimension_view: {
            width: number;
            height: number;
        } = (await this.get_dimension(file_system_path_for_image_as_string)) as {
            width: number;
            height: number;
        };

        const create_evaluate_resize_percentages: {
            width: number;
            height: number;
        } = this.evaluate_resize_percentages(
            evaluate_number,
            create_dimension_view.width,
            create_dimension_view.height,
        ) as {
            width: number;
            height: number;
        };

        /*-------------------------------------------------------------------------------------------------*/
        /**
         * Evaluate this if file_system_path_for_output_image !== undefined
         * @param file_system_path_for_output_image can be undefined ?
         * @param file_system_path_for_image_as_string cannot be undefined
         * @throws might thrown an error if no file access perm granted
         */

        file_system_path_for_output_image !== undefined &&
        file_system_path_for_output_image !== null &&
        file_system_path_for_output_image !== void 0
            ? await this.create_resize(
                  file_system_path_for_image_as_string,
                  create_evaluate_resize_percentages.width,
                  create_evaluate_resize_percentages.height,
                  file_system_path_for_output_image as string,
              )
            : await this.create_resize(
                  file_system_path_for_image_as_string,
                  create_evaluate_resize_percentages.width,
                  create_evaluate_resize_percentages.height,
              );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static assertation_test(assertation_arg: assertation_arg): bool {
        //#region

        if ((this.js_exists(assertation_arg) && this.is_file(assertation_arg)) || this.is_directory(assertation_arg)) {
            return true;
        }

        return false;

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static view_assertation(): arguments_asserations {
        //#region
        if (arguments_list.length >= 2) {
            return this.create_assertation(arguments_list);
        } else {
            throw new RuntimeError(`${localization("assertation_failed")}: arguments_list.length >= 2`);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_assertation(assertation_args: assertation_arguments): arguments_asserations {
        //#region
        const create_assertation_for_execution: arguments_asserations = new Array();
        assertation_args.slice(2);
        if (assertation_args.length > 0) {
            for (let arg of assertation_args satisfies arguments_asserations) {
                create_assertation_for_execution.push(arg as assertation_view);
            }
        }
        return create_assertation_for_execution;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly tre_debug_directory: string = path.dirname(args.main_js as any) + "/Tre.Debug";

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly month_short: Array<string> = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly month_full: Array<string> = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    /*-------------------------------------------------------------------------------------------------*/

    public static create_debug(is_full_month: bool = false, ...debug_message_as_string: debug_message): Void {
        //#region
        if (!this.js_exists(this.tre_debug_directory)) {
            this.create_directory(this.tre_debug_directory, true);
        }

        let view_debug_text: view_debug_text = "";

        if (dataview_checker.is_array(debug_message_as_string)) {
            debug_message_as_string.forEach((debug_message: auto) => {
                if (typeof debug_message === "string") {
                    (view_debug_text as view_debug_text) += debug_message satisfies view_debug_text;
                }

                if (dataview_checker.is_object(debug_message)) {
                    (view_debug_text as view_debug_text) += js_json.stringify(debug_message) satisfies view_debug_text;
                }
            });
        }
        const create_new_date_have_exception_error: Date = new Date() as Date;
        const create_new_file_name: string = is_full_month
            ? ((Math.floor(Date.now() / 1000) +
                  "." +
                  this.month_full[create_new_date_have_exception_error.getMonth()] +
                  "." +
                  create_new_date_have_exception_error.getDate() +
                  "." +
                  create_new_date_have_exception_error.getFullYear()) satisfies file_name)
            : ((Math.floor(Date.now() / 1000) +
                  "." +
                  this.month_short[create_new_date_have_exception_error.getMonth()] +
                  "." +
                  create_new_date_have_exception_error.getDate() +
                  "." +
                  create_new_date_have_exception_error.getFullYear()) satisfies file_name);
        const create_new_debug_file_save: string =
            `${this.tre_debug_directory}/${create_new_file_name}.txt` satisfies file_save;
        if (this.js_exists(create_new_debug_file_save)) {
            this.js_remove(create_new_debug_file_save);
        }
        this.write_file(
            create_new_debug_file_save as file_system_full_path_directory,
            view_debug_text satisfies view_debug_text,
            false,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static delete_debug(): Void {
        //#region
        return this.js_remove(this.tre_debug_directory);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static clear_console(): void {
        //#region
        return console.clear();
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static popcap_check_extname(
        file_system_path: string,
        input_the_system_extname_checker_as_string:
            | ".ptx"
            | ".rsb"
            | ".rton"
            | ".json"
            | ".rsg"
            | ".smf"
            | ".obb"
            | ".rsb1"
            | ".pgsr"
            | ".rsg",
    ): bool {
        //#region
        const create_auto_checker: string = !(input_the_system_extname_checker_as_string.indexOf(".") === -1)
            ? input_the_system_extname_checker_as_string
            : "." + input_the_system_extname_checker_as_string;
        return (
            this.js_extname(file_system_path, true).toString().toLowerCase() ===
            create_auto_checker.toString().toLowerCase()
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static readonly popcap_extension_list: Array<string> = [
        ".ptx",
        ".rsb",
        ".rton",
        ".json",
        ".rsg",
        ".smf",
        ".obb",
        ".rsb1",
        ".pgsr",
        ".rsg",
    ];

    /*-------------------------------------------------------------------------------------------------*/

    public static create_toolkit_view(
        create_view_option:
            | "allow_384"
            | "smart"
            | "notify_duplicate"
            | "repairDuplicateFolder"
            | "allow_atlas_info"
            | "disable_display_full_path_execution"
            | "use_other_voids"
            | "strict_mode"
            | "allow_trailing_commas"
            | "space"
            | "language"
            | "rton_cipher"
            | "using_extension_for_rsb_pack"
            | "beautify_order"
            | "beautify_res"
            | "remove_unused_info"
            | "fix_double_shadows"
            | "smart_allowance_area"
            | "cut_unused_space"
            | "progress_bar"
            | "pam_resolution"
            | "pam_to_flash"
            | "open_windows_explorer"
            | "animation_viewer"
            | "packets"
            | "host",
    ): bool | str | int | popcap_resources_render | any {
        //#region
        const toolkit_json: toolkit_json = this.read_json(
            this.return_this_tool_toolkit_json_location() satisfies str,
        ) as toolkit_json;
        switch (create_view_option as view_option) {
            case "allow_384":
                return toolkit_json.atlas.cross_resolution.allow_384 as bool;
            case "cut_unused_space":
                return toolkit_json.atlas.pack.cut_unused_space as bool;
            case "smart":
                return toolkit_json.atlas.pack.smart as bool;
            case "progress_bar":
                return toolkit_json.user.progress_bar as bool;
            case "allow_atlas_info":
                return toolkit_json.atlas.split.allow_atlas_info as bool;
            case "notify_duplicate":
                return toolkit_json.atlas.split.notify_duplicate as bool;
            case "repairDuplicateFolder":
                return toolkit_json.atlas.split.repairDuplicateFolder as bool;
            case "allow_trailing_commas":
                return toolkit_json.json.allow_trailing_commas as bool;
            case "beautify_order":
                return toolkit_json.resources.beautify_order as popcap_resources_render;
            case "beautify_res":
                return toolkit_json.resources.split.beautify_res as bool;
            case "disable_display_full_path_execution":
                return toolkit_json.display.disable_display_full_path_execution as bool;
            case "fix_double_shadows":
                return toolkit_json.resources.cat.fix_double_shadows as bool;
            case "smart_allowance_area":
                return toolkit_json.atlas.pack.smart_allowance_area as int;
            case "language":
                return toolkit_json.language as str;
            case "remove_unused_info":
                return toolkit_json.resources.split.remove_unused_info satisfies bool;
            case "rton_cipher":
                return toolkit_json.popcap_rton_conversion.rton.rton_cipher as str;
            case "space":
                return toolkit_json.json.space satisfies str;
            case "strict_mode":
                return toolkit_json.json.strict_mode satisfies bool;
            case "use_other_voids":
                return toolkit_json.extension.use_other_voids as bool;
            case "using_extension_for_rsb_pack":
                return toolkit_json.user.using_extension_for_rsb_pack as str;
            case "pam_resolution":
                return toolkit_json.popcap_resource_stream_group_unpack.simple.pam_resolution as number;
            case "pam_to_flash":
                return toolkit_json.popcap_resource_stream_group_unpack.simple.pam_to_xfl as boolean;
            case "open_windows_explorer":
                return toolkit_json.user.open_windows_explorer as bool;
            case "animation_viewer":
                return toolkit_json.animation_viewer as any;
            case "packets":
                return toolkit_json.packets as any;
            case "host":
                return toolkit_json.user.host as string;
            default:
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static readonly functions_json_location: str = this.get_full_path(
        path.dirname(args.main_js as any) + "/extension/settings/functions.json",
    );

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_auto(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(
            `${color.fggreen_string("◉ " + localization("execution_loaded") + ":\n     ")} ` + `${text}`,
        );
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_boolean_view(): void {
        //#region
        Console.WriteLine(`      0. ${localization("set_default_behavior_to_false")}`);
        Console.WriteLine(`      1. ${localization("set_default_behavior_to_true")}`);
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_padding_argument(min: number, max: number): void {
        //#region
        Console.WriteLine(
            `${color.fgcyan_string("◉ " + localization("execution_information") + ": ")}` +
                `${localization("the_padding_should_be_in_range")} ${min} ~ ${max}`,
        );
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_dimension_view(view: "width" | "height", min: number = 64, max: number = 16384): void {
        //#region
        const create_evaluate_print_message: string =
            view === "width"
                ? localization("the_width_should_be_in_range")
                : localization("the_height_should_be_in_range");
        Console.WriteLine(
            `${color.fgcyan_string("◉ " + localization("execution_information") + ": ")}` +
                `${create_evaluate_print_message} ${min} ~ ${max}`,
        );
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static create_texture_quality_argument(): void {
        //#region
        Console.WriteLine(
            `${color.fgcyan_string("◉ " + localization("execution_information") + ":\n     ")}` +
                `${localization("available_texture_quality")}: ${color.fggreen_string(`1536`)}, ${color.fggreen_string(
                    `768`,
                )}, ${color.fggreen_string(`384`)}, ${color.fggreen_string(`640`)}, ${color.fggreen_string(`1200`)}`,
        );
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static display_dimension(width: number, height: number): void {
        //#region
        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static generateFrames(gifURL = "", outputPath = "", output_name: string): string[] {
        interface DecodedFrame {
            width: number;
            height: number;
            delay: number;
            imageData: Uint8ClampedArray;
        }
        const frames: Array<DecodedFrame> = decodeFrames(this.read_file(gifURL, "buffer"));
        const create_append_list: Array<string> = new Array();
        frames.forEach((frame, index) => {
            const output_page = `${outputPath}/${output_name}_${index}.png`;
            const img_canvas: Canvas = createCanvas(frame.width, frame.height);
            const ctx: SKRSContext2D = img_canvas.getContext("2d");
            const canvas_data: any = ctx.createImageData(frame.width, frame.height);
            canvas_data.data.set(frame.imageData);
            ctx.putImageData(canvas_data, 0, 0);
            this.outfile_fs(output_page, img_canvas.toBuffer("image/png"), true);
            create_append_list.push(output_page);
        });
        return create_append_list;
    }

    public static gif_to_pngs(file_system_input_path: string, file_system_output_path?: string) {
        //#region
        if (
            file_system_output_path === undefined ||
            file_system_output_path === null ||
            file_system_output_path === void 0
        ) {
            file_system_output_path = `${this.dirname(file_system_input_path)}/${this.js_basename(
                file_system_input_path,
            )}.tre`;
        }
        if (!this.js_exists(file_system_output_path)) {
            this.create_directory(file_system_output_path, true);
        }
        try {
            const urls = this.generateFrames(
                file_system_input_path,
                file_system_output_path,
                path.parse(file_system_input_path).name,
            );
            return urls;
        } catch (error: any) {
            throw new UnknownFormat<string>(error.message as str, file_system_input_path, error, "undefined");
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static readonly manifest_build_directory = `${path.dirname(
        args.main_js as any,
    )}/extension/support/resource_build.json`;

    /*-------------------------------------------------------------------------------------------------*/

    public static copy_manifest(file_system_output_path: string): void {
        //#region
        this.execution_auto(
            localization("success_copy_resource_build") + " " + this.get_full_path(file_system_output_path),
        );
        this.execution_notify("argument", localization("edit_resource_build_argument"));
        this.fs_copy(this.manifest_build_directory, `${file_system_output_path}/resource_build.json`);
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static constxpr_and_build(file_input_as_string: string): Array<Buffer> {
        //#region
        const read_file_buffer = this.read_file(file_input_as_string, "buffer");
        const create_new_empty_memory_zone: Array<Buffer> = [];
        for (let i: number = 0; i < read_file_buffer.length; ++i) {
            create_new_empty_memory_zone[i] = Buffer.alloc(4) + read_file_buffer[i] + Buffer.alloc(2);
        }

        return create_new_empty_memory_zone;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    /**
     *
     * @param new_text_as_str - Assert string here
     * @param color - Assert color here
     * @returns - New color string
     */

    public static create_color(
        new_text_as_str: str,
        color: "red" | "blue" | "green" | "white" | "yellow" | "magenta" | "cyan" | "black",
    ): str {
        //#region
        switch (color) {
            case "red":
                return "\x1b[31m" + new_text_as_str + "\x1b[0m";
            case "blue":
                return "\x1b[34m" + new_text_as_str + "\x1b[0m";
            case "green":
                return "\x1b[32m" + new_text_as_str + "\x1b[0m";
            case "white":
                return "\x1b[37m" + new_text_as_str + "\x1b[0m";
            case "yellow":
                return "\x1b[33m" + new_text_as_str + "\x1b[0m";
            case "magenta":
                return "\x1b[35m" + new_text_as_str + "\x1b[0m";
            case "cyan":
                return "\x1b[36m" + new_text_as_str + "\x1b[0m";
            case "black":
                return "\x1b[30m" + new_text_as_str + "\x1b[0m";
            default:
                throw new Error(`${localization("cannot_find_color")}`);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static check_path(path: string): boolean {
        //#region
        try {
            fs.accessSync(path, fs.constants.R_OK);
            return true;
        } catch (err: any) {
            return false;
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static async openWindowsExplorer(dialogType: "file" | "directory", extension?: string): Promise<string> {
        //#region
        let filter = "";
        if (extension) {
            filter = `|*${extension}`;
        }

        const openFileDialog =
            dialogType === "file"
                ? `$ofd = [System.Windows.Forms.OpenFileDialog]::new(); $ofd.Title = 'Tre:Windows Explorer'; $ofd.Filter = 'Files (*${extension})${filter}'; $ofd.FileName`
                : "";
        const folderBrowserDialog =
            dialogType === "directory"
                ? `$ofd = [System.Windows.Forms.FolderBrowserDialog]::new(); $ofd.Description = 'Tre:Windows Explorer'; $ofd.SelectedPath`
                : "";

        const command = `powershell -Command "& {Add-Type -AssemblyName System.windows.forms; ${
            openFileDialog || folderBrowserDialog
        }; if ($ofd.ShowDialog() -eq 'OK') { ${openFileDialog ? "$ofd.FileName" : "$ofd.SelectedPath"} } }"`;

        try {
            const stdout = await execSync(command).toString();
            const file_path = stdout.trim();
            if (file_path) {
                return file_path;
            } else {
                return await this.openWindowsExplorer(dialogType, extension);
            }
        } catch (error) {
            throw new Error(`${error}`);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static readonly user_platform: string = process.platform;

    /*-------------------------------------------------------------------------------------------------*/

    public static encode_utf8() {
        //#region
        if (this.user_platform === "win32") {
            try {
                this.evaluate_powershell("chcp 65001");
            } catch (error: any) {
                this.execution_status("failed", error.message as string);
            }
        }
        //#endregion
    }

    /*------------------------------------------*/

    public static tool_title(title: str) {
        //#region
        process.title = title;
        //#endregion
    }

    /*--------------------------------------------------------*/

    public static deleteNonExtensionFiles(directory: string, extension: string): void {
        //#region
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);

            if (fs.lstatSync(filePath).isDirectory()) {
                this.deleteNonExtensionFiles(filePath, extension);
            } else if (!filePath.endsWith(extension)) {
                fs.unlinkSync(filePath);
            }
        }

        //#endregion
    }

    /*--------------------------------------------------------*/

    public static create_empty_media(dir_path: str): void {
        //#region
        if (this.is_directory(dir_path)) {
            this.create_directory(`${dir_path}/LIBRARY/media`, true);
        }

        //#endregion
    }

    /*--------------------------------------------------------*/

    public static delete_resource_build(folder_path: string): void {
        if (this.js_exists(`${folder_path}/resource_build.json`)) {
            this.js_remove(`${folder_path}/resource_build.json`);
        }
    }

    public static flash_anim_resize_notify(): void {
        //#region
        Console.WriteLine(`      1536. `);
        Console.WriteLine(`      768. `);
        Console.WriteLine(`      384. `);
        Console.WriteLine(`      1200. `);
        Console.WriteLine(`      640. `);
        return;
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static execution_start(...message: Array<auto>): void {
        //#region
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return Console.WriteLine(`${color.fggreen_string("◉ " + localization("execution_start") + ":")} ` + `${text}`);
        //#endregion
    }

    //-------------------------------------------

    public static generateText(length: number): string {
        //#region
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
        //#endregion
    }

    //-------------------------------------------

    public static evaluate_powershell(
        command: str,
        cwd?: str,
        stdio: "ignore" | "inherit" | "overlapped" | "pipe" = "ignore",
    ): void {
        //#region
        try {
            execSync(command, {
                cwd: cwd !== undefined && cwd !== null && cwd !== void 0 ? cwd : undefined,
                stdio: stdio !== undefined && stdio !== null && stdio !== void 0 ? stdio : undefined,
            });
        } catch (error: any) {
            throw new Error(error.message as str);
        }
        return;
        //#endregion
    }

    //-------------------------------------------

    public static using(msg: str, msg_type: "ignore" | "error" | "log" = "ignore"): void {
        switch (msg_type) {
            case "log": {
                Console.WriteLine(msg);
                break;
            }
            case "error": {
                throw new Error(msg);
            }
            default: {
                break;
            }
        }
    }

    //-------------------------------------------

    public static parse_fs(file_system_input_path: str): {
        root: string;
        dir: string;
        base: string;
        ext: string;
        name: string;
    } {
        //#region
        return path.parse(file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static dirname(file_system_input_path: str): str {
        //#region
        return path.dirname(file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static resolve(...file_system_input_path: Array<str>): str {
        //#region
        return path.resolve(...file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static basename(file_system_input_path: str): str {
        //#region
        return path.basename(file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static is_absolute(file_system_input_path: str): bool {
        //#region
        return path.isAbsolute(file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static extname(file_system_input_path: str): str {
        //#region
        return path.extname(file_system_input_path);
        //#endregion
    }

    //-------------------------------------------

    public static join_fs(...files: Array<string>): str {
        //#region
        return path.join(...files);
        //#endregion
    }

    //-------------------------------------------

    public static relative(file: string, to: str): str {
        //#region
        return path.relative(file, to);
        //#endregion
    }

    //-------------------------------------------

    public static sep(): str {
        //#region
        return path.sep;
        //#endregion
    }

    //-------------------------------------------

    public static is_host(): boolean {
        return this.create_toolkit_view("host") === "admin";
    }

    public static exception_thrown(error: string): void {
        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_thrown") + ":\n"}     ${error}`));
    }

    public static execution_exception_type(error: string): void {
        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_error_type") + ": "}${error}`));
    }

    public static execution_load(file_path: string) {
        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_actual_size") + ":\n"}     ${file_path}`));
    }

    public static execution_error(error: string): void {
        Console.WriteLine(color.fgred_string(`◉ ${localization("execution_error") + ": "}${error}`));
    }
}

export default fs_js;
