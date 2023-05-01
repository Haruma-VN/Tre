declare type res_json = {
    expand_path: "string" | "array";
    groups: subgroup_parent;
};

declare type subgroup_parent = {
    [x: string]: {
        is_composite: boolean;
        subgroup: subgroup_children;
    };
};

declare type composite_object = {
    type: "composite";
    id: string;
    subgroups: Array<{
        id: string;
        res?: string;
    }>;
};

declare type subgroup_children = {
    [x: string]: {
        [x: string]: packet_data;
    };
};

declare type sprite_data = {
    [subgroup_children_name: string]: {
        type: resolution;
        packet: {
            [parent_name: string]: {
                dimension: {
                    width: number;
                    height: number;
                };
                type: string;
                path: Array<string>;
                data: {
                    [each_sprite_id: string]: {
                        default: {
                            ax?: number;
                            ay?: number;
                            ah?: number;
                            aw?: number;
                            x?: number;
                            y?: number;
                            cols?: number;
                        };
                        type: string;
                        path: Array<string>;
                    };
                };
            };
        };
    };
};

declare type resolution = "1536" | "768" | "384" | "1200" | "640" | null;

declare type packet_data = {
    [x: string]: {
        path?: Array<string>;
        type: string;
        dimension?: {
            width: number;
            height: number;
        };
        [x: string]: children_data_inside_packet;
        data?: children_data_inside_packet;
    };
};

declare type children_data_inside_packet = {
    [x: string]: {
        path: Array<string>;
        type: string;
        default?: {
            ax: number;
            ay: number;
            aw: number;
            ah: number;
            x: number;
            y: number;
            cols?: number;
            forceOriginalVectorSymbolSize?: boolean;
        };
    };
};

declare type PopCap_Subgroup_Parent = {
    type: string;
    id: string;
    subgroups: Array<{
        id: string;
        res?: string;
    }>;
};

declare type Resource_Structure_Template = {
    id: string;
    parent: string;
    res?: string;
    resources: Array<{
        slot: number;
        id: string;
        path: Array<string> | string;
        type?: string;
        atlas?: boolean;
        width?: number;
        height?: number;
        runtime?: boolean;
        parent?: string;
        ah?: number;
        aw?: number;
        ax?: number;
        ay?: number;
        x?: number;
        y?: number;
        forceOriginalVectorSymbolSize?: boolean;
        cols?: number;
        srcpath?: string | Array<string>;
    }>;
    type: string;
};

declare type Resources_Group_Structure_Template = {
    groups: Array<Resource_Structure_Template & any>;
};

declare type using_subgroup = {
    type: string;
    id: string;
    subgroups: Array<{
        id: string;
        res?: string;
    }>;
};

declare type resource_atlas_and_sprites = {
    id: string;
    parent: string;
    res: string;
    resources: Array<{
        slot: number;
        id: string;
        path: string | Array<string>;
        type: string;
        atlas?: boolean;
        width?: number;
        height?: number;
        runtime?: boolean;
        parent?: string;
        ah?: number;
        aw?: number;
        ax?: number;
        ay?: number;
        x?: number;
        y?: number;
        cols?: number;
    }>;
    type: string;
};

declare type Resource_File_Bundle = {
    id: string;
    parent?: string;
    resources: Array<{
        slot: number;
        id: string;
        path: string;
        type: string;
        forceOriginalVectorSymbolSize?: boolean;
        srcpath?: string | Array<string>;
    }>;
    type: string;
};

declare type blank_slot = {
    slot: number;
};

declare type Output_Value = {
    information: {
        expand_path: "string" | "array";
    };
    groups: Array<string>;
};

declare type res_json_children = {
    is_composite: boolean;
    subgroup: subgroup_children;
};

declare type small_bundle_info_json = {
    is_composite: boolean;
    subgroups: Array<string>;
};
