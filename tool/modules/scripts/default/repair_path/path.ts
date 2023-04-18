"use strict";
import { stringify } from "../../../library/json/util.js";
interface BundleRes {
    slot?: number;
    id: string;
    path: string[];
    cols?: number;
    parent?: string;
    ax?: number;
    ay?: number;
    ah?: number;
    aw?: number;
}
interface GroupData {
    id?: string;
    res?: string;
    parent?: string;
    resources: BundleRes[];
}
export default function (resources_bundle_data: GroupData): string {
    for (let i: number = 0; i < resources_bundle_data?.resources.length; ++i) {
        if (
            resources_bundle_data.resources[i].path !== undefined &&
            typeof resources_bundle_data.resources[i].path !== "object" &&
            resources_bundle_data.resources[i].id !== undefined
        ) {
            resources_bundle_data.resources[i].path[
                resources_bundle_data.resources[i].path.length - 1
            ] = resources_bundle_data.resources[i].id
                .slice(
                    resources_bundle_data.resources[i].id
                        .toLowerCase()
                        .indexOf(
                            resources_bundle_data.resources[i].path[
                                resources_bundle_data.resources[i].path.length -
                                    1
                            ]
                        ),
                    -1
                )
                .toLowerCase();
        }
    }
    return stringify(resources_bundle_data);
}
