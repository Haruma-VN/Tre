"use strict";
import fs_js from "../../../../library/fs/implement.js";
import rton_2_json from "../../rton/rton2json.js";
import pam_json_decode from "../../pam/decode/decode.js";
import pam_xfl_decode from "../../pam/json_to_flash/json_to_flash.js";
import wwise_decode from "../../wwise/decode_simple.js";
export default function decode_data(
    data: Buffer,
    simple_mode: boolean | { decode_rton: boolean; decode_pam: boolean; decode_bnk: boolean; decode_texture: boolean },
    rsg_path: string,
    item_path: string,
): {
    item_path: string;
    decode_data: Buffer | null;
    json_data: Buffer | null;
    rton_encrypted: boolean;
} {
    function default_return_value() {
        return {
            item_path,
            decode_data: data,
            json_data: null,
            rton_encrypted: false,
        };
    }

    let decode_rton: boolean = true;
    let decode_pam: boolean = true;
    let decode_bnk: boolean = true;
    if (typeof simple_mode !== "boolean") {
        decode_rton = simple_mode.decode_rton;
        decode_pam = simple_mode.decode_pam;
        decode_bnk = simple_mode.decode_bnk;
    }
    if (simple_mode) {
        const pam_to_xfl: boolean = fs_js.create_toolkit_view("pam_to_flash") as boolean;
        const pam_resolution: number = fs_js.create_toolkit_view("pam_resolution") as number;
        const ext_name: string = fs_js.js_extname(item_path, true, false);
        switch (ext_name) {
            case ".rton":
                if (decode_rton) {
                    item_path = item_path.replace(".RTON", ".JSON");
                    const check_rijndeal: boolean = data.slice(0, 2).toString("hex") === "1000" ? true : false;
                    if (check_rijndeal) {
                        return {
                            item_path,
                            decode_data: rton_2_json(data, true, true, item_path),
                            json_data: null,
                            rton_encrypted: true,
                        };
                    } else {
                        return {
                            item_path,
                            decode_data: rton_2_json(data, false, true, item_path),
                            json_data: null,
                            rton_encrypted: false,
                        };
                    }
                } else {
                    return default_return_value();
                }
            case ".pam":
                if (decode_pam) {
                    const animation_json: any = pam_json_decode(data, item_path);
                    if (pam_to_xfl) {
                        item_path = item_path + ".XFL";
                        const animation_path: string = `${rsg_path}/res/${item_path}`;
                        pam_xfl_decode(animation_json, animation_path, pam_resolution, true);
                        return {
                            item_path,
                            decode_data: null,
                            json_data: null,
                            rton_encrypted: false,
                        };
                    } else {
                        item_path = item_path + ".JSON";
                        return {
                            item_path,
                            decode_data: null,
                            json_data: animation_json,
                            rton_encrypted: false,
                        };
                    }
                } else {
                    return default_return_value();
                }
            case ".bnk":
                if (decode_bnk) {
                    item_path = item_path + ".SOUNDBANK";
                    const wwise_data: any = wwise_decode(data);
                    const wwise_path: string = `${rsg_path}/res/${item_path}`;
                    if (wwise_data.has_wem_item) {
                        for (let wem_item of wwise_data.wem_data) {
                            fs_js.outfile_fs(`${wwise_path}/embedded_audio/${wem_item.id}.wem`, wem_item.data, true);
                        }
                    }
                    fs_js.outfile_fs(`${wwise_path}/wwise.json`, Buffer.alloc(2), true);
                    fs_js.write_json(`${wwise_path}/wwise.json`, wwise_data.wwise_json, true);
                    return {
                        item_path,
                        decode_data: null,
                        json_data: null,
                        rton_encrypted: false,
                    };
                } else {
                    return default_return_value();
                }
            default:
                return default_return_value();
        }
    } else {
        return default_return_value();
    }
}
