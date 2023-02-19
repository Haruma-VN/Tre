"use strict";
export default function LocalCompareItemsInDirectory(arr1, arr2) {
    return arr1.filter((x) => !arr2.includes(x));
}
