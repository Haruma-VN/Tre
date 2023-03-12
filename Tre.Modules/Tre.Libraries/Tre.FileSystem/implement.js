"use strict";
import fs from "fs";
import * as js_json from "../Tre.JSONSystem/util.js";
import path from "path";
import sharp from "sharp";
import * as color from "../Tre.Color/color.js";
import localization from "../../Tre.Callback/localization.js";
class fs_js {
    constructor() {
    }
    static get_full_path(file_system_path_as_string) {
        return path.resolve(file_system_path_as_string);
    }
    static write_file(file_system_path, file_system_data_write_to_file) {
        const auto_encoding_system = (file_system_data_write_to_file instanceof Buffer) ? "hex" : "utf-8";
        try {
            fs.writeFileSync(file_system_path, file_system_data_write_to_file, {
                encoding: auto_encoding_system,
                flag: "w",
            });
        }
        catch (error) {
            throw new Error(`Write ${this.get_full_path(file_system_path)} failed, code ${error.message}`);
        }
    }
    static read_file(file_system_path, file_system_encoding_view) {
        const create_file_system_encoding_view = (file_system_encoding_view == "buffer") ? "hex" : "utf-8";
        try {
            return fs.readFileSync(file_system_path, {
                encoding: create_file_system_encoding_view,
                flag: "r"
            });
        }
        catch (error) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, code ${error.message}`);
        }
    }
    static is_json_extension(file_system_path) {
        if (path.parse(file_system_path).ext.toString().toLowerCase() === ".json") {
            return true;
        }
        return false;
    }
    static read_json(file_system_path, file_system_force_reading_trailing_commas = true) {
        if (!this.is_json_extension(file_system_path)) {
            throw new Error(`${this.get_full_path(`${file_system_path}`)} is not having the extension ".json"`);
        }
        try {
            return js_json.parse(this.read_file(file_system_path, "utf8"), file_system_force_reading_trailing_commas);
        }
        catch (error) {
            throw new Error(`Read ${this.get_full_path(file_system_path)} failed, the json file might be corrupted ${error.message}`);
        }
    }
    static write_json(file_system_output_path, file_system_json_data_view) {
        if (typeof file_system_json_data_view === "string") {
            return this.write_file(file_system_output_path, file_system_json_data_view);
        }
        if (file_system_json_data_view instanceof Object) {
            return this.write_file(file_system_output_path, js_json.stringify(file_system_json_data_view));
        }
    }
    static js_exists(file_system_path) {
        return fs.existsSync(file_system_path);
    }
    static outfile_fs(file_system_directory_output, file_system_data_output, file_system_is_output_directory = true) {
        const file_system_directory_output_as_list_string = file_system_directory_output
            .replace(/\\/g, '/').split("/");
        const file_system_directory_output_as_file_string = file_system_directory_output_as_list_string.pop();
        const file_system_directory_output_as_folder_of_joined_strings = file_system_directory_output_as_list_string.join("/");
        if (!fs.existsSync(file_system_directory_output_as_folder_of_joined_strings)) {
            fs.mkdirSync(file_system_directory_output_as_folder_of_joined_strings, { recursive: true });
        }
        if (file_system_is_output_directory) {
            this.write_file(`${file_system_directory_output_as_folder_of_joined_strings}/${file_system_directory_output_as_file_string}`, file_system_data_output);
        }
    }
    static view_io_stream(file_system_file_path_as_string) {
        if (this.js_exists(file_system_file_path_as_string)) {
            return fs.statSync(file_system_file_path_as_string);
        }
        else {
            throw new Error(`Cannot specify the path ${this.get_full_path(file_system_file_path_as_string)}`);
        }
    }
    static is_file(file_system_directory_input_as_string) {
        if (this.js_exists(file_system_directory_input_as_string)) {
            return (this.view_io_stream(file_system_directory_input_as_string).isFile());
        }
        else {
            throw new Error(`Cannot specify the path ${this.get_full_path(file_system_directory_input_as_string)}`);
        }
    }
    static is_directory(file_system_directory_input_as_string) {
        if (this.js_exists(file_system_directory_input_as_string)) {
            return (this.view_io_stream(file_system_directory_input_as_string).isDirectory()
                && !this.view_io_stream(file_system_directory_input_as_string).isFile());
        }
        else {
            throw new Error(`Cannot find specify the path ${this.get_full_path(file_system_directory_input_as_string)}`);
        }
    }
    static js_remove(file_system_delete_path) {
        if (this.js_exists(file_system_delete_path)) {
            fs.unlinkSync(file_system_delete_path);
        }
    }
    static create_directory(file_system_directory_file_path_output) {
        if (this.js_exists(file_system_directory_file_path_output)) {
            this.js_remove(file_system_directory_file_path_output);
        }
        fs.mkdirSync(file_system_directory_file_path_output);
    }
    static full_reader(file_system_directory_file_path_input) {
        const create_output_strings_array = new Array();
        fs.readdirSync(file_system_directory_file_path_input).forEach((file) => {
            let file_system_full_path_directory = path.join(file_system_directory_file_path_input, file);
            if (fs.lstatSync(file_system_full_path_directory).isDirectory()) {
                create_output_strings_array.push(this.full_reader(file_system_full_path_directory));
            }
            else {
                create_output_strings_array.push(file_system_full_path_directory);
            }
        });
        return create_output_strings_array.reduce(function (file_system_specific_file_path, file_system_resolve_path) {
            return file_system_specific_file_path.concat(file_system_resolve_path);
        }, new Array());
    }
    static one_reader(file_system_path) {
        try {
            return fs.readdirSync(file_system_path);
        }
        catch (error) {
            throw new Error(`Cannot read the path ${this.get_full_path(file_system_path)}, code ${error.message}`);
        }
    }
    static get_file_extension(file_system_file_path) {
        return (path.parse(file_system_file_path).base.slice(path.parse(file_system_file_path).base.indexOf(".")));
    }
    static throw_error(...expected_error_message) {
        let text = "";
        for (let i = 0; i < expected_error_message.length; ++i) {
            text += expected_error_message;
        }
        return (text);
    }
    static write_stream(file_system_static_path, file_system_write_data_view) {
        const create_write_stream_fs_js = fs.createWriteStream(file_system_static_path, {
            flags: 'w'
        });
        create_write_stream_fs_js.on('error', function (error) {
            throw new Error(`${fs_js.throw_error(`Write failed to ${error.message}`)}`);
        });
        create_write_stream_fs_js.write(file_system_write_data_view);
        create_write_stream_fs_js.end();
    }
    static read_stream(file_system_static_path) {
        return new Promise(function (resolve, reject) {
            const create_read_stream_view = fs.createReadStream(file_system_static_path);
            create_read_stream_view.on('error', (err) => {
                if ((err.code) === 'ENOENT') {
                    reject(new Error(`Not found ${file_system_static_path}`));
                }
                else {
                    reject(err);
                }
            });
            const chunks = new Array();
            create_read_stream_view.on('data', (chunk) => {
                chunks.push(chunk);
            });
            create_read_stream_view.on('end', () => {
                resolve(Buffer.concat(chunks));
            });
        });
    }
    static return_this_tool_current_location() {
        return this.get_full_path(process.cwd());
    }
    static return_this_tool_toolkit_json_location() {
        return this.get_full_path(process.cwd() + "/Tre.Extension/Tre.Settings/toolkit.json");
    }
    static js_basename(file_system_path, force_lower_case = false, force_upper_case = false) {
        if (force_lower_case) {
            return path.basename(file_system_path).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.basename(file_system_path).toString().toUpperCase();
        }
        return path.basename(file_system_path);
    }
    static js_extname(file_system_path, force_lower_case = false, force_upper_case = false) {
        if (force_lower_case) {
            return path.extname(file_system_path).toString().toLowerCase();
        }
        if (force_upper_case) {
            return path.extname(file_system_path).toString().toUpperCase();
        }
        return path.extname(file_system_path);
    }
    static js_check_extname(file_system_path, input_the_system_extname_checker_as_string) {
        const create_auto_checker = (!(input_the_system_extname_checker_as_string.indexOf(".") === -1)) ? input_the_system_extname_checker_as_string :
            "." + input_the_system_extname_checker_as_string;
        return (this.js_extname(file_system_path, true).toString().toLowerCase() === create_auto_checker.toString().toLowerCase());
    }
    static js_check_basename(file_system_path, input_the_system_basename_checker_as_string) {
        return (this.js_basename(file_system_path, true).toString().toLowerCase() === input_the_system_basename_checker_as_string.toString().toLowerCase());
    }
    static fs_copy(file_system_path_of_the_copy_start, file_system_path_of_the_copy_end) {
        const create_buffer_view_file = this.read_file(file_system_path_of_the_copy_start, "buffer");
        this.write_file(file_system_path_of_the_copy_end, create_buffer_view_file);
    }
    static fs_move(file_system_path_of_the_move_start, file_system_path_of_the_move_end) {
        const create_buffer_view_file = this.read_file(file_system_path_of_the_move_start, "buffer");
        this.write_file(file_system_path_of_the_move_end, create_buffer_view_file);
        this.js_remove(file_system_path_of_the_move_start);
    }
    static fs_filesize(file_system_directory_get_file_size) {
        let create_view_file_size = 0;
        try {
            const check_fs_js_stats = fs.statSync(file_system_directory_get_file_size);
            create_view_file_size = check_fs_js_stats.size;
        }
        catch (err) {
            throw new Error(`${err.message}`);
        }
        return create_view_file_size;
    }
    fs_write_success(...messages) {
        let text = "";
        for (let i = 0; i < messages.length; ++i) {
            text += messages[i];
        }
        console.log(text);
    }
    static js_dir(file_system_input_path) {
        return path.dirname(file_system_input_path);
    }
    static async get_dimension(file_system_input_path, width_output_as_property = "width", height_output_as_property = "height") {
        if (!this.js_exists(file_system_input_path)) {
            const create_image_nodejs_sharp_view = sharp(file_system_input_path);
            const create_auto_view_dimension = await create_image_nodejs_sharp_view.metadata();
            if ("width" in create_auto_view_dimension && "height" in create_auto_view_dimension &&
                typeof (create_auto_view_dimension.width) === "number" && typeof (create_auto_view_dimension.height) === "number") {
                return {
                    [width_output_as_property]: create_auto_view_dimension.width,
                    [height_output_as_property]: create_auto_view_dimension.height,
                };
            }
            else {
                throw new Error(`Cannot get ${this.get_full_path(file_system_input_path)} dimension`);
            }
        }
        else {
            throw new Error(`Cannot read ${this.get_full_path(file_system_input_path)}`);
        }
    }
    static create_dimension(file_system_width, file_system_height, width_output_as_property = "width", height_output_as_property = "height") {
        if (file_system_width < 0) {
            file_system_width = Math.abs(file_system_width);
        }
        if (file_system_height < 0) {
            file_system_height = Math.abs(file_system_height);
        }
        return {
            [width_output_as_property]: (typeof file_system_width === "number") ? file_system_width : parseInt(file_system_width),
            [height_output_as_property]: (typeof file_system_height === "number") ? file_system_height : parseInt(file_system_height),
        };
    }
    static js_strict(data_view_strict) {
        if (data_view_strict === undefined || data_view_strict === void 0 || data_view_strict === null) {
            return true;
        }
        return false;
    }
    static async extract_image(file_system_input_path, sharp_data_for_width, sharp_data_for_height, sharp_data_for_x, sharp_data_for_y, file_system_output_path) {
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
            }).toFile(file_system_output_path).catch(function (error) {
                throw new Error(`Cannot create ${fs_js.get_full_path(file_system_output_path)}, and the error is ${error.message}`);
            });
        }
    }
    static async pack_image(file_system_directory_file_path_output, file_system_width, file_system_height, file_system_assertation_array, file_system_channel_output = 4, file_system_adjustment_background) {
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
        const create_new_sharp_composite = sharp({
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
        });
        await create_new_sharp_composite.composite(file_system_assertation_array)
            .toFile(file_system_directory_file_path_output).catch((error) => {
            throw new Error(`Cannot pack image because ${error.message}`);
        });
    }
    static async extract_alpha_channel(file_system_input_path) {
        return await sharp(file_system_input_path).extractChannel("alpha").toBuffer();
    }
    static async extract_red_channel(file_system_input_path) {
        return await sharp(file_system_input_path).extractChannel("red").toBuffer();
    }
    static async extract_blue_channel(file_system_input_path) {
        return await sharp(file_system_input_path).extractChannel("blue").toBuffer();
    }
    static async extract_green_channel(file_system_input_path) {
        return await sharp(file_system_input_path).extractChannel("green").toBuffer();
    }
    static async extract_raw(file_system_input_path) {
        return await sharp(file_system_input_path).raw().toBuffer();
    }
    static degree_circle(degree) {
        const k = Math.floor(degree / 360);
        const offset = k * 360;
        const result = degree - offset;
        return result;
    }
    static async rotate_image(file_system_input_path, angle) {
        angle = (angle > 360) ? this.degree_circle(angle) : angle;
        const create_sharp_rotation = await sharp(file_system_input_path)
            .rotate(angle).toBuffer();
        return create_sharp_rotation;
    }
    static async flip_image(file_system_input_path) {
        const create_sharp_flip = await sharp(file_system_input_path).flip().toBuffer();
        return create_sharp_flip;
    }
    static async flop_image(file_system_input_path) {
        const create_sharp_flop = await sharp(file_system_input_path).flop().toBuffer();
        return create_sharp_flop;
    }
    static async blur_image(file_system_input_path, blur_level) {
        const create_js_sharp_blur = await sharp(file_system_input_path)
            .blur(blur_level).toBuffer();
        return create_js_sharp_blur;
    }
    static async negate_image(file_system_input_path, negate_channel_alpha = false) {
        const create_js_sharp_negate = (negate_channel_alpha) ? await sharp(file_system_input_path)
            .negate({ alpha: true })
            .toBuffer() : await sharp(file_system_input_path)
            .negate()
            .toBuffer();
        return create_js_sharp_negate;
    }
    static async normalize_image(file_system_input_path) {
        const create_sharp_js_normalize = await sharp(file_system_input_path).normalize().toBuffer();
        return create_sharp_js_normalize;
    }
    static tre_thirdparty_for_encode = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
    static tre_thirdparty_location_etcpak = this.tre_thirdparty_for_encode + "etcpak.exe";
    static tre_thirdparty_location_pvrtc = this.tre_thirdparty_for_encode + "PVRTexToolCLI.exe";
    static check_etcpak(file_system_etcpak_default_path) {
        if (file_system_etcpak_default_path === undefined || file_system_etcpak_default_path === void 0 || file_system_etcpak_default_path === null) {
            file_system_etcpak_default_path = this.tre_thirdparty_location_etcpak;
        }
        if (this.js_exists(file_system_etcpak_default_path)) {
            return true;
        }
        else {
            throw new Error(`Cannot find ETCPAK in ${this.get_full_path(file_system_etcpak_default_path)}`);
        }
    }
    static check_pvrtc(file_system_pvrtc_default_path) {
        if (file_system_pvrtc_default_path === undefined || file_system_pvrtc_default_path === void 0 || file_system_pvrtc_default_path === null) {
            file_system_pvrtc_default_path = this.tre_thirdparty_location_pvrtc;
        }
        if (this.js_exists(file_system_pvrtc_default_path)) {
            return true;
        }
        else {
            throw new Error(`Cannot find PVRTCTexToolCli in ${this.get_full_path(file_system_pvrtc_default_path)}`);
        }
    }
    static tre_thirdparty_real_esrgan_location = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Upscale";
    static check_real_esrgan(file_system_real_esrgan_third_default_path) {
        if (file_system_real_esrgan_third_default_path === undefined || file_system_real_esrgan_third_default_path === void 0 || file_system_real_esrgan_third_default_path === null) {
            file_system_real_esrgan_third_default_path = this.tre_thirdparty_real_esrgan_location;
        }
        if (this.js_exists(file_system_real_esrgan_third_default_path)) {
            return true;
        }
        else {
            throw new Error(`Cannot find Real-ESRGAN in ${this.get_full_path(file_system_real_esrgan_third_default_path)}`);
        }
    }
    static execution_out(...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_out"))}: ${this.get_full_path(text)}`);
    }
    static execution_in(...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_in"))}: ${this.get_full_path(text)}`);
    }
    static execution_information(...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_information") + ":")} ` + `${(text)}`);
    }
    static execution_finish(...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_finish") + ":")} ` + `${(text)}`);
    }
    static execution_created(...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
            text += message;
        }
        return console.log(`${color.fggreen_string("◉ " + localization("execution_created") + ":")} ` + `${(text)}`);
    }
    static execution_status(status, ...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
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
                return message;
        }
    }
    static execution_notify(notify, ...message) {
        let text = "";
        for (let i = 0; i < message.length; ++i) {
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
                return message;
        }
    }
}
export default fs_js;
