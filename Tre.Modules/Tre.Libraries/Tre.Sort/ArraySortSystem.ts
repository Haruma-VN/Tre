"use strict";
import { TreErrorMessage } from '../../Tre.Debug/Tre.ErrorSystem.js';
interface ResObjectSortingItem {
    id: string;
}

export default function (array: ResObjectSortingItem[]): ResObjectSortingItem[] {
    try {
        array.sort((a: ResObjectSortingItem, b: ResObjectSortingItem) => {
            // check if null or undefined
            if (!a || !b || !a.id || !b.id) {
                TreErrorMessage({ error: "Bug", Reason: "Both a and b must have defined and non-null values for the id property", system: "Both a and b must have defined and non-null values for the id property" }, "Both a and b must have defined and non-null values for the id property");
            }

            const [aNum, aUnit] = (a.id.match(/\d+x\d+/i) || [null, null]);
            const [bNum, bUnit] = (b.id.match(/\d+x\d+/i) || [null, null]);

            if (!aNum && !bNum) {
                return a.id.localeCompare(b.id);
            } else if (!aNum) {
                return -1;
            } else if (!bNum) {
                return 1;
            } else {
                // Resources Sprites check!
                const aNumVal = parseInt(aNum.split("x")[0], 10);
                const bNumVal = parseInt(bNum.split("x")[0], 10);
                if (isNaN(aNumVal) || isNaN(bNumVal)) {
                    TreErrorMessage({ error: "Bug", Reason: "Both aNumVal and bNumVal must be parseable as numbers", system: "Both aNumVal and bNumVal must be parseable as numbers" }, "Both aNumVal and bNumVal must be parseable as numbers");
                }
                if (aNumVal !== bNumVal) {
                    return aNumVal - bNumVal;
                } else {
                    return aNum.localeCompare(bNum);
                }
            }
        });
        return array;
    } catch (error: any) {
        // Bug? 
        TreErrorMessage({ error: "Bug", Reason: "Both aNumVal and bNumVal must be parseable as numbers", system: error.toString() }, error.toString());
        return [];
    }
}
