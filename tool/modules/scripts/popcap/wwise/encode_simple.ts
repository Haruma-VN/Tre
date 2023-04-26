"use strict";
import { SmartBuffer } from "smart-buffer";
import fs_js from "../../../library/fs/implement.js";
import localization from "../../../callback/localization.js";
export default function (wwise_path: string, wem_data: boolean = true) {
    let ver_140 = false;
    let ver_112 = false;
    const wwsise_bnk = new SmartBuffer();

    function sortItem(a: string, b: string) {
        const order = [
            "BKHD",
            "INIT",
            "STMG",
            "DIDX",
            "HIRC",
            "STID",
            "ENVS",
            "PLAT",
        ];
        const indexA = order.indexOf(a);
        const indexB = order.indexOf(b);
        if (indexA === -1 && indexB === -1) {
            return a.localeCompare(b);
        }
        if (indexA === -1) {
            return 1;
        }
        if (indexB === -1) {
            return -1;
        }
        return indexA - indexB;
    }
    const wwise_json: any = fs_js.read_json(`${wwise_path}/wwise.json`);
    const wwise_items = Object.keys(wwise_json).sort(sortItem);

    function convertHexStringtoBuffer(str: string) {
        return Buffer.from(str.replace(/\s/g, ""), "hex");
    }

    function EncodeINIT() {
        const INIT_item = wwise_json.INIT;
        wwsise_bnk.writeString("INIT");
        const INIT_length_offset = wwsise_bnk.writeOffset;
        wwsise_bnk.writeUInt32LE(INIT_item.length);
        for (let i = 0; i < INIT_item.length; i++) {
            wwsise_bnk.writeUInt32LE(INIT_item[i].id);
            wwsise_bnk.writeString(INIT_item[i].name + "\x00");
        }
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - INIT_length_offset,
            INIT_length_offset
        );
    }

    function EncodeSTMG() {
        const STMG_item = wwise_json.STMG;
        wwsise_bnk.writeString("STMG");
        const STMG_length_offset = wwsise_bnk.writeOffset;
        const volume_threshold = convertHexStringtoBuffer(
            STMG_item.volume_threshold
        );
        if (volume_threshold.length !== 4) {
            throw new Error(localization("invalid_volume_threshold"));
        }
        const max_voice_instances = convertHexStringtoBuffer(
            STMG_item.max_voice_instances
        );
        if (max_voice_instances.length !== 2) {
            throw new Error(localization("invalid_volume_threshold"));
        }
        wwsise_bnk
            .writeBuffer(volume_threshold)
            .writeBuffer(max_voice_instances);
        if (ver_140) {
            wwsise_bnk.writeUInt16LE(STMG_item.unknown_type_1);
        }
        const stage_group = STMG_item.stage_group;
        wwsise_bnk.writeUInt32LE(stage_group.length);
        for (let i = 0; i < stage_group.length; i++) {
            wwsise_bnk.writeUInt32LE(stage_group[i].id);
            const default_transition_time = convertHexStringtoBuffer(
                stage_group[i].data.default_transition_time
            );
            if (default_transition_time.length !== 4) {
                throw new Error(localization("invalid_volume_threshold"));
            }
            wwsise_bnk.writeBuffer(default_transition_time);
            const custom_transition = stage_group[i].data.custom_transition;
            wwsise_bnk.writeUInt32LE(custom_transition);
            for (let k = 0; k < custom_transition.length; k++) {
                const vaule = convertHexStringtoBuffer(
                    custom_transition[k].vaule
                );
                wwsise_bnk.writeBuffer(vaule);
            }
        }
        const switch_group = STMG_item.switch_group;
        wwsise_bnk.writeUInt32LE(switch_group.length);
        for (let i = 0; i < switch_group.length; i++) {
            wwsise_bnk.writeUInt32LE(switch_group[i].id);
            const parameter = switch_group[i].data.parameter;
            wwsise_bnk.writeUInt32LE(parameter);
            if (ver_112 || ver_140) {
                wwsise_bnk.writeUInt8(switch_group[i].data.parameter_category);
            }
            const point = switch_group[i].data.point;
            wwsise_bnk.writeUInt32LE(point.length);
            for (let k = 0; k < point.length; k++) {
                const vaule = convertHexStringtoBuffer(point[k].vaule);
                wwsise_bnk.writeBuffer(vaule);
            }
        }
        const game_parameter = STMG_item.game_parameter;
        wwsise_bnk.writeUInt32LE(game_parameter.length);
        for (let i = 0; i < game_parameter.length; i++) {
            wwsise_bnk.writeUInt32LE(game_parameter[i].id);
            const parameter_data = convertHexStringtoBuffer(
                game_parameter[i].data
            );
            if (ver_112 || ver_140) {
                if (parameter_data.length !== 17) {
                    throw new Error(localization("invalid_parameter_data_val"));
                }
            } else {
                if (parameter_data.length !== 4) {
                    throw new Error(localization("invalid_parameter_data_val"));
                }
            }
            wwsise_bnk.writeBuffer(parameter_data);
        }
        if (ver_140) {
            wwsise_bnk.writeUInt32LE(STMG_item.unknown_type_2);
        }
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - STMG_length_offset,
            STMG_length_offset
        );
    }

    function HIRCEncode() {
        const HIRC_item = wwise_json.HIRC;
        wwsise_bnk.writeString("HIRC");
        const HIRC_length_offset = wwsise_bnk.writeOffset;
        wwsise_bnk.writeUInt32LE(HIRC_item.length);
        for (let i = 0; i < HIRC_item.length; i++) {
            const data = convertHexStringtoBuffer(HIRC_item[i].data);
            wwsise_bnk.writeUInt8(HIRC_item[i].type);
            wwsise_bnk.writeUInt32LE(data.length + 4);
            wwsise_bnk.writeUInt32LE(HIRC_item[i].id);
            wwsise_bnk.writeBuffer(data);
        }
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - HIRC_length_offset,
            HIRC_length_offset
        );
    }

    function EncodeENVSItem(object: any) {
        wwsise_bnk.writeBuffer(
            convertHexStringtoBuffer(object.volume.volume_vaule)
        );
        const volume_point = object.volume.volume_point;
        wwsise_bnk.writeUInt16LE(volume_point.length);
        for (let i = 0; i < volume_point.length; i++) {
            wwsise_bnk.writeBuffer(
                convertHexStringtoBuffer(volume_point[i].vaule)
            );
        }
        wwsise_bnk.writeBuffer(
            convertHexStringtoBuffer(
                object.low_pass_filter.low_pass_filter_vaule
            )
        );
        const low_pass_filter_point =
            object.low_pass_filter.low_pass_filter_point;
        wwsise_bnk.writeUInt16LE(low_pass_filter_point.length);
        for (let i = 0; i < low_pass_filter_point.length; i++) {
            wwsise_bnk.writeBuffer(
                convertHexStringtoBuffer(low_pass_filter_point[i].vaule)
            );
        }
        if (ver_112 || ver_140) {
            wwsise_bnk.writeBuffer(
                convertHexStringtoBuffer(
                    object.high_pass_filter.high_pass_filter_vaule
                )
            );
            const high_pass_filter_point =
                object.high_pass_filter.high_pass_filter_point;
            wwsise_bnk.writeUInt16LE(high_pass_filter_point.length);
            for (let i = 0; i < high_pass_filter_point.length; i++) {
                wwsise_bnk.writeBuffer(
                    convertHexStringtoBuffer(high_pass_filter_point[i].vaule)
                );
            }
        }
    }

    function EncodeENVS() {
        const ENVS_item = wwise_json.ENVS;
        wwsise_bnk.writeString("ENVS");
        const ENVS_length_offset = wwsise_bnk.writeOffset;
        EncodeENVSItem(ENVS_item.obstruction);
        EncodeENVSItem(ENVS_item.occlusion);
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - ENVS_length_offset,
            ENVS_length_offset
        );
    }

    function EncodePLAT() {
        wwsise_bnk.writeString("PLAT");
        const PLAT_length_offset = wwsise_bnk.writeOffset;
        wwsise_bnk.writeString(wwise_json.PLAT.platform + "\x00");
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - PLAT_length_offset,
            PLAT_length_offset
        );
    }

    function EncodeRTID() {}

    function GetWemData(DIDX_item: string) {
        let wem_item = new Array();
        if (wem_data) {
            for (let i = 0; i < DIDX_item.length; i++) {
                const data = fs_js.read_file(
                    `${wwise_path}/embedded_audio/${DIDX_item[i]}.wem`,
                    "buffer"
                );
                wem_item.push({
                    id: DIDX_item[i],
                    data,
                });
            }
        } else if (Array.isArray(wem_data)) {
            wem_item = wem_data;
        } else {
            throw new Error(localization("invalid_model"));
        }
        return wem_item;
    }

    function EncodeSTID() {
        const STID_item = wwise_json.STID;
        wwsise_bnk.writeString("STID");
        const STID_length_offset = wwsise_bnk.writeOffset;
        wwsise_bnk.writeUInt32LE(STID_item.unknown_type);
        const STID_data = STID_item.data;
        wwsise_bnk.writeUInt32LE(STID_data.length);
        for (let i = 0; i < STID_data.length; i++) {
            wwsise_bnk.writeUInt32LE(STID_data[i].id);
            wwsise_bnk.writeUInt8(STID_data[i].name.length);
            wwsise_bnk.writeString(STID_data[i].name);
        }
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - STID_length_offset,
            STID_length_offset
        );
    }

    function EncodeDIDX() {
        const DIDX_item = wwise_json.DIDX;
        const DATA_bnk = new SmartBuffer();
        const DATA_item = GetWemData(DIDX_item);
        wwsise_bnk.writeString("DIDX");
        const DIDX_length_offset = wwsise_bnk.writeOffset;
        for (let i = 0; i < DIDX_item.length; i++) {
            for (let k = 0; k < DATA_item.length; k++) {
                if (DIDX_item[i] === DATA_item[k].id) {
                    wwsise_bnk.writeUInt32LE(DATA_item[k].id);
                    wwsise_bnk.writeUInt32LE(DATA_bnk.writeOffset);
                    wwsise_bnk.writeUInt32LE(DATA_item[k].data.length);
                    DATA_bnk.writeBuffer(DATA_item[k].data);
                    DATA_bnk.writeBuffer(
                        Buffer.alloc(BeautifyOffset(DATA_item[k].data.length))
                    );
                    DATA_item.splice(k, 1);
                    break;
                }
            }
        }
        DATA_bnk.insertInt32LE(DATA_bnk.length, 0);
        DATA_bnk.insertString("DATA", 0);
        wwsise_bnk.insertUInt32LE(
            wwsise_bnk.writeOffset - DIDX_length_offset,
            DIDX_length_offset
        );
        wwsise_bnk.writeBuffer(DATA_bnk.toBuffer());
    }

    function BeautifyOffset(offset: number) {
        if (offset % 16 === 0) {
            return 16;
        } else {
            let newOffset = offset % 16;
            for (let i = 0; i < 8; i++) {
                if ((offset + newOffset) % 16 !== 0) {
                    newOffset += 1;
                }
            }
            return newOffset;
        }
    }

    function EncodeBKHD() {
        const BKHD_item = wwise_json.BKHD;
        const version = BKHD_item.version;
        if (version !== 88 && version !== 112 && version !== 140) {
            throw new Error(localization("invalid_bnk_version"));
        }
        if (version === 140) {
            ver_140 = true;
        }
        if (version === 112) {
            ver_112 = true;
        }
        const data = convertHexStringtoBuffer(BKHD_item.header_expand);
        wwsise_bnk
            .writeString("BKHD")
            .writeUInt32LE(version)
            .writeUInt32LE(BKHD_item.id)
            .writeBuffer(data);
        wwsise_bnk.insertUInt32LE(wwsise_bnk.writeOffset - 4, 4);
    }

    function EncodeWwise(bnk_type: string) {
        switch (bnk_type) {
            case "BKHD":
                EncodeBKHD();
                return;
            case "DIDX":
                EncodeDIDX();
                return;
            case "INIT":
                EncodeINIT();
                return;
            case "STMG":
                EncodeSTMG();
                return;
            case "ENVS":
                EncodeENVS();
                return;
            case "HIRC":
                HIRCEncode();
                return;
            case "STID":
                EncodeSTID();
                return;
            case "PLAT":
                EncodePLAT();
                return;
            case "FXPR":
                throw new Error(localization("unsupported_fxpr"));
            default:
                throw new Error(`${localization("invalid_bnk")}`);
        }
    }
    for (let item of wwise_items) {
        EncodeWwise(item);
    }
    return wwsise_bnk.toBuffer();
}
