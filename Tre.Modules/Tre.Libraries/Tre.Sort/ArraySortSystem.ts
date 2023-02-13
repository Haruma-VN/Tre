"use strict";
import { TreErrorMessage } from '../../Tre.Debug/Tre.ErrorSystem.js';
interface ResObjectSortingItem {
    id: string;
}

export default function sortResObjects(array: ResObjectSortingItem[]): ResObjectSortingItem[] {
    try {
        array.sort((a, b) => {
            if (!a || !b || !a.id || !b.id) {
                TreErrorMessage({
                    error: "Bug",
                    Reason: "Both a and b must have defined and non-null values for the id property",
                    system: "Both a and b must have defined and non-null values for the id property"
                }, "Both a and b must have defined and non-null values for the id property");
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
                    TreErrorMessage({
                        error: "Bug",
                        Reason: "Both aNum and bNum must be parseable as numbers",
                        system: "Both aNum and bNum must be parseable as numbers"
                    }, "Both aNum and bNum must be parseable as numbers");
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
        TreErrorMessage({
            error: "Bug",
            Reason: "Unexpected error while sorting resources objects",
            system: error.toString()
        }, error.toString());
        return [];
    }
}
