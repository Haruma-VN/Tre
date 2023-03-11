"use strict";
export default function (composite_folder: any) {
    function SortRSGPList(a: string, b: string) {
        const order = [1536, 1200, 768, 640, 384];
        const indexA = order.indexOf(parseInt((a.split('_').pop()) as any));
        const indexB = order.indexOf(parseInt((b.split('_').pop()) as any));
        if (indexA === -1 && indexB === -1) {
            return a.localeCompare(b);
        }
        if (indexA === -1) { return 1; }
        if (indexB === -1) { return -1; }
        return indexA - indexB;
    }
    return composite_folder.sort(SortRSGPList);
}