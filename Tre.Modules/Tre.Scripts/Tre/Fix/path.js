"use strict";
import { stringify } from '../../../Tre.Libraries/Tre.JSONSystem/util.js';
export default function (resources_bundle_data) {
    for (let i = 0; i < (resources_bundle_data === null || resources_bundle_data === void 0 ? void 0 : resources_bundle_data.resources.length); ++i) {
        if (resources_bundle_data.resources[i].path != undefined && typeof (resources_bundle_data.resources[i].path) != "object" && resources_bundle_data.resources[i].id != undefined) {
            resources_bundle_data.resources[i].path[(resources_bundle_data.resources[i].path.length - 1)] = resources_bundle_data.resources[i].id.slice(resources_bundle_data.resources[i].id.toLowerCase().indexOf(resources_bundle_data.resources[i].path[(resources_bundle_data.resources[i].path.length - 1)]), -1).toLowerCase();
        }
    }
    return stringify(resources_bundle_data);
}
