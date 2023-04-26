declare type auto = any;

declare type Void = void;

declare type bool = boolean;

declare type evaluate_width = number;

declare type evaluate_height = number;

declare type evaluate_percentages_number = number;

declare type assertation_arg = string;

declare type evaluate_error = NodeJS.ErrnoException;

declare type auto_file_system_encoding = "hex" | "utf-8" | "utf16le";

declare type js_encode =
    | "ascii"
    | "base64"
    | "base64url"
    | "utf-8"
    | "binary"
    | "hex"
    | "latin1"
    | "ucs-2"
    | "ucs2"
    | "utf16le"
    | "utf8";

declare type str = string;

declare type hash_method =
    | "md5"
    | "sha1"
    | "sha256"
    | "sha512"
    | "ripemd160"
    | "whirlpool"
    | "sha3-224"
    | "sha3-256"
    | "sha3-384"
    | "sha3-512"
    | "blake2b"
    | "blake2s";

declare type dimension_view = {
    [x: string]: number;
};

declare type auto_dimension = {
    width: evaluate_width;
    height: evaluate_height;
};

declare type int = number;

declare type assertation_arguments = Array<string>;

declare type arguments_asserations = Array<string>;

declare type assertation_view = string;

declare type debug_message = Array<auto>;

declare type view_debug_text = string;

declare type file_name = string;

declare type file_save = file_name;

declare type file_system_full_path_directory = file_name;

declare type encoding_view = "hex" | "utf8" | "buffer" | "utf16le";

declare type popcap_extension_checker =
    | ".ptx"
    | ".rsb"
    | ".rton"
    | ".json"
    | ".rsg"
    | ".smf";

declare type view_option =
    | "allow_384"
    | "smart"
    | "notify_duplicate"
    | "repairDuplicateFolder"
    | "allow_atlas_info"
    | "disable_display_full_path_execution"
    | "use_other_voids"
    | "strict_mode"
    | "allow_trailing_commas"
    | "space"
    | "language"
    | "rton_cipher"
    | "using_extension_for_rsb_pack"
    | "beautify_order"
    | "beautify_res"
    | "remove_unused_info"
    | "fix_double_shadows"
    | "smart_allowance_area"
    | "cut_unused_space"
    | "progress_bar"
    | "pam_resolution"
    | "pam_to_flash"
    | "open_windows_explorer"
    | "gif";

declare type popcap_resources_render = {
    slot: int;
    id: int;
    path: int;
    type: int;
    atlas: int;
    width: int;
    height: int;
    parent: int;
    ah: int;
    aw: int;
    ax: int;
    ay: int;
    cols: int;
    x: int;
    y: int;
    srcpath: int;
};

declare type toolkit_json = {
    atlas: {
        cross_resolution: {
            allow_384: bool;
        };
        pack: {
            smart: bool;
            smart_allowance_area: int;
            cut_unused_space: bool;
        };
        split: {
            notify_duplicate: bool;
            repairDuplicateFolder: bool;
            allow_atlas_info: bool;
        };
    };
    display: {
        disable_display_full_path_execution: bool;
    };
    extension: {
        use_other_voids: bool;
    };
    json: {
        strict_mode: bool;
        allow_trailing_commas: bool;
        space: str;
    };
    debugger: {
        allow_tracking_bugs: bool;
    };
    language: str;
    popcap_rton_conversion: {
        rton: {
            rton_cipher: str;
        };
    };
    user: {
        using_extension_for_rsb_pack: str;
        progress_bar: bool;
        open_windows_explorer: bool;
    };
    resources: {
        beautify_order: popcap_resources_render;
        split: {
            beautify_res: bool;
            remove_unused_info: bool;
        };
        cat: {
            fix_double_shadows: bool;
        };
    };
    popcap_resource_stream_group_unpack: {
        simple: {
            pam_resolution: 1536 | 768 | 384 | 1200 | 640;
            pam_to_xfl: boolean;
        };
    };
    gif: {
        texture_reslution: -1 | 1536 | 384 | 768 | 640 | 1200;
        image_name_by_id: bool;
        turn_on_sprite: bool;
        width_append: number;
        height_append: number;
        x_position_append: number;
        y_position_append: number;
        background_color: "#00000000";
        frame_rate: number;
        gif_quality: number;
        gif_loop: 0 | -1;
        algorithm: "neuquant" | "octree";
        create_gif: bool;
        split_label: bool;
        generate_image_frames: bool;
        frame_default_name: string;
    };
};

declare type toolkit_error = NodeJS.ErrnoException;

declare type return_gif_to_pngs = {
    width: number;
    height: number;
    name: string;
};

declare type DialogType = "file" | "directory" | "any";
