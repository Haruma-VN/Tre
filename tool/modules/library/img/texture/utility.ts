"use strict";
import { Console } from "../../../callback/console.js";
import { texture_converter } from "./texture_converter.js";
import { Argument } from "../../../callback/toolkit_question.js";
import { readline_integer } from "../../../readline/util.js";
import localization from "../../../callback/localization.js";
import fs_js from "../../fs/implement.js";
import * as color from "../../color/color.js";
import { dimension } from "../util.js";
function popcap_texture_decode(file_system_input_as_buffer: Buffer, file_system_input_as_str: string, width: number, height: number, fmt_index: number, not_notify_console_log: boolean, return_mode: boolean) {
    function decode_image(tex_fmt_index: number) {
        let img_b: Buffer = Buffer.alloc(0);
        switch (tex_fmt_index) {
            case 1:
                img_b = texture_converter.decode_rgba_8888(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 2:
                img_b = texture_converter.decode_argb_8888(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("argb_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 3:
                img_b = texture_converter.decode_rgba_4444(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_4444"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 4:
                img_b = texture_converter.decode_rgba_5551(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_5551"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 5:
                img_b = texture_converter.decode_xrgb_8888(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("xrgb_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 6:
                img_b = texture_converter.decode_xrgb_8888_a8(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("xrgb_8888_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 7:
                img_b = texture_converter.decode_rgb_888(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgb_888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 8:
                img_b = texture_converter.decode_rgb_565(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgb_565"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 9:
                img_b = texture_converter.decode_a8(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 10:
                img_b = texture_converter.decode_l8(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("l8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 11:
                img_b = texture_converter.decode_la44(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("la44"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 12:
                img_b = texture_converter.decode_la88(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("la88"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 13:
                img_b = texture_converter.decode_etc1_rgb(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 14:
                img_b = texture_converter.decode_etc1_rgb_a8(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 15:
                img_b = texture_converter.decode_etc1_rgb_a_palette(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb_a_palette"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 16:
                img_b = texture_converter.decode_pvrtc_4bpp_rgb(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgb"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 17:
                img_b = texture_converter.decode_pvrtc_4bpp_rgb_a8(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgb_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            case 18:
                img_b = texture_converter.decode_pvrtc_4bpp_rgba(file_system_input_as_buffer, width, height);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgba"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.png`, img_b, not_notify_console_log);
                }
                break;
            default:
                throw new Error(localization("unknown_ptx_format"));
        }
    }
    if (fmt_index === -1) {
        Console.WriteLine(Argument.Tre.Packages.texture_fomart_choose);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_rgba_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_argb_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_rgba_4444);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_rgba_5551);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_xrgb_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_xrgb_8888_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_rgb_888);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_rgb_565);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_l8);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_la44);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_la88);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_etc1_rgb);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_etc1_rgb_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_etc1_rgb_a_palette);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_pvrtc_4bpp_rgb);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_pvrtc_4bpp_rgb_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_decode_pvrtc_4bpp_rgba);
        const tex_fmt_index: number = readline_integer(1, 18);
        return decode_image(tex_fmt_index);
    } else {
        return decode_image(fmt_index);
    }
}

function popcap_texture_encode(file_system_input_as_buffer: Buffer, file_system_input_as_str: string, fmt_index: number, return_mode: boolean, not_notify_console_log: boolean) {
    function encode_image(tex_fmt_index: number) {
        let img_b: Buffer = Buffer.alloc(0);
        const {width, height} = dimension(file_system_input_as_buffer);
        switch (tex_fmt_index) {
            case 1:
                img_b = texture_converter.encode_rgba_8888(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 2:
                img_b = texture_converter.encode_argb_8888(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("argb_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 3:
                img_b = texture_converter.encode_rgba_4444(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_4444"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 4:
                img_b = texture_converter.encode_rgba_5551(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgba_5551"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 5:
                img_b = texture_converter.encode_xrgb_8888(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("xrgb_8888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 6:
                img_b = texture_converter.encode_xrgb_8888_a8(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("xrgb_8888_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 7:
                img_b = texture_converter.encode_rgb_888(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgb_888"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 8:
                img_b = texture_converter.encode_rgb_565(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("rgb_565"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 9:
                img_b = texture_converter.encode_a8(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 10:
                img_b = texture_converter.encode_l8(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("l8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 11:
                img_b = texture_converter.encode_la44(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("la44"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 12:
                img_b = texture_converter.encode_la88(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("la88"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 13:
                img_b = texture_converter.encode_etc1_rgb(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 14:
                img_b = texture_converter.encode_etc1_rgb_a8(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 15:
                img_b = texture_converter.encode_etc1_rgb_a_palette(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("etc1_rgb_a_palette"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 16:
                img_b = texture_converter.encode_pvrtc_4bpp_rgb(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgb"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 17:
                img_b = texture_converter.encode_pvrtc_4bpp_rgb_a8(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgb_a8"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            case 18:
                img_b = texture_converter.encode_pvrtc_4bpp_rgba(file_system_input_as_buffer);
                if (return_mode) {
                    return img_b;
                }
                else {
                    if (!not_notify_console_log) {
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_information")}: `) + localization("pvrtc_4bpp_rgba"));
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_in")}:\n     `) + `${fs_js.get_full_path(file_system_input_as_str)}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
                        Console.WriteLine(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
                    }
                    fs_js.outfile_fs(`${fs_js.parse_fs(file_system_input_as_str).dir}/${fs_js.parse_fs(file_system_input_as_str).name}.ptx`, img_b, not_notify_console_log);
                }
                break;
            default:
                throw new Error(localization("unknown_ptx_format"));
        }
    }
    if (fmt_index === -1) {
        Console.WriteLine(Argument.Tre.Packages.texture_fomart_choose);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_rgba_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_argb_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_rgba_4444);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_rgba_5551);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_xrgb_8888);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_xrgb_8888_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_rgb_888);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_rgb_565);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_l8);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_la44);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_la88);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_etc1_rgb);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_etc1_rgb_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_etc1_rgb_a_palette);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_pvrtc_4bpp_rgb);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_pvrtc_4bpp_rgb_a8);
        Console.WriteLine(Argument.Tre.Packages.popcap_encode_pvrtc_4bpp_rgba);
        const tex_fmt_index: number = readline_integer(1, 18);
        return encode_image(tex_fmt_index);
    } else {
        return encode_image(fmt_index);
    }
}

export { popcap_texture_decode, popcap_texture_encode };
