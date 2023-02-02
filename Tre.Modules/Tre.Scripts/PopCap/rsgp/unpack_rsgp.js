"use strict";
import zlib from 'node:zlib';
import { TreErrorMessage } from '../../../../Tre.Modules/Tre.Debug/Tre.ErrorSystem.js';
export default function (buffer = []) {
    const data_offset = buffer.slice(24, 28).readInt32LE();
    const compressed_data_size = buffer.slice(28, 32).readInt32LE();
    const decompressed_data_size = buffer.slice(32, 36).readInt32LE();
    const image_data_offset = buffer.slice(40, 44).readInt32LE();
    const compressed_image_data_size = buffer.slice(44, 48).readInt32LE();
    const decompressed_image_data_size = buffer.slice(48, 52).readInt32LE();
    const info_size = buffer.slice(72, 76).readInt32LE();
    const info_offset = buffer.slice(76, 80).readInt32LE();
    const info_limit = info_size + info_offset;
    let original_offset = 0;
    let original_size = 0;
    let rsgp_data = "";
    let rsgp_unpacked = new Array();
    let exception_json = { "UseTreRSGPInfo": true, "CompressionMethod": "", "Res": [] };
    let rsgp_res = new Array();
    const Unpack_Rsgp = (offset_data, size, image, comppression) => {
        try {
            comppression == 'compressed' ? rsgp_data = zlib.unzipSync(buffer.slice(offset_data, offset_data + size)) : rsgp_data = buffer.slice(offset_data, offset_data + size);
        } catch (error) {
            TreErrorMessage({ error: "Native error occur from unpack execution", reason: "Unknown compression flag type", system: error }, "Unknown compression flag type");
            return;
        };
        let temp_offset = info_offset;
        let name_path = "";
        let name_dict = new Array();
        const WriteFile = (temp_offset, name_path) => {
            let express_res = { "Path": [], "PTXInfo": { "Id": 0, "Width": 0, "Height": 0 } };
            let rsgp_array = new Object();
            const file_data_offset = buffer.slice(temp_offset - 8, temp_offset - 4).readInt32LE();
            const file_data_size = buffer.slice(temp_offset - 4, temp_offset).readInt32LE();
            const file_data = rsgp_data.slice(file_data_offset, file_data_offset + file_data_size);
            rsgp_array.path = name_path;
            rsgp_array.buffer = file_data;
            rsgp_unpacked.push(rsgp_array);
            if (image === true) {
                const id = buffer.slice(temp_offset, temp_offset + 4).readInt32LE();
                const image_width = buffer.slice(temp_offset + 12, temp_offset + 16).readInt32LE();
                const image_height = buffer.slice(temp_offset + 16, temp_offset + 20).readInt32LE();
                express_res.PTXInfo.Id = id;
                express_res.PTXInfo.Width = image_width;
                express_res.PTXInfo.Height = image_height;
            }
            else {
                delete express_res.PTXInfo;
            }
            let path = new Array();
            for (let segment of name_path.split('\\')) {
                if (segment !== '') {
                    path.push(segment);
                };
            };
            express_res.Path = path;
            rsgp_res.push(express_res);
        };
        while (temp_offset < info_limit) {
            let character_byte = buffer.slice(temp_offset, temp_offset + 1);
            let temp_bytes = Buffer.from(buffer.slice(temp_offset + 1, temp_offset + 4).toString('hex') + '00', 'hex').readInt32LE() * 4;
            if (parseInt(character_byte.toString('hex'), 16) != 0) {
                if (temp_bytes != 0) {
                    let name_array = new Object();
                    name_array.name = name_path;
                    name_array.key = temp_bytes;
                    name_dict.push(name_array);
                    name_path += character_byte.toString();
                    temp_offset += 4;
                }
                else {
                    name_path += character_byte.toString();
                    temp_offset += 4;
                };
            }
            else if (parseInt(character_byte.toString('hex'), 16) == 0) {
                image === true ? WriteFile(temp_offset += 16, name_path, temp_offset += 20) : WriteFile(temp_offset += 16, name_path);
                name_dict.forEach((value, index) => {
                    value.key + info_offset < temp_offset ? name_dict.slice(index, index + 1) : name_path = value.name;
                })
            }
        }
    }
    if (compressed_data_size == 0 || compressed_data_size - decompressed_data_size == 0) {
        exception_json.CompressionMethod = false;
        if (decompressed_image_data_size != 0) {
            original_offset = image_data_offset;
            original_size = decompressed_image_data_size;
            Unpack_Rsgp(original_offset, original_size, true);
        }
        else {
            original_offset = data_offset;
            original_size = decompressed_data_size;
            Unpack_Rsgp(original_offset, original_size, false);
        }
    }
    else {
        exception_json.CompressionMethod = true;
        if (decompressed_image_data_size != 0) {
            original_offset = image_data_offset;
            original_size = compressed_image_data_size;
            Unpack_Rsgp(original_offset, original_size, true, 'compressed');
        }
        else {
            original_offset = data_offset;
            original_size = compressed_data_size;
            Unpack_Rsgp(original_offset, original_size, false, 'compressed');
        }
    }
    exception_json.Res = rsgp_res;
    rsgp_unpacked.Treinfo = exception_json;
    return rsgp_unpacked;
}