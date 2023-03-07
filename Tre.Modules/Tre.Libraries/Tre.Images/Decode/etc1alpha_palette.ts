"use strict";
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { parse } from "node:path";
import sharp from 'sharp';
import * as color from "../../Tre.Color/color.js";
import { TreErrorMessage } from '../../../Tre.Debug/Tre.ErrorSystem.js';
import localization from '../../../Tre.Callback/localization.js';
import path from "node:path";
import bitstream from "bit-buffer";
export default async function (dir: string, width: number, height: number): Promise<void> {
    console.log(color.fggreen_string(`◉ ${localization("execution_information")}: `) + "rgb_etc1_a_palette");
    console.log(color.fggreen_string(`◉ ${localization("execution_in")}: `) + `${dir}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_width")}: `) + `${width}`);
    console.log(color.fggreen_string(`◉ ${localization("execution_display_height")}: `) + `${height}`);
    const tre_thirdparty = process.cwd() + "/Tre.Extension/Tre.ThirdParty/Raw/";
    let cmd = `etcpak.exe --etc1 -v "${parse(dir).base}" "${parse(dir).name.toUpperCase()}.png"`;
    let pvr_header = Buffer.from('505652030000000006000000000000000000000000000000BBBBBBBBAAAAAAAA0100000001000000010000000100000000000000', 'hex');
    pvr_header.writeInt32LE(('0x' + width.toString(16) as any), 28);
    pvr_header.writeInt32LE(('0x' + height.toString(16) as any), 24);
    const originalImage = Buffer.concat([pvr_header, fs.readFileSync(dir).slice(0, width * height / 2)]);
    fs.writeFileSync(`${tre_thirdparty}${parse(dir).base}`, originalImage);
    execSync(cmd, { cwd: tre_thirdparty, stdio: 'ignore' });
    await sharp(`${tre_thirdparty}${parse(dir).name.toUpperCase()}.png`).removeAlpha().toBuffer().then(async (slice_alpha) => {
        const alpha_channel_palette = fs.readFileSync(dir).slice(width * height / 2);
        const square = width * height;
        const indexNumber = alpha_channel_palette[0];
        let bitsLength;
        let indexTable;
        let bufferbyte;
        if (indexNumber === 0) {
            bitsLength = 1;
            indexTable = Buffer.from([0, 255]);
        }
        else {
            bitsLength = indexNumber === 1 ? 1 : Math.floor(Math.log2(indexNumber - 1)) + 1;
            indexTable = new Array();
            for (let i = 0; i < indexNumber; i++) {
                bufferbyte = alpha_channel_palette[i + 1];
                indexTable.push((bufferbyte << 4) | bufferbyte);
            }
        };
        const alpha_channel_palette_slice_header = Buffer.concat([alpha_channel_palette.slice(17), Buffer.alloc(17)]);
        const bitstream_alpha = new bitstream.BitStream(alpha_channel_palette_slice_header);
        bitstream_alpha.bigEndian = true;
        let alpha_channel_raw = new Array();
        for (let i = 0; i < square; i++) {
            alpha_channel_raw.push(indexTable[bitstream_alpha.readBits(bitsLength)]);
        };
        await sharp(Buffer.from(alpha_channel_raw), { raw: { width: width, height: height, channels: 1 } }).png().toBuffer().then(async (alpha) => {
            await sharp(slice_alpha).joinChannel(alpha).toBuffer().then(buffer => {
                console.log(color.fggreen_string(`◉ ${localization("execution_out")}: `) + `${path.resolve(`${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`)}`);
                fs.writeFileSync(`${parse(dir).dir}/${parse(dir).name.toUpperCase()}.png`, buffer);
            });
            for (let item of fs.readdirSync(tre_thirdparty)) {
                parse(item).ext.toUpperCase() != '.EXE' ? fs.unlinkSync(`${tre_thirdparty}${item}`) : {};
            }
        }).catch((error) => {
            TreErrorMessage({ error: localization("unknown"), reason: localization("popcap_ptx_decode_native_error"), system: error.message.toString() }, localization("popcap_ptx_decode_native_error"));
        });
    });
}
