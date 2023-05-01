"use strict";
import { SmartBuffer } from "smart-buffer";
import localization from "../../../callback/localization.js";
export default function (wwise_bnk: any) {
    let ver_140 = false;
    let ver_112 = false;
    const wwise_json: any = new Object();
    const wem_data = new Array();
    let has_wem_item = false;

    function createHexCanReadable(buffer: Buffer) {
        let hex_string = "";
        for (let i = 0; i < buffer.length; i++) {
            hex_string += buffer
                .slice(i, i + 1)
                .toString("hex")
                .toUpperCase();
            if (i < buffer.length - 1) {
                hex_string += " ";
            }
        }
        return hex_string;
    }

    function readEventName() {
        const string_start_offset = wwise_bnk.readOffset;
        let string_end = wwise_bnk.readUInt8();
        while (string_end >= 1) {
            string_end = wwise_bnk.readUInt8();
        }
        const name_string = wwise_bnk
            .toBuffer()
            .slice(string_start_offset, wwise_bnk.readOffset - 1)
            .toString();
        return name_string;
    }

    function STMGDecode() {
        const STMG_length = wwise_bnk.readUInt32LE();
        const volume_threshold = createHexCanReadable(wwise_bnk.readBuffer(4));
        const max_voice_instances = createHexCanReadable(wwise_bnk.readBuffer(2));
        let unknown_type_1 = 0;
        if (ver_140) {
            unknown_type_1 = wwise_bnk.readUInt16LE();
        }
        const STMG_stage_number = wwise_bnk.readUInt32LE();
        const stage_group = new Array();
        for (let i = 0; i < STMG_stage_number; i++) {
            const id = wwise_bnk.readUInt32LE();
            const default_transition_time = createHexCanReadable(wwise_bnk.readBuffer(4));
            const number_ms = wwise_bnk.readUInt32LE();
            const custom_transition = new Array();
            for (let k = 0; k < number_ms; i++) {
                const vaule = createHexCanReadable(wwise_bnk.readBuffer(12));
                custom_transition.push({
                    vaule,
                });
            }
            stage_group.push({
                id,
                data: {
                    default_transition_time,
                    custom_transition,
                },
            });
        }
        const STMG_switch_number = wwise_bnk.readUInt32LE();
        const switch_group = new Array();
        for (let i = 0; i < STMG_switch_number; i++) {
            const id = wwise_bnk.readUInt32LE();
            const parameter = wwise_bnk.readUInt32LE();
            let parameter_category = 0;
            if (ver_112 || ver_140) {
                parameter_category = wwise_bnk.readUInt8();
            }
            const parameter_number = wwise_bnk.readUInt32LE();
            const point = new Array();
            for (let k = 0; k < parameter_number; k++) {
                const vaule = createHexCanReadable(wwise_bnk.readBuffer(12));
                point.push({
                    vaule,
                });
            }
            switch_group.push({
                id,
                data: {
                    parameter,
                    parameter_category,
                    point,
                },
            });
        }
        const gane_parameter_number = wwise_bnk.readUInt32LE();
        const game_parameter = new Array();
        for (let i = 0; i < gane_parameter_number; i++) {
            const id = wwise_bnk.readUInt32LE();
            let data = "";
            if (ver_112 || ver_140) {
                data = createHexCanReadable(wwise_bnk.readBuffer(17));
            } else {
                data = createHexCanReadable(wwise_bnk.readBuffer(4));
            }
            game_parameter.push({
                id,
                data,
            });
        }
        if (ver_140) {
            const unknown_type_2 = wwise_bnk.readUInt32LE();
            return {
                volume_threshold,
                max_voice_instances,
                unknown_type_1,
                stage_group,
                switch_group,
                game_parameter,
                unknown_type_2,
            };
        } else {
            return {
                volume_threshold,
                max_voice_instances,
                stage_group,
                switch_group,
                game_parameter,
            };
        }
    }

    function HIRCDecode() {
        const HIRC_length = wwise_bnk.readUInt32LE();
        const HIRC_number = wwise_bnk.readUInt32LE();
        const HIRC = new Array();
        for (let h = 0; h < HIRC_number; h++) {
            const type = wwise_bnk.readUInt8();
            const length = wwise_bnk.readUInt32LE();
            const id = wwise_bnk.readUInt32LE();
            const data = createHexCanReadable(wwise_bnk.readBuffer(length - 4));
            HIRC.push({
                id,
                type,
                data,
            });
        }
        return HIRC;
    }

    function ENVSItemDecode() {
        const volume_vaule = createHexCanReadable(wwise_bnk.readBuffer(2));
        const volume_number = wwise_bnk.readUInt16LE();
        const volume_point = new Array();
        for (let i = 0; i < volume_number; i++) {
            const vaule = createHexCanReadable(wwise_bnk.readBuffer(12));
            volume_point.push({
                vaule,
            });
        }
        const low_pass_filter_vaule = createHexCanReadable(wwise_bnk.readBuffer(2));
        const low_pass_filter_number = wwise_bnk.readUInt16LE();
        const low_pass_filter_point = new Array();
        for (let i = 0; i < low_pass_filter_number; i++) {
            const vaule = createHexCanReadable(wwise_bnk.readBuffer(12));
            low_pass_filter_point.push({
                vaule,
            });
        }
        if (ver_112 || ver_140) {
            const high_pass_filter_vaule = createHexCanReadable(wwise_bnk.readBuffer(2));
            const high_pass_filter_number = wwise_bnk.readUInt16LE();
            const high_pass_filter_point = new Array();
            for (let i = 0; i < high_pass_filter_number; i++) {
                const vaule = createHexCanReadable(wwise_bnk.readBuffer(12));
                high_pass_filter_point.push({
                    vaule,
                });
            }
            return {
                volume: {
                    volume_vaule,
                    volume_point,
                },
                low_pass_filter: {
                    low_pass_filter_vaule,
                    low_pass_filter_point,
                },
                high_pass_filter: {
                    high_pass_filter_vaule,
                    high_pass_filter_point,
                },
            };
        } else {
            return {
                volume: {
                    volume_vaule,
                    volume_point,
                },
                low_pass_filter: {
                    low_pass_filter_vaule,
                    low_pass_filter_point,
                },
            };
        }
    }

    function ENVSDecode() {
        const ENVS_length = wwise_bnk.readUInt32LE();
        const obstruction = ENVSItemDecode();
        const occlusion = ENVSItemDecode();
        return {
            obstruction,
            occlusion,
        };
    }

    function PLATDecode() {
        const PLAT_length = wwise_bnk.readUInt32LE();
        return {
            platform: readEventName(),
        };
    }

    function DATADecode() {
        has_wem_item = true;
        const DATA_length = wwise_bnk.readUInt32LE();
        const wem_items = wwise_bnk.readBuffer(DATA_length);
        for (let i = 0; i < wem_data.length; i++) {
            wem_data[i].data = wem_items.slice(wem_data[i].offset, wem_data[i].offset + wem_data[i].length);
            delete wem_data[i].offset;
            delete wem_data[i].length;
        }
    }

    function DIDXDecode() {
        const DIDX_length = wwise_bnk.readUInt32LE() + wwise_bnk.readOffset;
        const DIDX = new Array();
        while (wwise_bnk.readOffset < DIDX_length) {
            const id = wwise_bnk.readUInt32LE();
            const offset = wwise_bnk.readUInt32LE();
            const length = wwise_bnk.readUInt32LE();
            DIDX.push(id);
            wem_data.push({
                id,
                offset,
                length,
            });
        }
        return DIDX;
    }

    function STIDDecode() {
        const STID_length = wwise_bnk.readUInt32LE();
        const unknown_type = wwise_bnk.readUInt32LE();
        const STID_number = wwise_bnk.readUInt32LE();
        const data = new Array();
        for (let i = 0; i < STID_number; i++) {
            const id = wwise_bnk.readUInt32LE();
            const length = wwise_bnk.readUInt8();
            const name = wwise_bnk.readString(length);
            data.push({
                id,
                name,
            });
        }
        return {
            data,
            unknown_type,
        };
    }

    function INITDecode() {
        const INIT_length = wwise_bnk.readUInt32LE();
        const INIT_number = wwise_bnk.readUInt32LE();
        const plug_in = new Array();
        for (let i = 0; i < INIT_number; i++) {
            const id = wwise_bnk.readUInt32LE();
            plug_in.push({
                id,
                name: readEventName(),
            });
        }
        return plug_in;
    }

    function DecodeWwise() {
        const bnk_type = wwise_bnk.readString(4);
        switch (bnk_type) {
            case "DIDX":
                wwise_json.DIDX = DIDXDecode();
                return;
            case "DATA":
                DATADecode();
                return;
            case "INIT":
                wwise_json.INIT = INITDecode();
                return;
            case "STMG":
                wwise_json.STMG = STMGDecode();
                return;
            case "ENVS":
                wwise_json.ENVS = ENVSDecode();
                return;
            case "HIRC":
                wwise_json.HIRC = HIRCDecode();
                return;
            case "STID":
                wwise_json.STID = STIDDecode();
                return;
            case "PLAT":
                wwise_json.PLAT = PLATDecode();
                return;
            case "FXPR":
                throw new Error(localization("unsupported_fxpr"));
            default:
                throw new Error(localization("invalid_bnk"));
        }
    }
    wwise_bnk = SmartBuffer.fromBuffer(wwise_bnk);
    const BKHD_magic = wwise_bnk.readString(4);
    if (BKHD_magic !== "BKHD") {
        throw new Error(localization("invalid_bnk_magic"));
    }
    const BKHD_length = wwise_bnk.readUInt32LE();
    const version = wwise_bnk.readUInt32LE();
    if (version !== 88 && version !== 112 && version !== 140) {
        throw new Error(localization("invalid_bnk_version"));
    }
    if (version === 140) {
        ver_140 = true;
    } else if (version === 112) {
        ver_112 = true;
    }
    const id = wwise_bnk.readUInt32LE();
    const data_length = BKHD_length - 8;
    const header_expand = createHexCanReadable(wwise_bnk.readBuffer(data_length));
    wwise_json.BKHD = {
        version,
        id,
        header_expand,
    };
    while (wwise_bnk.readOffset < wwise_bnk.length) {
        DecodeWwise();
    }
    return {
        has_wem_item,
        wem_data,
        wwise_json,
    };
}
