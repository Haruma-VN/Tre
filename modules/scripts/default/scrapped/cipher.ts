"use strict";
import js_file_system from "node:fs";
import js_crypto from "node:crypto";
import fs_js from "../../../library/fs/implement.js";

async function RSBCipher(
    file_system_in_path_as_string: string,
    file_system_output_path_as_string: string,
): Promise<void> {
    // RSB Cipher start
    const rsb_cipher_algorithm: string = "aes-256-ctr";
    const rsb_cipher_key: string = fs_js.create_hash('Vietnam.Tre', "md5");
    const rsb_cipher_iv: Buffer = js_crypto.randomBytes(16);
    const newpath = file_system_in_path_as_string.replace('.obb', '').replace('.rsb', '') + '_cipher.rsb';
    await js_file_system.copyFileSync(rsb_cipher_iv, file_system_output_path_as_string);
    fs_js.clear_console();
    await js_file_system.open(newpath, 'r+', async (err: any, popcap_rsb: any) => {
        if (err) {
            throw new Error(`Cannot open the specific file`);
        }
        js_file_system.readFile(rsb_cipher_iv satisfies Buffer, async (err, popcap_rsb_reader) => {
            if (err) {
                throw new Error(`Cannot read the specific file`);
            }
            let data_pgsr_ofjs_file_systemet: number = popcap_rsb_reader.slice(12, 16).readInt32LE();
            const popcap_rsgp_top_data = popcap_rsb_reader.slice(12, 16).readInt32LE();
            const check_cipher = popcap_rsb_reader.slice(popcap_rsgp_top_data + 16, popcap_rsgp_top_data + 20).readInt32BE();
            if (check_cipher == popcap_rsb_reader.length) {
                js_file_system.unlinkSync(newpath);
                throw new Error(`Cannot cipher this RSB` as string);
            }
            else {
                const popcap_subgroup_ofjs_file_systemet_top: number = popcap_rsb_reader.slice(44, 48).readInt32LE();
                const popcap_subgroup_ofjs_file_systemet_end: number = popcap_rsb_reader.slice(76, 80).readInt32LE();
                const popcap_autopool_ofjs_file_systemet_top: number = popcap_rsb_reader.slice(76, 80).readInt32LE();
                const popcap_autopool_ofjs_file_systemet_end: number = popcap_rsb_reader.slice(88, 92).readInt32LE();
                const popcap_rsb_cipher_iv_as_key = Buffer.from(rsb_cipher_iv.toString('hex'), "hex");
                js_file_system.write(popcap_rsb, popcap_rsb_cipher_iv_as_key, 0, 16, popcap_rsgp_top_data, err => {
                    let popcap_rsb_file_size = Buffer.alloc(4)
                    popcap_rsb_file_size.writeInt32BE(('0x' + popcap_rsb_reader.length.toString(16) as any));
                    js_file_system.write(popcap_rsb, popcap_rsb_file_size, 0, 4, popcap_rsgp_top_data + 16, err => {
                        const pgsr_data_top = popcap_rsb_reader.slice(popcap_rsgp_top_data + 20, popcap_rsgp_top_data + 64);
                        const data_top_cipher = js_crypto.createCipheriv(rsb_cipher_algorithm, rsb_cipher_key, rsb_cipher_iv);
                        const data_top_encrypted = Buffer.concat([data_top_cipher.update(pgsr_data_top), data_top_cipher.final()]);
                        js_file_system.write(popcap_rsb, data_top_encrypted, 0, 44, popcap_rsgp_top_data + 20, err => {
                        });
                    });
                });
                // disturb begin
                for (let popcap_auto_subgroup_js_subfile_top: number = popcap_subgroup_ofjs_file_systemet_top, popcap_autopool_js_subfile_subgroup_system_top: number = popcap_autopool_ofjs_file_systemet_top; popcap_autopool_js_subfile_subgroup_system_top < popcap_autopool_ofjs_file_systemet_end - 1; popcap_auto_subgroup_js_subfile_top = popcap_auto_subgroup_js_subfile_top + 204 satisfies number, popcap_autopool_js_subfile_subgroup_system_top = popcap_autopool_js_subfile_subgroup_system_top + 152 satisfies number) {
                    const popcap_subgroup_randomize: Buffer = js_crypto.randomBytes(128);
                    const popcap_data_header_disturb = js_crypto.randomBytes(20);
                    const popcap_data_size_1_disturb = popcap_rsb_reader.slice(popcap_auto_subgroup_js_subfile_top + 164, popcap_auto_subgroup_js_subfile_top + 168).readInt32LE();
                    const popcap_data_size_2_disturb = popcap_rsb_reader.slice(popcap_auto_subgroup_js_subfile_top + 168, popcap_auto_subgroup_js_subfile_top + 172).readInt32LE();
                    const popcap_data_size_disturb = (popcap_data_size_1_disturb + popcap_data_size_2_disturb).toString(16);
                    const popcap_data_ofjs_file_systemet = data_pgsr_ofjs_file_systemet += popcap_data_size_1_disturb + popcap_data_size_2_disturb;
                    const popcap_data_autopool_disturb = popcap_rsb_reader.slice(popcap_autopool_js_subfile_subgroup_system_top, popcap_autopool_js_subfile_subgroup_system_top + 128);
                    const popcap_data_autopool_disturb_cipher = js_crypto.createCipheriv(rsb_cipher_algorithm, rsb_cipher_key, rsb_cipher_iv);
                    const popcap_autopool_update = Buffer.concat([popcap_data_autopool_disturb_cipher.update(popcap_data_autopool_disturb), popcap_data_autopool_disturb_cipher.final()]);
                    await js_file_system.write(popcap_rsb, popcap_subgroup_randomize, 0, 128, popcap_auto_subgroup_js_subfile_top, async (err: any) => {
                        if (popcap_data_ofjs_file_systemet < popcap_rsb_reader.length) {
                            let data_ofjs_file_systemet_bytes: Buffer = Buffer.alloc(4) satisfies Buffer;
                            data_ofjs_file_systemet_bytes.writeInt32LE(('0x' + popcap_data_ofjs_file_systemet.toString(16) as any));
                            js_file_system.write(popcap_rsb, data_ofjs_file_systemet_bytes, 0, 4, popcap_auto_subgroup_js_subfile_top + 332, async (err: any) => {
                                js_file_system.write(popcap_rsb, popcap_data_header_disturb, 0, 20, popcap_data_ofjs_file_systemet, async (err: any) => {
                                    const popcap_rsgp_data_corrupted = popcap_rsb_reader.slice(popcap_data_ofjs_file_systemet + 20, popcap_data_ofjs_file_systemet + 64);
                                    const popcap_rsgp_new_empty_data = js_crypto.createCipheriv(rsb_cipher_algorithm, rsb_cipher_key, rsb_cipher_iv);
                                    const popcap_rsgp_header_disturb = Buffer.concat([popcap_rsgp_new_empty_data.update(popcap_rsgp_data_corrupted), popcap_rsgp_new_empty_data.final()]);
                                    await js_file_system.write(popcap_rsb, popcap_rsgp_header_disturb, 0, 44, popcap_data_ofjs_file_systemet + 20, async err => {
                                    });
                                });
                            });
                        }
                        let popcap_rsb_size_view_bytes = Buffer.alloc(4);
                        popcap_rsb_size_view_bytes.writeInt32LE(('0x' + popcap_data_size_disturb as any));
                        const popcap_size_cipher = js_crypto.createCipheriv(rsb_cipher_algorithm, rsb_cipher_key, rsb_cipher_iv);
                        const popcap_rsb_size_disturbed = Buffer.concat([popcap_size_cipher.update(popcap_rsb_size_view_bytes), popcap_size_cipher.final()]);
                        js_file_system.write(popcap_rsb, popcap_rsb_size_disturbed, 0, 4, popcap_auto_subgroup_js_subfile_top + 132, async (err: any) => {
                            if (err as NodeJS.ErrnoException) {
                                throw new Error(err satisfies string);
                            }
                            const popcap_rsb_decompilation_flag = popcap_rsb_reader.slice(popcap_auto_subgroup_js_subfile_top + 172, popcap_auto_subgroup_js_subfile_top + 176);
                            const popcap_rsb_cipher_flag = js_crypto.createCipheriv(rsb_cipher_algorithm, rsb_cipher_key, rsb_cipher_iv);
                            const popcap_rsb_disturb_flag = Buffer.concat([popcap_rsb_cipher_flag.update(popcap_rsb_decompilation_flag), popcap_rsb_cipher_flag.final()]);
                            await js_file_system.write(popcap_rsb, popcap_rsb_disturb_flag, 0, 4, popcap_auto_subgroup_js_subfile_top + 172, async err => {
                                await js_file_system.write(popcap_rsb, popcap_autopool_update, 0, 128, popcap_autopool_js_subfile_subgroup_system_top, async err => {
                                });
                            });
                        });
                    });
                };
            };
        });
    });
}
// disturb end


export default RSBCipher;