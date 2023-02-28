import crypto from "crypto";
export function decryptRijndael(this_is_buffer_data: any, this_is_key: string, this_is_iv: string) {
    const key = Buffer.from(this_is_key);
    const iv = Buffer.from(this_is_iv);
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    decipher.setAutoPadding(false);
    const decrypted = decipher.update(this_is_buffer_data);
    return Buffer.concat([decrypted, decipher.final()]);
}