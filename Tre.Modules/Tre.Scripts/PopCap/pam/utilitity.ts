"use strict";
import writepam from './encode/write_pam.js';
import fs_js from '../../../Tre.Libraries/Tre.FileSystem/implement.js';
import read_pam from './decode/read_pam.js';
import path from 'node:path';

export async function popcap_pam_encode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false,
) {
    const pam_data = await writepam(fs_js.read_json(file_system_data_input_argument));
    const file_system_output = `${file_system_data_input_argument}/../${path.parse(path.parse(file_system_data_input_argument).name).name}.pam`;
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_file(file_system_output, pam_data);
}


export async function popcap_pam_decode(
    file_system_data_input_argument: string,
    this_will_disable_console_log: boolean = false,
) {
    const pam_data = await read_pam(await fs_js.read_file(file_system_data_input_argument, 'buffer'));
    const file_system_output = file_system_data_input_argument + '.json';
    if (!this_will_disable_console_log) {
        fs_js.execution_out(fs_js.get_full_path(file_system_output));
    }
    fs_js.write_json(file_system_output, pam_data);
}