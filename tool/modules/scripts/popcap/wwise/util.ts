"use strict";
import WwiseDecode from "./decode_simple.js";
import fs_js from "../../../library/fs/implement.js";
import WwiseEncode from "./encode_simple.js";

function popcap_bnk_decode(file_system_input_as_str: string) {
    const input = file_system_input_as_str;
    const folder = input + ".soundbank";
    const output = WwiseDecode(fs_js.read_file(input, "buffer"));
    if (output.has_wem_item) {
        for (let wem_item of output.wem_data) {
            fs_js.outfile_fs(
                `${folder}/embedded_audio/${wem_item.id}.wem`,
                wem_item.data
            );
        }
    }
    if (!fs_js.js_exists(folder)) {
        fs_js.create_directory(folder);
    }
    fs_js.write_json(`${folder}/wwise.json`, output.wwise_json);
    fs_js.execution_out(fs_js.get_full_path(folder));
}

function popcap_bnk_encode(file_system_input_as_str: string) {
    const input = file_system_input_as_str;
    const output = WwiseEncode(input, true);
    const file_path = `${input}/../${fs_js.parse_fs(input).name}`;
    fs_js.outfile_fs(file_path, output);
    fs_js.execution_out(fs_js.get_full_path(file_path));
}

export { popcap_bnk_decode, popcap_bnk_encode };
