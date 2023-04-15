declare type structure = {
  version: 1 | 2 | 3 | 4 | 5 | 6;
  frame_rate: number;
  position: [number, number];
  size: [number, number];
  image: Array<image_structure>;
  sprite: Array<sprite_structure>;
  main_sprite: main_sprite_structure;
};

declare type image_structure = {
  name: string;
  size: [number, number];
  transform: transform;
};

declare type sprite_structure = {
  name: string;
  description: string;
  frame_rate: number;
  work_area: [number, number];
  frame: [
    {
      label: null;
      stop: boolean;
      command: [];
      remove: [];
      append: [
        {
          index: number;
          name: null;
          resource: number;
          sprite: boolean;
          additive: boolean;
          preload_frames: number;
          timescale: number;
        }
      ];
      change: [
        {
          index: number;
          transform: [number, number];
          color: null;
          src_rect: null;
          anim_frame_num: number;
        }
      ];
    }
  ];
};

declare type transform = [number, number, number, number, number, number];

declare type main_sprite_structure = {
  name: string;
  description: string;
  frame_rate: number;
  work_area: [number, number];
  frame: main_sprite_frame_structure[];
}

declare type main_sprite_frame_structure = {
  label: string | null,
  stop: boolean,
  command: [],
  remove: remove_structure[],
  append: append_structure[],
  change: change_structure[],
}

declare type remove_structure = {
  index: number,
};

declare type frame_structure = {
  label: string;
  stop: boolean;
  command: [];
  remove: remove_structure[];
  append: append_structure[];
};

declare type append_structure = {
  index: number;
  name: null;
  resource: number;
  sprite: boolean;
  additive: boolean;
  preload_frame: number;
  timescale: number;
};

declare type change_structure = {
  index: number;
  transform: transform;
  color: color;
  src_rect: null;
  anim_frame_num: number | null;
};

declare type color = [number, number, number, number];

declare type resource_build = {
  extend_id: string;
  extend_path: Array<string>;
  position_x: number;
  position_y: number;
  popcap_resource_x: number;
  popcap_resource_y: number;
  version: 1 | 2 | 3 | 4 | 5 | 6;
  position: [number, number];
  frame_rate: number;
  popcap_resource_path_type: "array" | "string";
  trim: boolean;
};

declare type popcap_pam_transform = [
  number,
  number,
  number,
  number,
  number,
  number,
];
