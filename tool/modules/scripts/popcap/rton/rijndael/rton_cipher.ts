import Rijndael from 'rijndael-js';
export default function (rton_data: any, key: string): Buffer {
    const iv: string = key.slice(4, 28);
    const pad_size: number = (iv.length - ((rton_data.length + iv.length - 1) % iv.length + 1));
    const rton_cipher: Buffer = Buffer.concat([rton_data, Buffer.alloc(pad_size)]);
    const cipher: any = new Rijndael(key, 'cbc');
    const ciphertext: Buffer = Buffer.concat([Buffer.from([0x10, 0x00]), Buffer.from(cipher.encrypt(rton_cipher, (iv.length << 3), iv))]);
    return ciphertext;
}