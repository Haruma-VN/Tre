"use strict";
import { createCanvas } from "canvas";
import mix_transform from "./mix_transform.js";
export default async function (image_ctx: any, layer_sprite: any, image_canvas: any, max_position: [bigint, bigint]) {
    if (!layer_sprite.sprite_disable) {
        let image_matrix: [bigint, bigint, bigint, bigint, bigint, bigint] = layer_sprite.matrix;
        for (let i = 0; i < layer_sprite.transform.length; i++) {
            image_matrix = mix_transform(image_matrix, layer_sprite.transform[i]);
        }
        image_matrix[4] += max_position[0];
        image_matrix[5] += max_position[1];
        let image_color: Array<number> = [0, 0, 0, 0];
        for (let color of layer_sprite.color) {
            image_color[0] += color[0];
            image_color[1] += color[1];
            image_color[2] += color[2];
            image_color[3] += color[3];
        }
        {
            image_color[0] /= layer_sprite.color.length;
            image_color[1] /= layer_sprite.color.length;
            image_color[2] /= layer_sprite.color.length;
            image_color[3] /= layer_sprite.color.length;
        }
        image_ctx.setTransform.apply(image_ctx, image_matrix);
        if (image_color[0] != 255 || image_color[1] != 255 || image_color[2] != 255 || image_color[3] != 255) {
            const color_canvas = createCanvas(layer_sprite.image_width, layer_sprite.image_height);
            const color_ctx = color_canvas.getContext("2d");
            color_ctx.drawImage(image_canvas, 0, 0, layer_sprite.image_width, layer_sprite.image_height);
            const raw_data = color_ctx.getImageData(0, 0, layer_sprite.image_width, layer_sprite.image_height);
            for (let i = 0; i < raw_data.data.length; i += 4) {
                raw_data.data[i] = raw_data.data[i] + image_color[0] - 255;
                raw_data.data[i + 1] = raw_data.data[i + 1] + image_color[1] - 255;
                raw_data.data[i + 2] = raw_data.data[i + 2] + image_color[2] - 255;
                raw_data.data[i + 3] = raw_data.data[i + 3] + image_color[3] - 255;
            }
            color_ctx.putImageData(raw_data, 0, 0);
            image_ctx.drawImage(color_canvas, 0, 0, layer_sprite.image_width, layer_sprite.image_height);
        } else {
            image_ctx.drawImage(image_canvas, 0, 0, layer_sprite.image_width, layer_sprite.image_height);
        }
    }
    return;
}
