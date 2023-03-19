"use strict";
export default function LocalCompareItemsInDirectory(arr1: string[], arr2: string[]): string[] {
    return arr1.filter((x) => !arr2.includes(x));
}