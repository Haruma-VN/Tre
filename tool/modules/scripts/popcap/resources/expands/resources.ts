"use strict";
import path from "node:path";
import fs_js from "../../../../library/fs/implement.js";

namespace AdaptPvZ2InternationalResPath {
    export abstract class adapt_pvz2_res {
        protected abstract new_to_old_conversion(): PopCapResourcesChildren;
        protected abstract old_to_new_conversion(): PopCapResourcesChildren;
        protected abstract evaluate(method: number): PopCapResourcesChildren;
    }

    export interface PopCapResourcesParent {
        id: string;
        type: string;
        parent?: string;
        res?: string;
        resources: PopCapResourcesChildren[];
        subgroups?: any[];
    }

    export interface PopCapResources {
        version: 1;
        groups: PopCapResourcesParent[];
    }

    export interface PopCapResourcesChildren {
        slot: number;
        id: string;
        path: string[] | string;
        type: string;
        atlas?: boolean;
        width?: number;
        height?: number;
        parent?: string;
        ax?: number;
        ay?: number;
        aw?: number;
        ah?: number;
        x?: number;
        y?: number;
        subgroups?: any[];
    }

    export interface template_path {
        path: string[] | string;
    }

    export class res_path<T> extends adapt_pvz2_res {
        constructor(private res: PopCapResourcesChildren) {
            super();
        }

        public new_to_old_conversion(): PopCapResourcesChildren {
            if (!("path" in this.res)) {
                return this.res;
            }

            if (typeof this.res.path === "string") {
                this.res.path = this.res.path.split("\\");
            }
            return this.res;
        }

        public old_to_new_conversion(): PopCapResourcesChildren {
            if (!("path" in this.res)) {
                return this.res;
            }

            if (this.res.path instanceof Array) {
                this.res.path = this.res.path.join("\\");
            }
            return this.res;
        }

        public evaluate(method: number): PopCapResourcesChildren {
            switch (method) {
                case 1:
                    this.res =
                        this.old_to_new_conversion() as PopCapResourcesChildren;
                    break;
                case 2:
                    this.res =
                        this.new_to_old_conversion() as PopCapResourcesChildren;
                    break;
                default:
                    break;
            }
            return this.res;
        }
    }

    export abstract class ResourcesPath {
        public abstract write_fs_js_json(
            directory: string,
            method_number: 1 | 2
        ): void;
        protected abstract handle_resource_data(
            resource_json_parsed: PopCapResources,
            method_number: number
        ): PopCapResources | {};
    }

    export class res_conversion extends ResourcesPath {
        public write_fs_js_json(
            directory: string,
            method_number: number
        ): void {
            let resources_json: PopCapResources = fs_js.read_json(
                directory
            ) as PopCapResources;
            const method: string = method_number === 1 ? "new" : "old";
            return fs_js.write_json(
                `${directory}/../${path.parse(directory).name}.${method}.json`,
                this.handle_resource_data(resources_json, method_number)
            );
        }

        protected handle_resource_data(
            resource_json_parsed: PopCapResources,
            method_number: number
        ): PopCapResources | {} {
            if (!("groups" in resource_json_parsed)) {
                return {};
            }
            for (const resource_data of resource_json_parsed.groups) {
                if (!("resources" in resource_data)) {
                    continue;
                }
                for (let res_data of resource_data.resources) {
                    if (!("path" in res_data)) {
                        continue;
                    }
                    res_data = new AdaptPvZ2InternationalResPath.res_path(
                        res_data
                    ).evaluate(method_number);
                }
            }
            return resource_json_parsed;
        }
    }

    export function new_res_to_old_res<T extends template_path>(res: T): T {
        if (!("path" in res)) {
            return res;
        }

        if (typeof res.path === "string") {
            res.path = res.path.split("\\");
        }
        return res;
    }

    export function old_res_to_new_res<T extends template_path>(res: T): T {
        if (!("path" in res)) {
            return res;
        }

        if (res.path instanceof Array) {
            res.path = res.path.join("\\");
        }
        return res;
    }
}

export default AdaptPvZ2InternationalResPath;
