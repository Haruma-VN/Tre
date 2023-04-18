"use trict";
export default function (
    number_sprites: number,
    sprite_index: number,
    name: string
) {
    const blank_sprite = new Array();
    const frame = [
        {
            label: null,
            stop: false,
            command: [],
            remove: [],
            append: [
                {
                    index: 0,
                    name: null,
                    resource: 0,
                    sprite: false,
                    additive: false,
                    preload_frames: 0,
                    timescale: 1,
                },
            ],
            change: [
                {
                    index: 0,
                    transform: [0, 0],
                    color: null,
                    src_rect: null,
                    anim_frame_num: 0,
                },
            ],
        },
    ];
    for (let i = sprite_index; i <= number_sprites; i++) {
        let sprite_name = name;
        if (name !== "main_sprite") {
            sprite_name = sprite_name + i.toString();
        }
        blank_sprite.push({
            name: sprite_name,
            description: "",
            frame_rate: 30,
            work_area: [0, 1],
            frame: frame,
        });
    }
    return blank_sprite;
}
