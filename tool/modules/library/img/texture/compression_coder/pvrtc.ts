"use strict";
class ColorRGBA {
    constructor(public r: number = 255,public g: number = 255,public b: number = 255,public a: number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    multiply(x: number): ColorRGBA {
        return new ColorRGBA(this.r * x, this.g * x, this.b * x, this.a * x);
    }

    add(x: ColorRGBA): ColorRGBA {
        return new ColorRGBA(this.r + x.r, this.g + x.g, this.b + x.b, this.a + x.a);
    }

    subtract(x: ColorRGBA): ColorRGBA {
        return new ColorRGBA(this.r - x.r, this.g - x.g, this.b - x.b, this.a - x.a);
    }

    modulo(x: ColorRGBA): number {
        return this.r * x.r + this.g * x.g + this.b * x.b + this.a * x.a;
    }
}

class ColorRGB {
    constructor(public r: number = 255,public g: number = 255,public b: number = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    multiply(x: number): ColorRGB {
        return new ColorRGB(this.r * x, this.g * x, this.b * x);
    }

    add(x: ColorRGB): ColorRGB {
        return new ColorRGB(this.r + x.r, this.g + x.g, this.b + x.b);
    }

    subtract(x: ColorRGB): ColorRGB {
        return new ColorRGB(this.r - x.r, this.g - x.g, this.b - x.b);
    }

    modulo(x: ColorRGB): number {
        return this.r * x.r + this.g * x.g + this.b * x.b;
    }
}

class PVRTC_packet {
    constructor(public pvrtc_number: bigint = 0n) {
        this.pvrtc_number = BigInt(pvrtc_number);
    }

    get modulation_data() {
        return this.pvrtc_number & 0xffffffffn;
    }

    set modulation_data(value) {
        this.pvrtc_number |= BigInt(value);
    }

    get usePunchthroughAlpha() {
        return ((this.pvrtc_number >> 32n) & 0b1n) === 1n;
    }

    set usePunchthroughAlpha(value) {
        this.pvrtc_number |= (value ? 1n : 0n) << 32n;
    }

    get colorA() {
        return Number((this.pvrtc_number >> 33n) & 0b11111111111111n);
    }

    set colorA(value) {
        this.pvrtc_number |= BigInt(value & 0b11111111111111) << 33n;
    }

    get colorAIsOpaque() {
        return ((this.pvrtc_number >> 47n) & 0b1n) === 1n;
    }

    set colorAIsOpaque(value) {
        this.pvrtc_number |= (value ? 1n : 0n) << 47n;
    }

    get colorB() {
        return Number((this.pvrtc_number >> 48n) & 0b111111111111111n);
    }

    set colorB(value) {
        this.pvrtc_number |= BigInt(value & 0b111111111111111) << 48n;
    }

    get colorBIsOpaque() {
        return this.pvrtc_number >> 63n === 1n;
    }

    set colorBIsOpaque(value) {
        this.pvrtc_number |= (value ? 1n : 0n) << 63n;
    }

    get_colorA_color_rgba(): ColorRGBA {
        let colorA: number = this.colorA;
        if (this.colorAIsOpaque) {
            let r = colorA >> 9;
            let g = (colorA >> 4) & 0x1f;
            let b = colorA & 0xf;
            return new ColorRGBA((r << 3) | (r >> 2), (g << 3) | (g >> 2), (b << 4) | b);
        } else {
            let a = (colorA >> 11) & 0x7;
            let r = (colorA >> 7) & 0xf;
            let g = (colorA >> 3) & 0xf;
            let b = colorA & 0x7;
            return new ColorRGBA((r << 4) | r, (g << 4) | g, (b << 5) | (b << 2) | (b >> 1), (a << 5) | (a << 2) | (a >> 1));
        }
    }

    get_colorB_color_rgba(): ColorRGBA {
        let colorB: number = this.colorB;
        if (this.colorBIsOpaque) {
            let r = colorB >> 10;
            let g = (colorB >> 5) & 0x1f;
            let b = colorB & 0x1f;
            return new ColorRGBA((r << 3) | (r >> 2), (g << 3) | (g >> 2), (b << 3) | (b >> 2));
        } else {
            let a = (colorB >> 12) & 0x7;
            let r = (colorB >> 8) & 0xf;
            let g = (colorB >> 4) & 0xf;
            let b = colorB & 0xf;
            return new ColorRGBA((r << 4) | r, (g << 4) | g, (b << 4) | b, (a << 5) | (a << 2) | (a >> 1));
        }
    }

    get_colorA_color_rgb(): ColorRGB {
        let colorA: number = this.colorA;
        if (this.colorAIsOpaque) {
            let r = colorA >> 9;
            let g = (colorA >> 4) & 0x1f;
            let b = colorA & 0xf;
            return new ColorRGB((r << 3) | (r >> 2), (g << 3) | (g >> 2), (b << 4) | b);
        } else {
            let r = (colorA >> 7) & 0xf;
            let g = (colorA >> 3) & 0xf;
            let b = colorA & 0x7;
            return new ColorRGB((r << 4) | r, (g << 4) | g, (b << 5) | (b << 2) | (b >> 1));
        }
    }

    get_colorB_color_rgb(): ColorRGB {
        let colorB: number = this.colorB;
        if (this.colorBIsOpaque) {
            let r = colorB >> 10;
            let g = (colorB >> 5) & 0x1f;
            let b = colorB & 0x1f;
            return new ColorRGB((r << 3) | (r >> 2), (g << 3) | (g >> 2), (b << 3) | (b >> 2));
        } else {
            let r = (colorB >> 8) & 0xf;
            let g = (colorB >> 4) & 0xf;
            let b = colorB & 0xf;
            return new ColorRGB((r << 4) | r, (g << 4) | g, (b << 4) | b);
        }
    }

    set_colorA_color_rgba(color: ColorRGBA): void {
        let a: number = color.a >> 5;
        if (a == 0x7) {
            let r = color.r >> 3;
            let g = color.g >> 3;
            let b = color.b >> 4;
            this.colorA = (r << 9) | (g << 4) | b;
            this.colorAIsOpaque = true;
        } else {
            let r = color.r >> 4;
            let g = color.g >> 4;
            let b = color.b >> 5;
            this.colorA = (a << 11) | (r << 7) | (g << 3) | b;
            this.colorAIsOpaque = false;
        }
    }

    set_colorB_color_rgba(color: ColorRGBA): void {
        let a: number = color.a >> 5;
        if (a == 0x7) {
            let r = color.r >> 3;
            let g = color.g >> 3;
            let b = color.b >> 3;
            this.colorB = (r << 10) | (g << 5) | b;
            this.colorBIsOpaque = true;
        } else {
            let r = color.r >> 4;
            let g = color.g >> 4;
            let b = color.b >> 4;
            this.colorB = (a << 12) | (r << 8) | (g << 4) | b;
            this.colorBIsOpaque = false;
        }
    }

    set_colorA_color_rgb(color: ColorRGB): void {
        let r: number = color.r >> 3;
        let g: number = color.g >> 3;
        let b: number = color.b >> 4;
        this.colorA = (r << 9) | (g << 4) | b;
        this.colorAIsOpaque = true;
    }

    set_colorB_color_rgb(color: ColorRGB): void {
        let r: number = color.r >> 3;
        let g: number = color.g >> 3;
        let b: number = color.b >> 3;
        this.colorB = (r << 10) | (g << 5) | b;
        this.colorBIsOpaque = true;
    }

    static BILINEAR_FACTORS = [
        [4, 4, 4, 4],
        [2, 6, 2, 6],
        [8, 0, 8, 0],
        [6, 2, 6, 2],
        [2, 2, 6, 6],
        [1, 3, 3, 9],
        [4, 0, 12, 0],
        [3, 1, 9, 3],
        [8, 8, 0, 0],
        [4, 12, 0, 0],
        [16, 0, 0, 0],
        [12, 4, 0, 0],
        [6, 6, 2, 2],
        [3, 9, 1, 3],
        [12, 0, 4, 0],
        [9, 3, 3, 1],
    ];

    static WEIGHTS = [8, 0, 8, 0, 5, 3, 5, 3, 3, 5, 3, 5, 0, 8, 0, 8, 8, 0, 8, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 8, 0, 8];
}

class PVRTC {
    static decode_4bpp(packets: Array<PVRTC_packet>, width: number): Uint8ClampedArray {
        const blocks: number = width >> 2;
        const block_mask: number = blocks - 1;
        let result: Uint8ClampedArray = new Uint8ClampedArray(width * width * 4);
        for (let y = 0; y < blocks; y++) {
            for (let x = 0; x < blocks; x++) {
                const packet: PVRTC_packet = packets[get_morton_number(x, y)];
                let mod: bigint = packet.modulation_data;
                const weights: Array<number> = PVRTC_packet.WEIGHTS;
                const weights_index: number = packet.usePunchthroughAlpha ? 16 : 0;
                const factor_father: Array<any> = PVRTC_packet.BILINEAR_FACTORS;
                let factor_index: number = 0;
                for (let py = 0; py < 4; py++) {
                    let yOffset = py < 2 ? -1 : 0;
                    let y0 = (y + yOffset) & block_mask;
                    let y1 = (y0 + 1) & block_mask;
                    for (let px = 0; px < 4; px++) {
                        const factor: Array<number> = factor_father[factor_index];
                        let xOffset: number = px < 2 ? -1 : 0;
                        let x0: number = (x + xOffset) & block_mask;
                        let x1:number = (x0 + 1) & block_mask;
                        let p0: PVRTC_packet = packets[get_morton_number(x0, y0)];
                        let p1: PVRTC_packet = packets[get_morton_number(x1, y0)];
                        let p2: PVRTC_packet = packets[get_morton_number(x0, y1)];
                        let p3: PVRTC_packet = packets[get_morton_number(x1, y1)];
                        let ca: ColorRGBA = p0
                            .get_colorA_color_rgba()
                            .multiply(factor[0])
                            .add(p1.get_colorA_color_rgba().multiply(factor[1]))
                            .add(p2.get_colorA_color_rgba().multiply(factor[2]))
                            .add(p3.get_colorA_color_rgba().multiply(factor[3]));
                        let cb: ColorRGBA = p0
                            .get_colorB_color_rgba()
                            .multiply(factor[0])
                            .add(p1.get_colorB_color_rgba().multiply(factor[1]))
                            .add(p2.get_colorB_color_rgba().multiply(factor[2]))
                            .add(p3.get_colorB_color_rgba().multiply(factor[3]));
                        let index: number = weights_index + ((Number(mod) & 0b11) << 2);
                        convertColor(
                            result,
                            (py + (y << 2)) * width + px + (x << 2),
                            (ca.r * weights[index] + cb.r * weights[index + 1]) >> 7,
                            (ca.g * weights[index] + cb.g * weights[index + 1]) >> 7,
                            (ca.b * weights[index] + cb.b * weights[index + 1]) >> 7,
                            (ca.a * weights[index + 2] + cb.a * weights[index + 3]) >> 7
                        );
                        mod >>= 2n;
                        factor_index++;
                    }
                }
            }
        }
        return result;
    }
    static encode_rgba_4bpp(colors: Uint8ClampedArray, width: number): any {
        const blocks: number = width >> 2;
        const block_mask: number = blocks - 1;
        const packets: Array<any> = new Array((width * width) >> 4);
        for (let y = 0; y < blocks; y++) {
            for (let x = 0; x < blocks; x++) {
                const color_box = calculate_bounding_box(colors, width, x, y);
                let packet = new PVRTC_packet();
                packet.usePunchthroughAlpha = false;
                packet.set_colorA_color_rgba(color_box[0]);
                packet.set_colorB_color_rgba(color_box[1]);
                packets[get_morton_number(x, y)] = packet;
            }
        }
        for (let y = 0; y < blocks; y++) {
            for (let x = 0; x < blocks; x++) {
                const factor_father: Array<any> = PVRTC_packet.BILINEAR_FACTORS;
                let factor_index: number = 0;
                let data_index: number = (y << 2) * width + (x << 2);
                let modulation_data: number = 0;
                for (let py = 0; py < 4; py++) {
                    let yOffset: number = py < 2 ? -1 : 0;
                    let y0: number = (y + yOffset) & block_mask;
                    let y1: number = (y0 + 1) & block_mask;
                    for (let px = 0; px < 4; px++) {
                        const factor: Array<number> = factor_father[factor_index];
                        const xOffset: number = px < 2 ? -1 : 0;
                        let x0: number = (x + xOffset) & block_mask;
                        let x1: number = (x0 + 1) & block_mask;
                        let p0: PVRTC_packet = packets[get_morton_number(x0, y0)];
                        let p1: PVRTC_packet = packets[get_morton_number(x1, y0)];
                        let p2: PVRTC_packet = packets[get_morton_number(x0, y1)];
                        let p3: PVRTC_packet = packets[get_morton_number(x1, y1)];
                        let ca: ColorRGBA = p0
                            .get_colorA_color_rgba()
                            .multiply(factor[0])
                            .add(p1.get_colorA_color_rgba().multiply(factor[1]))
                            .add(p2.get_colorA_color_rgba().multiply(factor[2]))
                            .add(p3.get_colorA_color_rgba().multiply(factor[3]));
                        let cb: ColorRGBA = p0
                            .get_colorB_color_rgba()
                            .multiply(factor[0])
                            .add(p1.get_colorB_color_rgba().multiply(factor[1]))
                            .add(p2.get_colorB_color_rgba().multiply(factor[2]))
                            .add(p3.get_colorB_color_rgba().multiply(factor[3]));
                        let d: ColorRGBA = cb.subtract(ca);
                        let p: ColorRGBA = new ColorRGBA(
                            colors[(data_index + py * width + px) * 4 + 0] << 4,
                            colors[(data_index + py * width + px) * 4 + 1] << 4,
                            colors[(data_index + py * width + px) * 4 + 2] << 4,
                            colors[(data_index + py * width + px) * 4 + 3] << 4
                        );
                        let v: ColorRGBA = p.subtract(ca);
                        const projection: number = v.modulo(d) << 4;
                        const length_squared: number = d.modulo(d);
                        if (projection > 3 * length_squared) modulation_data++;
                        if (projection > 8 * length_squared) modulation_data++;
                        if (projection > 13 * length_squared) modulation_data++;
                        modulation_data = rotate_right(modulation_data, 2);
                        factor_index++;
                    }
                }
                packets[get_morton_number(x, y)].modulation_data = modulation_data;
            }
        }
        return packets;
    }
    static encode_rgb_4bpp(colors: Uint8ClampedArray, width: number): any {
        const blocks: number = width >> 2;
        const block_mask: number = blocks - 1;
        const packets: Array<any> = new Array((width * width) >> 4);
        for (let y = 0; y < blocks; y++) {
            for (let x = 0; x < blocks; x++) {
                const color_box = calculate_bounding_box(colors, width, x, y);
                let packet = new PVRTC_packet();
                packet.usePunchthroughAlpha = false;
                packet.set_colorA_color_rgb(color_box[0]);
                packet.set_colorB_color_rgb(color_box[1]);
                packets[get_morton_number(x, y)] = packet;
            }
        }
        for (let y = 0; y < blocks; y++) {
            for (let x = 0; x < blocks; x++) {
                const factor_father: Array<any> = PVRTC_packet.BILINEAR_FACTORS;
                let factor_index: number = 0;
                let data_index: number = (y << 2) * width + (x << 2);
                let modulation_data: number = 0;
                for (let py = 0; py < 4; py++) {
                    let yOffset = py < 2 ? -1 : 0;
                    let y0: number = (y + yOffset) & block_mask;
                    let y1: number = (y0 + 1) & block_mask;
                    for (let px = 0; px < 4; px++) {
                        const factor: Array<number> = factor_father[factor_index];
                        const xOffset: number = px < 2 ? -1 : 0;
                        let x0: number = (x + xOffset) & block_mask;
                        let x1: number = (x0 + 1) & block_mask;
                        let p0: PVRTC_packet = packets[get_morton_number(x0, y0)];
                        let p1: PVRTC_packet = packets[get_morton_number(x1, y0)];
                        let p2: PVRTC_packet = packets[get_morton_number(x0, y1)];
                        let p3: PVRTC_packet = packets[get_morton_number(x1, y1)];
                        let ca: ColorRGB = p0
                            .get_colorA_color_rgb()
                            .multiply(factor[0])
                            .add(p1.get_colorA_color_rgb().multiply(factor[1]))
                            .add(p2.get_colorA_color_rgb().multiply(factor[2]))
                            .add(p3.get_colorA_color_rgb().multiply(factor[3]));
                        let cb: ColorRGB = p0
                            .get_colorB_color_rgb()
                            .multiply(factor[0])
                            .add(p1.get_colorB_color_rgb().multiply(factor[1]))
                            .add(p2.get_colorB_color_rgb().multiply(factor[2]))
                            .add(p3.get_colorB_color_rgb().multiply(factor[3]));
                        let d: ColorRGB = cb.subtract(ca);
                        let p: ColorRGB = new ColorRGB(
                            colors[(data_index + py * width + px) * 4 + 0] << 4,
                            colors[(data_index + py * width + px) * 4 + 1] << 4,
                            colors[(data_index + py * width + px) * 4 + 2] << 4
                        );
                        let v: ColorRGB = p.subtract(ca);
                        const projection: number = v.modulo(d) << 4;
                        const length_squared: number = d.modulo(d);
                        if (projection > 3 * length_squared) modulation_data++;
                        if (projection > 8 * length_squared) modulation_data++;
                        if (projection > 13 * length_squared) modulation_data++;
                        modulation_data = rotate_right(modulation_data, 2);
                        factor_index++;
                    }
                }
                packets[get_morton_number(x, y)].modulation_data = modulation_data;
            }
        }
        return packets;
    }
};
function calculate_bounding_box(colors: Uint8ClampedArray, width: number, blockX: number, blockY: number): [ColorRGBA, ColorRGBA] {
    let max_r: number = 0,
        max_g: number = 0,
        max_b: number = 0,
        max_a: number = 0;
    let min_r: number = 255,
        min_g: number = 255,
        min_b: number = 255,
        min_a: number = 255;
    let beginindex = (blockY << 2) * width + (blockX << 2);
    for (let i = 0; i < 4; i++) {
        let nindex = beginindex + i * width;
        for (let j = 0; j < 4; j++) {
            let index = nindex + j;
            let temp;
            temp = colors[index * 4];
            if (temp > max_r) max_r = temp;
            if (temp < min_r) min_r = temp;
            temp = colors[index * 4 + 1];
            if (temp > max_g) max_g = temp;
            if (temp < min_g) min_g = temp;
            temp = colors[index * 4 + 2];
            if (temp > max_b) max_b = temp;
            if (temp < min_b) min_b = temp;
            temp = colors[index * 4 + 3];
            if (temp > max_a) max_a = temp;
            if (temp < min_a) min_a = temp;
        }
    }
    let min: ColorRGBA = new ColorRGBA(min_r, min_g, min_b, min_a);
    let max: ColorRGBA = new ColorRGBA(max_r, max_g, max_b, max_a);
    return [min, max];
}
function rotate_right(value: number, shift: number): number {
    if ((shift &= 31) === 0) {
        return value;
    }
    const result = ((value << (32 - shift)) | (value >>> shift)) >>> 0;
    return result;
}
function convertColor(result: Uint8ClampedArray, x: number, r: number, g: number, b: number, a: number): void {
    result[x * 4] = r;
    result[x * 4 + 1] = g;
    result[x * 4 + 2] = b;
    result[x * 4 + 3] = a;
}
const MORTON_TABLE = [
    0x0000, 0x0001, 0x0004, 0x0005, 0x0010, 0x0011, 0x0014, 0x0015, 0x0040, 0x0041, 0x0044, 0x0045, 0x0050, 0x0051, 0x0054, 0x0055, 0x0100, 0x0101, 0x0104,
    0x0105, 0x0110, 0x0111, 0x0114, 0x0115, 0x0140, 0x0141, 0x0144, 0x0145, 0x0150, 0x0151, 0x0154, 0x0155, 0x0400, 0x0401, 0x0404, 0x0405, 0x0410, 0x0411,
    0x0414, 0x0415, 0x0440, 0x0441, 0x0444, 0x0445, 0x0450, 0x0451, 0x0454, 0x0455, 0x0500, 0x0501, 0x0504, 0x0505, 0x0510, 0x0511, 0x0514, 0x0515, 0x0540,
    0x0541, 0x0544, 0x0545, 0x0550, 0x0551, 0x0554, 0x0555, 0x1000, 0x1001, 0x1004, 0x1005, 0x1010, 0x1011, 0x1014, 0x1015, 0x1040, 0x1041, 0x1044, 0x1045,
    0x1050, 0x1051, 0x1054, 0x1055, 0x1100, 0x1101, 0x1104, 0x1105, 0x1110, 0x1111, 0x1114, 0x1115, 0x1140, 0x1141, 0x1144, 0x1145, 0x1150, 0x1151, 0x1154,
    0x1155, 0x1400, 0x1401, 0x1404, 0x1405, 0x1410, 0x1411, 0x1414, 0x1415, 0x1440, 0x1441, 0x1444, 0x1445, 0x1450, 0x1451, 0x1454, 0x1455, 0x1500, 0x1501,
    0x1504, 0x1505, 0x1510, 0x1511, 0x1514, 0x1515, 0x1540, 0x1541, 0x1544, 0x1545, 0x1550, 0x1551, 0x1554, 0x1555, 0x4000, 0x4001, 0x4004, 0x4005, 0x4010,
    0x4011, 0x4014, 0x4015, 0x4040, 0x4041, 0x4044, 0x4045, 0x4050, 0x4051, 0x4054, 0x4055, 0x4100, 0x4101, 0x4104, 0x4105, 0x4110, 0x4111, 0x4114, 0x4115,
    0x4140, 0x4141, 0x4144, 0x4145, 0x4150, 0x4151, 0x4154, 0x4155, 0x4400, 0x4401, 0x4404, 0x4405, 0x4410, 0x4411, 0x4414, 0x4415, 0x4440, 0x4441, 0x4444,
    0x4445, 0x4450, 0x4451, 0x4454, 0x4455, 0x4500, 0x4501, 0x4504, 0x4505, 0x4510, 0x4511, 0x4514, 0x4515, 0x4540, 0x4541, 0x4544, 0x4545, 0x4550, 0x4551,
    0x4554, 0x4555, 0x5000, 0x5001, 0x5004, 0x5005, 0x5010, 0x5011, 0x5014, 0x5015, 0x5040, 0x5041, 0x5044, 0x5045, 0x5050, 0x5051, 0x5054, 0x5055, 0x5100,
    0x5101, 0x5104, 0x5105, 0x5110, 0x5111, 0x5114, 0x5115, 0x5140, 0x5141, 0x5144, 0x5145, 0x5150, 0x5151, 0x5154, 0x5155, 0x5400, 0x5401, 0x5404, 0x5405,
    0x5410, 0x5411, 0x5414, 0x5415, 0x5440, 0x5441, 0x5444, 0x5445, 0x5450, 0x5451, 0x5454, 0x5455, 0x5500, 0x5501, 0x5504, 0x5505, 0x5510, 0x5511, 0x5514,
    0x5515, 0x5540, 0x5541, 0x5544, 0x5545, 0x5550, 0x5551, 0x5554, 0x5555,
];

function get_morton_number(x: number, y: number): number {
    return (MORTON_TABLE[x >> 8] << 17) | (MORTON_TABLE[y >> 8] << 16) | (MORTON_TABLE[x & 0xff] << 1) | MORTON_TABLE[y & 0xff];
}

export default {PVRTC, PVRTC_packet};