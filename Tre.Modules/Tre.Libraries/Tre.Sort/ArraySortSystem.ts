"use strict";

import localization from "../../Tre.Callback/localization.js";

interface ResObjectSortingItem {
    id: string;
}

export default function sortResObjects(array: ResObjectSortingItem[]): ResObjectSortingItem[] {
    try {
        array.sort((a, b) => {
            if (!a || !b || !a.id || !b.id) {
                throw new Error(localization("defined_and_non_null"));
            }

            const aMatch = a.id.match(/^TEST(\d+)_(\d+)x(\d+)$/i);
            const bMatch = b.id.match(/^TEST(\d+)_(\d+)x(\d+)$/i);

            if (!aMatch && !bMatch) {
                return a.id.localeCompare(b.id);
            } else if (!aMatch) {
                return -1;
            } else if (!bMatch) {
                return 1;
            } else {
                const aNum = parseInt(aMatch[1], 10);
                const bNum = parseInt(bMatch[1], 10);
                if (isNaN(aNum) || isNaN(bNum)) {
                    throw new Error(localization("parse_able_number"));
                }
                if (aNum !== bNum) {
                    return aNum - bNum;
                } else {
                    return a.id.localeCompare(b.id);
                }
            }
        });
        return array;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
