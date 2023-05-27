"use strict";

class ETC1 {
    static ETC1_modifiers = [
        [2, 8],
        [5, 17],
        [9, 29],
        [13, 42],
        [18, 60],
        [24, 80],
        [33, 106],
        [47, 183],
    ];
    static gen_ETC1(colors: Uint8ClampedArray): bigint {
        const horizontal: bigint = ETC1.gen_horizontal(colors) as bigint;
        const vertical: bigint = ETC1.gen_vertical(colors) as bigint;
        let source_colors: Uint8ClampedArray = new Uint8ClampedArray(32);
        ETC1.decode_ETC1(horizontal, source_colors) as void;
        const horizontal_score: number = get_score(colors, source_colors) as number;
        ETC1.decode_ETC1(vertical, source_colors) as void;
        const vertical_score: number = get_score(colors, source_colors) as number;
        return horizontal_score < vertical_score ? horizontal : vertical;
    }

    static gen_horizontal(colors: Uint8ClampedArray): bigint {
        let img_point: [bigint] = [0n];
        set_flip_mode(img_point, false) as void;
        const left_colors = get_left_colors(colors) as Uint8ClampedArray;
        let base_colors_1: Uint8ClampedArray = new Uint8ClampedArray(3);
        let mod: number = gen_modifiter(base_colors_1, left_colors) as number;
        set_table_1(img_point, mod) as void;
        gen_pix_diff(img_point, left_colors, base_colors_1, mod, 0, 2, 0, 4) as void;
        const right_colors = get_right_colors(colors) as Uint8ClampedArray;
        let base_colors_2: Uint8ClampedArray = new Uint8ClampedArray(3);
        mod = gen_modifiter(base_colors_2, right_colors) as number;
        set_table_2(img_point, mod) as void;
        gen_pix_diff(img_point, right_colors, base_colors_2, mod, 2, 4, 0, 4) as void;
        set_base_colors(img_point, base_colors_1, base_colors_2) as void;
        return img_point[0];
    }

    static gen_vertical(colors: Uint8ClampedArray): bigint {
        let img_point: [bigint] = [0n];
        set_flip_mode(img_point, true) as void;
        const top_colors = get_top_colors(colors) as Uint8ClampedArray;
        let base_colors_3: Uint8ClampedArray = new Uint8ClampedArray(3);
        let mod: number = gen_modifiter(base_colors_3, top_colors) as number;
        set_table_1(img_point, mod) as void;
        gen_pix_diff(img_point, top_colors, base_colors_3, mod, 0, 4, 0, 2) as void;
        const bottom_colors = get_bottom_colors(colors) as Uint8ClampedArray;
        let base_colors_4: Uint8ClampedArray = new Uint8ClampedArray(3);
        mod = gen_modifiter(base_colors_4, bottom_colors) as number;
        set_table_2(img_point, mod) as void;
        gen_pix_diff(img_point, bottom_colors, base_colors_4, mod, 0, 4, 2, 4) as void;
        set_base_colors(img_point, base_colors_3, base_colors_4) as void;
        return img_point[0];
    }

    static decode_ETC1(img_point: bigint, result: Uint8ClampedArray): void {
        const diffbit: boolean = ((img_point >> 33n) & 1n) == 1n;
        const flipbit: boolean = ((img_point >> 32n) & 1n) == 1n;
        let r1: number, r2: number, g1: number, g2: number, b1: number, b2: number;
        if (diffbit) {
            let r: number = Number(img_point >> 59n) & 0x1f;
            let g: number = Number(img_point >> 51n) & 0x1f;
            let b: number = Number(img_point >> 43n) & 0x1f;
            r1 = (r << 3) | ((r & 0x1c) >> 2);
            g1 = (g << 3) | ((g & 0x1c) >> 2);
            b1 = (b << 3) | ((b & 0x1c) >> 2);
            r += (Number((img_point >> 56n) & 0x7n) << 29) >> 29;
            g += (Number((img_point >> 48n) & 0x7n) << 29) >> 29;
            b += (Number((img_point >> 40n) & 0x7n) << 29) >> 29;
            r2 = (r << 3) | ((r & 0x1c) >> 2);
            g2 = (g << 3) | ((g & 0x1c) >> 2);
            b2 = (b << 3) | ((b & 0x1c) >> 2);
        } else {
            r1 = Number((img_point >> 60n) & 0xfn) * 0x11;
            g1 = Number((img_point >> 52n) & 0xfn) * 0x11;
            b1 = Number((img_point >> 44n) & 0xfn) * 0x11;
            r2 = Number((img_point >> 56n) & 0xfn) * 0x11;
            g2 = Number((img_point >> 48n) & 0xfn) * 0x11;
            b2 = Number((img_point >> 40n) & 0xfn) * 0x11;
        }
        const table_1: number = Number((img_point >> 37n) & 0x7n);
        const table_2: number = Number((img_point >> 34n) & 0x7n);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const val: number = Number((img_point >> ((BigInt(j) << 2n) | BigInt(i))) & 0x1n);
                const neg: boolean = ((img_point >> (((BigInt(j) << 2n) | BigInt(i)) + 16n)) & 0x1n) == 1n;
                if ((flipbit && i < 2) || (!flipbit && j < 2)) {
                    const add = ETC1.ETC1_modifiers[table_1][val] * (neg ? -1 : 1);
                    result[((i << 2) | j) * 4 + 0] = color_clamp(r1 + add);
                    result[((i << 2) | j) * 4 + 1] = color_clamp(g1 + add);
                    result[((i << 2) | j) * 4 + 2] = color_clamp(b1 + add);
                } else {
                    const add = ETC1.ETC1_modifiers[table_2][val] * (neg ? -1 : 1);
                    result[((i << 2) | j) * 4 + 0] = color_clamp(r2 + add);
                    result[((i << 2) | j) * 4 + 1] = color_clamp(g2 + add);
                    result[((i << 2) | j) * 4 + 2] = color_clamp(b2 + add);
                }
            }
        }
    }
}

function gen_modifiter(base_colors: Uint8ClampedArray, colors: Uint8ClampedArray): number {
    let max_colors: Uint8ClampedArray = new Uint8ClampedArray([255, 255, 255]);
    let min_colors: Uint8ClampedArray = new Uint8ClampedArray([0, 0, 0]);
    let min_y: number = 2147483647;
    let max_y: number = -2147483648;
    for (let i = 0; i < 8; i++) {
        if (colors[i * 4 + 3] == 0) continue;
        let y: number = ~~((colors[i * 4 + 0] + colors[i * 4 + 1] + colors[i * 4 + 2]) / 3);
        if (y > max_y) {
            max_y = y;
            max_colors[0] = colors[i * 4];
            max_colors[1] = colors[i * 4 + 1];
            max_colors[2] = colors[i * 4 + 2];
        }
        if (y < min_y) {
            min_y = y;
            min_colors[0] = colors[i * 4];
            min_colors[1] = colors[i * 4 + 1];
            min_colors[2] = colors[i * 4 + 2];
        }
    }
    let diff_mean: number = ~~((max_colors[0] - min_colors[0] + max_colors[1] - min_colors[1] + max_colors[2] - min_colors[2]) / 3);
    let mod_diff: number = 2147483647;
    let modifier: number = -1;
    let mode: number = -1;
    for (let i = 0; i < 8; i++) {
        let ss: number = ETC1.ETC1_modifiers[i][0] * 2;
        let sb: number = ETC1.ETC1_modifiers[i][0] + ETC1.ETC1_modifiers[i][1];
        let bb: number = ETC1.ETC1_modifiers[i][1] * 2;
        if (ss > 255) ss = 255;
        if (sb > 255) sb = 255;
        if (bb > 255) bb = 255;
        if (Math.abs(diff_mean - ss) < mod_diff) {
            mod_diff = Math.abs(diff_mean - ss);
            modifier = i;
            mode = 0;
        }
        if (Math.abs(diff_mean - sb) < mod_diff) {
            mod_diff = Math.abs(diff_mean - sb);
            modifier = i;
            mode = 1;
        }
        if (Math.abs(diff_mean - bb) < mod_diff) {
            mod_diff = Math.abs(diff_mean - bb);
            modifier = i;
            mode = 2;
        }
    }
    if (mode == 1) {
        const div1: number  = ETC1.ETC1_modifiers[modifier][0] / ETC1.ETC1_modifiers[modifier][1];
        const div2: number = 1 - div1;
        base_colors[0] = color_clamp(min_colors[0] * div1 + max_colors[0] * div2);
        base_colors[1] = color_clamp(min_colors[1] * div1 + max_colors[1] * div2);
        base_colors[2] = color_clamp(min_colors[2] * div1 + max_colors[2] * div2);
    } else {
        base_colors[0] = (min_colors[0] + max_colors[0]) >> 1;
        base_colors[1] = (min_colors[1] + max_colors[1]) >> 1;
        base_colors[2] = (min_colors[2] + max_colors[2]) >> 1;
    }
    return modifier;
}

function gen_pix_diff(
    img_point: [bigint],
    colors: Uint8ClampedArray,
    base_colors: Uint8ClampedArray,
    mod: number,
    x_offs: number,
    x_end: number,
    y_offs: number,
    y_end: number
): void {
    const base_mean: number = ~~((base_colors[0] + base_colors[1] + base_colors[2]) / 3);
    let i = 0;
    for (let yy = y_offs; yy < y_end; yy++) {
        for (let xx = x_offs; xx < x_end; xx++) {
            const diff: number = Math.trunc((colors[i * 4] + colors[i * 4 + 1] + colors[i * 4 + 2]) / 3) - base_mean;
            if (diff < 0) img_point[0] |= 1n << (BigInt(xx) * 4n + BigInt(yy) + 16n);
            const tbldiff1: number = Math.abs(diff) - ETC1.ETC1_modifiers[mod][0];
            const tbldiff2: number = Math.abs(diff) - ETC1.ETC1_modifiers[mod][1];
            if (Math.abs(tbldiff2) < Math.abs(tbldiff1)) img_point[0] |= 1n << (BigInt(xx) * 4n + BigInt(yy));
            i++;
        }
    }
}

function set_base_colors(img_point: [bigint], color_1: Uint8ClampedArray, color_2: Uint8ClampedArray): void {
    let r1: number = color_1[0];
    let g1: number = color_1[1];
    let b1: number = color_1[2];
    let r2: number = color_2[0];
    let g2: number = color_2[1];
    let b2: number = color_2[2];
    const r_diff: number = Math.trunc((r2 - r1) / 8);
    const g_diff: number = Math.trunc((g2 - g1) / 8);
    const b_diff: number = Math.trunc((b2 - b1) / 8);
    if (r_diff > -4 && r_diff < 3 && g_diff > -4 && g_diff < 3 && b_diff > -4 && b_diff < 3) {
        set_diff_mode(img_point, true);
        r1 /= 8;
        g1 /= 8;
        b1 /= 8;
        img_point[0] |= BigInt(~~r1) << 59n;
        img_point[0] |= BigInt(~~g1) << 51n;
        img_point[0] |= BigInt(~~b1) << 43n;
        img_point[0] |= BigInt(r_diff & 0x7) << 56n;
        img_point[0] |= BigInt(g_diff & 0x7) << 48n;
        img_point[0] |= BigInt(b_diff & 0x7) << 40n;
    } else {
        img_point[0] |= BigInt(~~(r1 / 0x11)) << 60n;
        img_point[0] |= BigInt(~~(g1 / 0x11)) << 52n;
        img_point[0] |= BigInt(~~(b1 / 0x11)) << 44n;
        img_point[0] |= BigInt(~~(r2 / 0x11)) << 56n;
        img_point[0] |= BigInt(~~(g2 / 0x11)) << 48n;
        img_point[0] |= BigInt(~~(b2 / 0x11)) << 40n;
    }
}

function get_left_colors(colors: Uint8ClampedArray): Uint8ClampedArray {
    const left_colors: Uint8ClampedArray = new Uint8ClampedArray(32);
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 2; x++) {
            left_colors[(y * 2 + x) * 4 + 0] = colors[(y * 4 + x) * 4 + 0];
            left_colors[(y * 2 + x) * 4 + 1] = colors[(y * 4 + x) * 4 + 1];
            left_colors[(y * 2 + x) * 4 + 2] = colors[(y * 4 + x) * 4 + 2];
            left_colors[(y * 2 + x) * 4 + 3] = colors[(y * 4 + x) * 4 + 3];
        }
    }
    return left_colors;
}

function get_right_colors(colors: Uint8ClampedArray): Uint8ClampedArray {
    const right_colors: Uint8ClampedArray = new Uint8ClampedArray(32);
    for (let y = 0; y < 4; y++) {
        for (let x = 2; x < 4; x++) {
            right_colors[((y * 2 + x) * 4 + 1 - 2) * 4 + 0] = colors[(y * 4 + x) * 4 + 0];
            right_colors[((y * 2 + x) * 4 + 1 - 2) * 4 + 1] = colors[(y * 4 + x) * 4 + 1];
            right_colors[((y * 2 + x) * 4 + 1 - 2) * 4 + 2] = colors[(y * 4 + x) * 4 + 2];
            right_colors[((y * 2 + x) * 4 + 1 - 2) * 4 + 3] = colors[(y * 4 + x) * 4 + 3];
        }
    }
    return right_colors;
}

function get_top_colors(colors: Uint8ClampedArray): Uint8ClampedArray {
    const top_colors: Uint8ClampedArray = new Uint8ClampedArray(32);
    for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 4; x++) {
            top_colors[(y * 4 + x) * 4 + 0] = colors[(y * 4 + x) * 4 + 0];
            top_colors[(y * 4 + x) * 4 + 1] = colors[(y * 4 + x) * 4 + 1];
            top_colors[(y * 4 + x) * 4 + 2] = colors[(y * 4 + x) * 4 + 2];
            top_colors[(y * 4 + x) * 4 + 3] = colors[(y * 4 + x) * 4 + 3];
        }
    }
    return top_colors;
}

function get_bottom_colors(colors: Uint8ClampedArray): Uint8ClampedArray {
    const bottom_colors: Uint8ClampedArray = new Uint8ClampedArray(32);
    for (let y = 2; y < 4; y++) {
        for (let x = 0; x < 4; x++) {
            bottom_colors[((y - 2) * 4 + x) * 4 + 0] = colors[(y * 4 + x) * 4 + 0];
            bottom_colors[((y - 2) * 4 + x) * 4 + 1] = colors[(y * 4 + x) * 4 + 1];
            bottom_colors[((y - 2) * 4 + x) * 4 + 2] = colors[(y * 4 + x) * 4 + 2];
            bottom_colors[((y - 2) * 4 + x) * 4 + 3] = colors[(y * 4 + x) * 4 + 3];
        }
    }
    return bottom_colors;
}

function get_score(original: Uint8ClampedArray, encode: Uint8ClampedArray): number {
    let diff: number = 0;
    for (let i = 0; i < 4 * 4; i++) {
        diff += Math.abs(encode[i * 4] - original[i * 4]);
        diff += Math.abs(encode[i * 4 + 1] - original[i * 4 + 1]);
        diff += Math.abs(encode[i * 4 + 2] - original[i * 4 + 2]);
    }
    return diff;
}

function set_flip_mode(img_point: [bigint], mode: boolean): void {
    img_point[0] & ~(1n << 32n);
    img_point[0] |= (mode ? 1n : 0n) << 32n;
}

function set_diff_mode(img_point: [bigint], mode: boolean): void {
    img_point[0] &= ~(1n << 33n);
    img_point[0] |= (mode ? 1n : 0n) << 33n;
}

function set_table_1(img_point: [bigint], table: number): void {
    img_point[0] &= ~(7n << 37n);
    img_point[0] |= BigInt(table & 0x7) << 37n;
}

function set_table_2(img_point: [bigint], table: number): void {
    img_point[0] &= ~(7n << 34n);
    img_point[0] |= BigInt(table & 0x7) << 34n;
}

function color_clamp(color: number): number {
    color = ~~color;
    if (color > 255) return 255;
    if (color < 0) return 0;
    return color;
}

export default ETC1;
