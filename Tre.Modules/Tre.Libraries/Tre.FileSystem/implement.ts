"use strict";
import fs from "fs";
import * as js_json from "../Tre.JSONSystem/util.js";
import path from "path";
import sharp from "sharp";
import * as color from "../Tre.Color/color.js";
import localization from "../../Tre.Callback/localization.js";
import zlib from "zlib";
import crypto from "crypto";
import dataview_checker from "../../Tre.Callback/Default/checker.js";

class fs_js {

    /*-------------------------------------------------------------------------------------------------*/
    public static get_full_path(
        file_system_path_as_string: string,
    ): string {
        //#region 
        return path.resolve(file_system_path_as_string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static write_file<T,>(
        file_system_path: string,
        file_system_data_write_to_file: Buffer | ArrayBuffer | string
    ): void {
        //#region 
        const auto_encoding_system: auto_file_system_encoding = (file_system_data_write_to_file instanceof Buffer) ? "hex" : "utf-8";
        try {
            fs.writeFileSync(file_system_path,
                (file_system_data_write_to_file as auto),
                {
                    encoding: auto_encoding_system,
                    flag: "w",
                })
        } catch (error: auto) {
            throw new Error(`Write ${this.get_full_path(file_system_path)} failed, code ${error.message}`)
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static read_file(
        file_system_path: string,
        file_system_encoding_view: encoding_view,
    ): auto {
        //#region 
        try {
            switch (file_system_encoding_view) {
                case "hex":
                    return fs.readFileSync(file_system_path, {
                        encoding: "hex",
                        flag: "r",
                    })
                case "buffer":
                    return fs.readFileSync(file_system_path);
                case "utf8":
                    return fs.readFileSync(file_system_path, {
                        encoding: "utf-8",
                        flag: "r",
                    })
                default:
                    return fs.readFileSync(file_system_path) as never;
            }
        } catch (error: auto) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, code ${error.message}`);
        }
        //#endregion
    }

    public static is_json_extension(
        file_system_path: string,
    ): bool {
        if (path.parse(file_system_path).ext.toString().toLowerCase() === ".json") {
            return true;
        }
        return false;
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static read_json(
        file_system_path: string,
        file_system_force_reading_trailing_commas: bool = true,
    ): {} {
        //#region 
        if (!this.is_json_extension(file_system_path)) {
            throw new Error(`${this.get_full_path(`${file_system_path}`)} is not having the extension ".json"`);
        }
        try {
            return js_json.parse(this.read_file(file_system_path, "utf8"), file_system_force_reading_trailing_commas);
        } catch (error: auto) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, the json file might be corrupted ${error.message as evaluate_error}`)
        }
        //#endregion
    }

    public static write_json(
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
    public static js_exists(
        file_system_path: string,
    ): bool {
        //#region 
        return fs.existsSync(file_system_path);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static outfile_fs(
        file_system_directory_output: string,
        file_system_data_output: auto,
        file_system_is_output_directory: bool = true,
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
    public static view_io_stream(
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
    public static is_file(
        file_system_directory_input_as_string: string
    ): bool {
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
    public static is_directory(
        file_system_directory_input_as_string: string
    ): bool {
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
    public static js_remove(
        file_system_delete_path: string,
    ): void {
        //#region 
        if (this.js_exists(file_system_delete_path)) {
            fs.unlinkSync(file_system_delete_path);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static create_directory(
        file_system_directory_file_path_output: string,
        file_system_create_auto_recursive: bool = false,
    ): void {

        //#region 
        if (this.js_exists(file_system_directory_file_path_output)) {
            this.js_remove(file_system_directory_file_path_output);
        }

        fs.mkdirSync(file_system_directory_file_path_output, {
            recursive: file_system_create_auto_recursive,
        });
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static full_reader(
        file_system_directory_file_path_input: string
    ): auto {
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
        }, (new Array() as auto));
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/
    public static one_reader(
        file_system_path: string
    ): Array<string> {
        //#region 
        try {
            return fs.readdirSync(file_system_path);
        } catch (error: auto) {
            throw new Error(`Cannot read the path ${this.get_full_path(file_system_path)}, code ${error.message}`);
        }
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static get_file_extension(
        file_system_file_path: string,
    ): string {
        //#region 
        return (path.parse(file_system_file_path).base.slice(path.parse(file_system_file_path).base.indexOf(".")))
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static throw_error(
        ...expected_error_message: Array<string>
    ): string {
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
        const create_write_stream_fs_js: fs.WriteStream = fs.createWriteStream(
            file_system_static_path, {
            flags: 'w',
        });
        create_write_stream_fs_js.on('error', (error: auto) => {
            throw new Error(`${this.throw_error(`Write failed to ${error.message as string}`)}`);
        });
        create_write_stream_fs_js.write(file_system_write_data_view);
        create_write_stream_fs_js.end();
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static read_stream(
        file_system_static_path: string,
    ): Promise<Buffer> {
        return new Promise(function (
            resolve: auto,
            reject: auto) {
            //#region 
            const create_read_stream_view: fs.ReadStream = fs.createReadStream(file_system_static_path);
            create_read_stream_view.on('error', (err: evaluate_error) => {
                if ((err.code) as string === 'ENOENT') {
                    reject(new Error(`Not found ${file_system_static_path}`));
                } else {
                    reject(err as evaluate_error);
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

    public static return_this_tool_current_location(): string {
        //#region 
        return this.get_full_path(process.cwd());
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static return_this_tool_toolkit_json_location(): string {
        //#region 
        return this.get_full_path(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
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
            return path.basename(file_system_path as string).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.basename(file_system_path as string).toString().toUpperCase();
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
            return path.extname(file_system_path as string).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.extname(file_system_path as string).toString().toUpperCase();
        }
        return path.extname(file_system_path as string);
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static js_check_extname(
        file_system_path: string,
        input_the_system_extname_checker_as_string: string,
    ): bool {
        //#region 
        const create_auto_checker: string = (!(input_the_system_extname_checker_as_string.indexOf(".") === -1)) ? input_the_system_extname_checker_as_string :
            "." + input_the_system_extname_checker_as_string;
        return (this.js_extname(file_system_path, true).toString().toLowerCase() === create_auto_checker.toString().toLowerCase());
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static js_check_basename(
        file_system_path: string,
        input_the_system_basename_checker_as_string: string,
    ): bool {
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


    public static fs_copy(
        file_system_path_of_the_copy_start: string,
        file_system_path_of_the_copy_end: string
    ): void {
        const create_buffer_view_file: Buffer = this.read_file(file_system_path_of_the_copy_start,
            "buffer");
        this.write_file(file_system_path_of_the_copy_end, create_buffer_view_file as Buffer);
    }
    /*-------------------------------------------------------------------------------------------------*/


    public static fs_move(
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

    public static fs_filesize(
        file_system_directory_get_file_size: string,
    ): number {
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
        console.log(text);
        //#endregion
    }
    /*-------------------------------------------------------------------------------------------------*/


    public static js_dir(
        file_system_input_path: string,
    ): string {
        //#region 
        return path.dirname(file_system_input_path);
        //#endregion
    }


    public static async get_dimension(
        file_system_input_path: string,
        width_output_as_property: string = "width",
        height_output_as_property: string = "height"
    ): Promise<{
        [x: string]: number;
    }> {
        //#region 
        if (!this.js_exists(file_system_input_path)) {
            const create_image_nodejs_sharp_view: sharp.Sharp = sharp(file_system_input_path);
            const create_auto_view_dimension: sharp.Metadata = await create_image_nodejs_sharp_view.metadata();

            if ("width" in create_auto_view_dimension && "height" in create_auto_view_dimension &&
                typeof (create_auto_view_dimension.width) === "number" && typeof (create_auto_view_dimension.height) === "number") {
                return {
                    [width_output_as_property]: create_auto_view_dimension.width as number,
                    [height_output_as_property]: create_auto_view_dimension.height as number,
                }
            }

            else {
                throw new Error(`Cannot get ${this.get_full_path(file_system_input_path)} dimension`);
            }
        }
        else {
            throw new Error(`Cannot read ${this.get_full_path(file_system_input_path)}`);
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
        [x: string]: number
    } {
        //#region 
        if (file_system_width < 0) {
            file_system_width = Math.abs(file_system_width);
        }

        if (file_system_height < 0) {
            file_system_height = Math.abs(file_system_height);
        }

        return {
            [width_output_as_property]: (typeof file_system_width === "number") ? file_system_width : parseInt(file_system_width),
            [height_output_as_property]: (typeof file_system_height === "number") ? file_system_height : parseInt(file_system_height),
        }
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static js_strict(
        data_view_strict: auto
    ): data_view_strict is undefined | void | null {
        //#region 
        if (data_view_strict === undefined || data_view_strict === void 0 || data_view_strict === null) {
            return true;
        }
        return false;
        //#endregion
    }



    public static async extract_image(
        file_system_input_path: string,
        sharp_data_for_width: number,
        sharp_data_for_height: number,
        sharp_data_for_x: number,
        sharp_data_for_y: number,
        file_system_output_path: string | undefined,
    ): Promise<Void> {
        //#region 
        if (file_system_output_path === undefined || file_system_input_path === void 0 || file_system_input_path === null) {
            file_system_output_path = `${(file_system_input_path)}/../${this.js_basename(file_system_input_path)}.view.png`;
        }

        this.js_remove(file_system_output_path);


        if (this.js_exists(file_system_input_path)) {
            await sharp(file_system_input_path)
                .extract({
                    width: (sharp_data_for_width),
                    height: (sharp_data_for_height),
                    left: (sharp_data_for_x),
                    top: (sharp_data_for_y)
                }).toFile(file_system_output_path).catch(function (error: auto) {
                    throw new Error(`Cannot create ${fs_js.get_full_path(file_system_output_path as string)}, and the error is ${error.message as evaluate_error}`);
                })
        }
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    public static async pack_image(
        file_system_directory_file_path_output: string,
        file_system_width: number,
        file_system_height: number,
        file_system_assertation_array: Array<{
            input: string,
            left: number,
            top: number,
        }>,
        file_system_channel_output: 3 | 4 = 4,
        file_system_adjustment_background:
            {
                file_system_output_red_channel?: number,
                file_system_output_blue_channel?: number,
                file_system_output_green_channel?: number,
                file_system_output_alpha_channel?: number,
            }
    ): Promise<Void> {
        //#region 
        if (file_system_adjustment_background.file_system_output_red_channel == undefined || file_system_adjustment_background.file_system_output_red_channel == void 0
            || file_system_adjustment_background.file_system_output_red_channel == null) {
            file_system_adjustment_background.file_system_output_red_channel = 0;
        }

        if (file_system_adjustment_background.file_system_output_blue_channel == undefined || file_system_adjustment_background.file_system_output_blue_channel == void 0
            || file_system_adjustment_background.file_system_output_blue_channel == null) {
            file_system_adjustment_background.file_system_output_blue_channel = 0;
        }

        if (file_system_adjustment_background.file_system_output_green_channel == undefined || file_system_adjustment_background.file_system_output_green_channel == void 0
            || file_system_adjustment_background.file_system_output_green_channel == null) {
            file_system_adjustment_background.file_system_output_green_channel = 0;
        }

        if (file_system_adjustment_background.file_system_output_alpha_channel == undefined || file_system_adjustment_background.file_system_output_alpha_channel == void 0
            || file_system_adjustment_background.file_system_output_alpha_channel == null) {
            file_system_adjustment_background.file_system_output_alpha_channel = 0;
        }

        const create_new_sharp_composite: sharp.Sharp = sharp({
            create: {
                width: file_system_width,
                height: file_system_height,
                channels: file_system_channel_output,
                background: ({
                    r: file_system_adjustment_background.file_system_output_red_channel,
                    b: file_system_adjustment_background.file_system_output_blue_channel,
                    g: file_system_adjustment_background.file_system_output_green_channel,
                    alpha: file_system_adjustment_background.file_system_output_alpha_channel,
                })
            }
        })
        await create_new_sharp_composite.composite(file_system_assertation_array)
            .toFile(file_system_directory_file_path_output).catch((error: auto) => {
                throw new Error(`Cannot pack image because ${error.message as evaluate_error}`);
            });
        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/

    public static async extract_alpha_channel(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        return await sharp(file_system_input_path).extractChannel("alpha").toBuffer();
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static async extract_red_channel(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        return await sharp(file_system_input_path).extractChannel("red").toBuffer();
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/
    public static async extract_blue_channel(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        return await sharp(file_system_input_path).extractChannel("blue").toBuffer();
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static async extract_green_channel(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        return await sharp(file_system_input_path).extractChannel("green").toBuffer();
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static async extract_raw(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        return await sharp(file_system_input_path).raw().toBuffer();
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    /* 720 = 0 + 2*360 ( k = 2 ), bỏ k*360 lấy 0 */
    /* 780 = 60 + 2*360 ( k = 2 ), bỏ k*360 lấy 60 */
    /* 810 = 110 + 2*360 ( k = 2 ), bỏ k*360 lấy 110 */

    public static degree_circle(
        degree: number
    ): number {
        const k: number = Math.floor(degree / 360);
        const offset: number = k * 360;
        const result: number = degree - offset;
        return result;
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static async rotate_image(
        file_system_input_path: string,
        angle: number,
    ): Promise<Buffer> {
        //#region
        angle = (angle > 360) ? this.degree_circle(angle) : angle;
        const create_sharp_rotation: Buffer = await sharp(file_system_input_path)
            .rotate(angle).toBuffer();

        return create_sharp_rotation;
        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/

    public static async flip_image(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        const create_sharp_flip: Buffer = await sharp(file_system_input_path).flip().toBuffer();
        return create_sharp_flip
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static async flop_image(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        const create_sharp_flop: Buffer = await sharp(file_system_input_path).flop().toBuffer();
        return create_sharp_flop
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/



    public static async blur_image(
        file_system_input_path: string,
        blur_level: number,
    ): Promise<Buffer> {
        //#region 
        const create_js_sharp_blur: Buffer = await sharp(file_system_input_path)
            .blur(blur_level).toBuffer();
        return create_js_sharp_blur
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/



    public static async negate_image(
        file_system_input_path: string,
        negate_channel_alpha: bool = false,
    ): Promise<Buffer> {
        //#region 
        const create_js_sharp_negate: Buffer = (negate_channel_alpha) ? await sharp(file_system_input_path)
            .negate({ alpha: true })
            .toBuffer() : await sharp(file_system_input_path)
                .negate()
                .toBuffer();

        return create_js_sharp_negate;

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    public static async normalize_image(
        file_system_input_path: string,
    ): Promise<Buffer> {
        //#region 
        const create_sharp_js_normalize: Buffer = await sharp(file_system_input_path).normalize().toBuffer();
        return create_sharp_js_normalize;

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    protected static readonly tre_thirdparty_for_encode = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly tre_thirdparty_location_etcpak = this.tre_thirdparty_for_encode + "etcpak.exe";


    /*-------------------------------------------------------------------------------------------------*/



    protected static readonly tre_thirdparty_location_pvrtc = this.tre_thirdparty_for_encode + "PVRTexToolCLI.exe";



    /*-------------------------------------------------------------------------------------------------*/

    public static check_etcpak(
        file_system_etcpak_default_path?: string,
    ): bool {
        //#region 

        if (file_system_etcpak_default_path === undefined || file_system_etcpak_default_path === void 0 || file_system_etcpak_default_path === null) {
            file_system_etcpak_default_path = this.tre_thirdparty_location_etcpak;
        }


        if (this.js_exists(file_system_etcpak_default_path)) {
            return true;
        }
        else {
            throw new Error(`Cannot find ETCPAK in ${this.get_full_path(file_system_etcpak_default_path)}`);
        }
        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/


    public static check_pvrtc(
        file_system_pvrtc_default_path?: string,
    ): bool {
        //#region 

        if (file_system_pvrtc_default_path === undefined || file_system_pvrtc_default_path === void 0 || file_system_pvrtc_default_path === null) {
            file_system_pvrtc_default_path = this.tre_thirdparty_location_pvrtc;
        }


        if (this.js_exists(file_system_pvrtc_default_path)) {
            return true;
        }


        else {
            throw new Error(`Cannot find PVRTCTexToolCli in ${this.get_full_path(file_system_pvrtc_default_path)}`);
        }

        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/


    protected static readonly tre_thirdparty_real_esrgan_location = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale";


    public static check_real_esrgan(
        file_system_real_esrgan_third_default_path?: string,
    ): bool {
        //#region 
        if (file_system_real_esrgan_third_default_path === undefined || file_system_real_esrgan_third_default_path === void 0 || file_system_real_esrgan_third_default_path === null) {
            file_system_real_esrgan_third_default_path = this.tre_thirdparty_real_esrgan_location;
        }


        if (this.js_exists(file_system_real_esrgan_third_default_path)) {
            return true;
        }


        else {
            throw new Error(`Cannot find Real-ESRGAN in ${this.get_full_path(file_system_real_esrgan_third_default_path)}`);
        }
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/



    public static execution_out(
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_out") + ":\n     ")}${this.get_full_path(text)}`);
        //#endregion

    }



    /*-------------------------------------------------------------------------------------------------*/

    public static execution_in(
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_in"))}: ${this.get_full_path(text)}`);
        //#endregion

    }



    /*-------------------------------------------------------------------------------------------------*/

    public static execution_information(
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_information") + ":")} ` + `${(text)}`);
        //#endregion

    }


    /*-------------------------------------------------------------------------------------------------*/

    public static execution_finish(
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` + `${(text)}`);
        //#endregion

    }


    /*-------------------------------------------------------------------------------------------------*/

    public static execution_created(
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_created") + ":")} ` + `${(text)}`);
        //#endregion

    }


    /*-------------------------------------------------------------------------------------------------*/



    public static execution_status(
        status: "failed" | "success" | "argument" | "none",
        ...message: Array<auto>
    ): void {
        //#region 
        let text: string = "";
        for (let i: number = 0; i < message.length; ++i) {
            text += message;
        }
        switch (status) {
            case "success":
                return console.log(`${color.fggreen_string("◉ " + localization("execution_status") + ":")} ` + `${(text)}`);
            case "failed":
                return console.log(`${color.fgred_string("◉ " + localization("execution_status") + ":")} ` + `${(text)}`);
            case "argument":
                return console.log(`${color.fgcyan_string("◉ " + localization("execution_status") + ":")} ` + `${(text)}`);
            case "none":
                return console.log(`${color.fgwhite_string("◉ " + localization("execution_status") + ":")} ` + `${(text)}`);
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
                return console.log(`${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` + `${(text)}`);
            case "failed":
                return console.log(`${color.fgred_string("◉ " + localization("execution_failed") + ":")} ` + `${(text)}`);
            case "argument":
                return console.log(`${color.fgcyan_string("◉ " + localization("execution_argument") + ":")} ` + `${(text)}`);
            case "received":
                return console.log(`${color.fggreen_string("◉ " + localization("execution_received") + ":")} ` + `${(text)}`);
            case "void":
                return console.log(`${color.fgwhite_string(text)}`);
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
                    return console.log(`${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` + `${(assertation_arg)}`);
                case "failed":
                    return console.log(`${color.fgred_string("◉ " + localization("execution_failed") + ":")} ` + `${(assertation_arg)}`);
                case "argument":
                    return console.log(`${color.fgcyan_string("◉ " + localization("execution_argument") + ":")} ` + `${(assertation_arg)}`);
                case "received":
                    return console.log(`${color.fggreen_string("◉ " + localization("execution_received") + ":")} ` + `${(assertation_arg)}`);
                case "void":
                    return console.log(`${color.fgwhite_string(assertation_arg)}`);
                default:
                    return assertation_arg as never;
            }
        })
        //#endregion

    }




    /*-------------------------------------------------------------------------------------------------*/



    public static create_dimension_validate(
        evaluate_width: number,
        evaluate_height: number,
    ): bool {
        //#region 
        if (evaluate_width <= 1 || evaluate_width >= 16384) {
            throw new Error(`The width is not in range of 1 to 16384`);
        }

        if (evaluate_height <= 1 || evaluate_height >= 16384) {
            throw new Error(`The height is not in range of 1 to 16384`);
        }

        return true;
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/


    public static async create_dimension_view_and_validate(
        evaluate_file_system_as_string: string,
    ): Promise<bool> {

        //#region 

        const create_image_dimension_view: {
            [x: string]: number
        } = await this.get_dimension(
            evaluate_file_system_as_string,
            "width",
            "height");
        const create_dimension_validator: bool = this.create_dimension_validate(
            create_image_dimension_view.width,
            create_image_dimension_view.height);
        if (create_dimension_validator) {
            return true;
        }
        return false;
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/




    public static base64_encode(
        file_input_as_string: string,
    ): string {
        //#region 
        return Buffer.from(file_input_as_string)
            .toString("base64");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/



    public static base64_decode(
        file_input_as_string: string,
        encoding: js_encode,
    ): string {
        //#region 
        return Buffer.from(file_input_as_string, "base64")
            .toString(encoding);

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    public static get_filename(
        file_input_as_string: string,
    ): string {
        //#region 
        return (path.parse(file_input_as_string).name + path.parse(file_input_as_string).ext);
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
            file_output_as_string = `${file_input_as_string}/../${this.get_filename(file_input_as_string)}.bin`;
        }


        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = await fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = await fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number,
        } = {
            level: zlib_level
        };
        await create_fs_js_read_stream
            .pipe(zlib.createGzip(zlib_compression_option))
            .pipe(create_fs_js_out_stream);

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
            file_output_as_string = `${file_input_as_string}/../${this.get_filename(file_input_as_string)}.bin`;
        }


        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number,
        } = {
            level: zlib_level
        };
        await create_fs_js_read_stream
            .pipe(zlib.createDeflate(zlib_compression_option))
            .pipe(create_fs_js_out_stream);

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
            file_output_as_string = `${file_input_as_string}/../${this.get_filename(file_input_as_string)}.bin`;
        }


        if (zlib_level === undefined || zlib_level === null || zlib_level === void 0) {
            zlib_level = 0;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        const zlib_compression_option: {
            level: number,
        } = {
            level: zlib_level
        };
        await create_fs_js_read_stream
            .pipe(zlib.createGunzip(zlib_compression_option))
            .pipe(create_fs_js_out_stream);

        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/




    public static async create_brotli_fs_js(
        file_input_as_string: string,
        file_output_as_string?: string,
    ) {
        //#region 
        if (file_output_as_string === undefined || file_output_as_string === void 0 || file_output_as_string === null) {
            file_output_as_string = `${file_input_as_string}/../${this.get_filename(file_input_as_string)}.bin`;
        }

        const create_fs_js_read_stream: fs.ReadStream = fs.createReadStream(file_input_as_string);
        const create_fs_js_out_stream: fs.WriteStream = fs.createWriteStream(file_output_as_string);
        await create_fs_js_read_stream
            .pipe(zlib.createBrotliCompress())
            .pipe(create_fs_js_out_stream);

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/


    protected static md5_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("md5").update(input_string).digest("hex");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    protected static sha1_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha1").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/



    protected static sha256_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha256").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/



    protected static sha512_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha512").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/

    protected static ripemd160_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("ripemd160").update(input_string).digest("hex");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    protected static whirlpool_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("whirlpool").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_224_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha3-224").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/

    protected static sha3_256_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha3-256").update(input_string).digest("hex");

        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/


    protected static sha3_384_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha3-384").update(input_string).digest("hex");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    protected static sha3_512_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("sha3-512").update(input_string).digest("hex");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    protected static blake2b_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("blake2b").update(input_string).digest("hex");

        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/

    protected static blake2s_hash(
        input_string: string,
    ): string {
        //#region 
        return crypto.createHash("blake2s").update(input_string).digest("hex");

        //#endregion
    }





    /*-------------------------------------------------------------------------------------------------*/

    public static create_hash(
        allocate_string: string,
        method: hash_method,
    ): string {

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



    protected static readonly dimension_view_for_2n_square: Array<number> = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384];


    public static async create_square_view(
        file_input_as_string: string,
    ): Promise<bool> {
        //#region 
        const create_sharp_data_view: {
            [x: string]: number
        } = await this.get_dimension(file_input_as_string) as {
            width: number,
            height: number
        };

        let is_valid_height: bool = false;
        let is_valid_width: bool = false;


        const create_validate: bool = this.create_dimension_validate(create_sharp_data_view.width,
            create_sharp_data_view.height);


        if (create_validate) {
            if (!this.dimension_view_for_2n_square.includes(create_sharp_data_view.height)) {
                is_valid_height = true;
            }

            if (!this.dimension_view_for_2n_square.includes(create_sharp_data_view.width)) {
                is_valid_width = true;
            }

        }
        if (!is_valid_width) {
            throw new Error(`The width is not filled with 2^n square or rectangle`);
        }

        if (!is_valid_height) {
            throw new Error(`The height is not filled with 2^n square or rectangle`);
        }
        return (is_valid_height && is_valid_width);

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static async create_resize(
        file_system_path_for_image_as_string: string,
        allocate_width: number,
        allocate_height: number,
        file_system_path_for_output_image?: string,
    ): Promise<Void> {
        //#region 
        if (file_system_path_for_output_image === null || file_system_path_for_output_image === undefined || file_system_path_for_output_image === void 0) {
            // create output
            file_system_path_for_output_image = `${file_system_path_for_image_as_string}/../${this.js_basename(file_system_path_for_image_as_string)}.output.png`;
        }

        const create_new_sharp_view = await sharp(file_system_path_for_image_as_string)
            .resize(allocate_width, allocate_height);

        await create_new_sharp_view
            .toFile(file_system_path_for_output_image, (err: auto) => {
                if ((err as auto)) {
                    throw new Error(`Cannot resize ${this.get_full_path(`${file_system_path_for_image_as_string}`)}, code ${err.message as string}`);
                }
            });

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/

    public static evaluate_resize_percentages(
        evaluate_percentages_number: evaluate_percentages_number,
        evaluate_width: evaluate_width,
        evaluate_height: evaluate_height,
    ): {
        width: number,
        height: number,
    } {
        //#region 
        return this.create_dimension(evaluate_width * evaluate_percentages_number,
            evaluate_percentages_number * evaluate_height) as {
                width: number,
                height: number,
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
            width: number,
            height: number,
        } = await this.get_dimension(file_system_path_for_image_as_string) as {
            width: number,
            height: number,
        };

        const create_evaluate_resize_percentages: {
            width: number,
            height: number,
        } = this.evaluate_resize_percentages(
            evaluate_number, create_dimension_view.width, create_dimension_view.height
        ) as {
            width: number,
            height: number,
        };

        /*-------------------------------------------------------------------------------------------------*/
        /**
         * Evaluate this if file_system_path_for_output_image != undefined
         * @param file_system_path_for_output_image can be undefined ?
         * @param file_system_path_for_image_as_string cannot be undefined
         * @throws might thrown an error if no file access perm granted
         */

        (file_system_path_for_output_image != undefined && file_system_path_for_output_image != null && file_system_path_for_output_image != void 0) ?
            await this.create_resize(file_system_path_for_image_as_string,
                create_evaluate_resize_percentages.width,
                create_evaluate_resize_percentages.height,
                (file_system_path_for_output_image as string)) : await this.create_resize(file_system_path_for_image_as_string,
                    create_evaluate_resize_percentages.width,
                    create_evaluate_resize_percentages.height);
        //#endregion

    }

    /*-------------------------------------------------------------------------------------------------*/


    public static assertation_test(
        assertation_arg: assertation_arg,
    ): bool {
        //#region 

        if (this.js_exists(assertation_arg) && this.is_file(assertation_arg) || this.is_directory(assertation_arg)) {
            return true;
        }

        return false;

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static view_assertation(
    ): arguments_asserations {
        //#region 
        if (process.argv.length >= 2) {
            return this.create_assertation(process.argv);
        }
        else {
            throw new Error(`Assertation exception: process.argv.length >= 2`);
        }

        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static create_assertation(
        assertation_args: assertation_arguments,
    ): arguments_asserations {
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


    protected static readonly tre_debug_directory: string = process.cwd() + "/Tre.Debug";

    /*-------------------------------------------------------------------------------------------------*/


    protected static readonly month_short: Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /*-------------------------------------------------------------------------------------------------*/

    protected static readonly month_full: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    /*-------------------------------------------------------------------------------------------------*/


    public static create_debug(
        is_full_month: bool = false,
        ...debug_message_as_string: debug_message
    ): Void {
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

            })
        }
        const create_new_date_have_exception_error: Date = new Date() as Date;
        const create_new_file_name: string = (is_full_month) ? ((Math.floor(Date.now() / 1000)) + '.' + this.month_full[create_new_date_have_exception_error.getMonth()] +
            '.' + create_new_date_have_exception_error.getDate() + '.' + create_new_date_have_exception_error.getFullYear()) satisfies file_name : ((Math.floor(Date.now() / 1000)) + '.' + this.month_short[create_new_date_have_exception_error.getMonth()] +
                '.' + create_new_date_have_exception_error.getDate() + '.' + create_new_date_have_exception_error.getFullYear()) satisfies file_name;
        const create_new_debug_file_save: string = `${this.tre_debug_directory}/${create_new_file_name}.txt` satisfies file_save;
        if (this.js_exists(create_new_debug_file_save)) {
            this.js_remove(create_new_debug_file_save);
        }
        this.write_file(create_new_debug_file_save as file_system_full_path_directory, view_debug_text satisfies view_debug_text);
        //#endregion
    }


    /*-------------------------------------------------------------------------------------------------*/


    public static delete_debug(

    ): Void {
        //#region 
        return this.js_remove(this.tre_debug_directory);
        //#endregion
    }



    /*-------------------------------------------------------------------------------------------------*/



    public static clear_console(
    ): void {
        //#region 
        return console.clear();
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/



    public static async progress_bar(
        Callback_function: auto,
        create_new_total_progress_bar?: number,
    ): Promise<Void> {
        //#region 
        const total: number = (create_new_total_progress_bar != undefined && create_new_total_progress_bar != null && create_new_total_progress_bar != void 0) ?
            create_new_total_progress_bar satisfies number : 10;
        let create_new_progress_process: number = 0;
        for (let i: number = 0; i < total; i++) {
            await Callback_function as void;
            create_new_progress_process++;
            const create_new_percentages_view: number = Math.round((create_new_progress_process satisfies number / total as number) * 100);
            const create_new_progress_bar: string = Array(Math.round(create_new_percentages_view as number / 10) + 1).join('#');
            const create_new_empty_progress: string = Array(11 - Math.round(create_new_percentages_view as number / 10)).join('-');
            process.stdout.write(`[${create_new_progress_bar}${create_new_empty_progress}] ${create_new_percentages_view}%\r`);
        }
        process.stdout.write('\n');
        //#endregion
    }

    /*-------------------------------------------------------------------------------------------------*/


    public static popcap_check_extname(
        file_system_path: string,
        input_the_system_extname_checker_as_string: ".ptx" | ".rsb" | ".rton" | ".json" | ".rsgp" | ".smf" | ".obb" | ".rsb1" | ".pgsr" | ".rsg",
    ): bool {
        //#region 
        const create_auto_checker: string = (!(input_the_system_extname_checker_as_string.indexOf(".") === -1)) ? input_the_system_extname_checker_as_string :
            "." + input_the_system_extname_checker_as_string;
        return (this.js_extname(file_system_path, true).toString().toLowerCase() === create_auto_checker.toString().toLowerCase());
        //#endregion
    }




    /*-------------------------------------------------------------------------------------------------*/

    public static readonly popcap_extension_list: Array<string> = [".ptx", ".rsb", ".rton", ".json", ".rsgp", ".smf", ".obb", ".rsb1", ".pgsr", ".rsg"]




    /*-------------------------------------------------------------------------------------------------*/


}

export default fs_js;