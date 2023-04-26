"use strict";
import fs_js from "../../../library/fs/implement.js";

namespace RSBInfo.Tre.Utilities {
    export interface PopCapCommonResourcesData {
        version: number;
        slot_count?: number;
        groups: Array<PopCapCommonResourcesObjectData>;
    }

    export const popcap_manifest_group_data_for_pvz2_international = {
        __MANIFESTGROUP__: ["__MANIFESTGROUP__"],
    };

    export type PopCapCommonResourcesObjectData = {
        id?: string;
        subgroups?: PopCapCommonSubgroupChildrenData[];
        type?: string;
        parent?: string;
        res?: string;
        resources?: PopCapCommonResourcesChildrenData[];
    };

    export type PopCapCommonSubgroupChildrenData = {
        id: string;
        res?: string;
    };

    export type PopCapCommonResourcesChildrenData = {
        slot: number;
        id: string;
        path: Array<string>;
        type: string;
        atlas?: boolean;
        width?: number;
        height: number;
        parent?: string;
        ax?: number;
        ay?: number;
        aw?: number;
        x?: number;
        y?: number;
        cols?: number;
        ah?: number;
        time?: number;
    };

    export type TreRSBInfo = {
        [key: string]: Array<string>;
    };

    export abstract class RSBInfo {
        public abstract CreateRSBInfoFromRes(): TreRSBInfo;
        protected abstract CreateRSBInfoError(error: any): void;
        public abstract WriteRSBInfo(output_file_directory: string): void;
    }

    export class GenerateRSBInfoFromTreInfo extends RSBInfo {
        constructor(private res: PopCapCommonResourcesObjectData) {
            super();
        }

        public CreateRSBInfoFromRes(): TreRSBInfo {
            const rsb_info: TreRSBInfo = {};
            if (this.res.subgroups !== undefined && this.res.id !== undefined) {
                rsb_info[this.res.id] = new Array();
                for (let i: number = 0; i < this.res.subgroups.length; i++) {
                    if (this.res.subgroups[i].id !== undefined) {
                        rsb_info[this.res.id].push(this.res.subgroups[i].id);
                    }
                }
            }
            if (
                (this.res.parent === undefined ||
                    this.res.parent === null ||
                    this.res.parent === void 0) &&
                this.res.type === "simple" &&
                this.res.id !== undefined
            ) {
                rsb_info[this.res.id] = new Array();
                rsb_info[this.res.id].push(this.res.id);
            }
            return rsb_info;
        }

        protected CreateRSBInfoError(error: any): void {
            return console.error(error.message as NodeJS.ErrnoException);
        }

        public WriteRSBInfo(old_directory: string): void {
            return fs_js.write_json(
                `${old_directory}/../TreRSBInfo.json`,
                this.CreateRSBInfoFromRes()
            );
        }
    }

    export function create_tre_rsb_info(directory: string): void {
        if (!fs_js.is_file(directory)) {
            const popcap_resources_directory: Array<string> =
                fs_js.one_reader(directory);
            const popcap_resources_directory_filter_json: Array<string> =
                new Array();
            popcap_resources_directory.forEach((file: string) => {
                if (
                    fs_js.parse_fs(file).ext.toString().toLowerCase() ===
                    ".json"
                ) {
                    popcap_resources_directory_filter_json.push(file);
                }
            });
            const create_tre_rsb_output_info: Array<TreRSBInfo> = new Array();
            for (
                let i: number = 0;
                i < popcap_resources_directory_filter_json.length;
                i++
            ) {
                const popcap_resources_object_data: PopCapCommonResourcesObjectData =
                    fs_js.read_json(
                        `${directory}/${popcap_resources_directory_filter_json[i]}`
                    ) as PopCapCommonResourcesObjectData;
                if (
                    popcap_resources_object_data.subgroups !== undefined ||
                    ((popcap_resources_object_data.parent === undefined ||
                        popcap_resources_object_data.parent === null ||
                        popcap_resources_object_data.parent === void 0) &&
                        popcap_resources_object_data.type === "simple")
                ) {
                    const create_tre_rsb_info: TreRSBInfo =
                        new GenerateRSBInfoFromTreInfo(
                            popcap_resources_object_data
                        ).CreateRSBInfoFromRes();
                    create_tre_rsb_output_info.push(create_tre_rsb_info);
                }
            }
            create_tre_rsb_output_info.push(
                popcap_manifest_group_data_for_pvz2_international
            );
            const create_new_tre_rsb_info: TreRSBInfo = {};
            for (
                let i: number = 0;
                i < create_tre_rsb_output_info.length;
                i++
            ) {
                const create_key_from_tre_rsb_info_object_data: Array<string> =
                    Object.keys(create_tre_rsb_output_info[i]);
                for (
                    let j: number = 0;
                    j < create_key_from_tre_rsb_info_object_data.length;
                    j++
                ) {
                    create_new_tre_rsb_info[
                        create_key_from_tre_rsb_info_object_data[j]
                    ] =
                        create_tre_rsb_output_info[i][
                            create_key_from_tre_rsb_info_object_data[j]
                        ];
                }
            }
            return fs_js.write_json(
                `${directory}/../TreRSBInfo.json`,
                create_new_tre_rsb_info
            );
        }
        return;
    }
}
export default RSBInfo;
