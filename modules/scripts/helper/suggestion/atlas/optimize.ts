"use strict";
interface Atlas {
    width: number;
    height: number;
    atlas_count: number;
}

function sort_atlas_area(atlasList: Atlas[]): Array<Atlas> {
    atlasList.sort((a, b) => {
        const aArea = a.width * a.height * a.atlas_count;
        const bArea = b.width * b.height * b.atlas_count;

        if (aArea !== bArea) {
            return aArea - bArea;
        } else if (a.atlas_count !== b.atlas_count) {
            return a.atlas_count - b.atlas_count;
        } else {
            const aMaxSize = Math.max(a.width, a.height);
            const bMaxSize = Math.max(b.width, b.height);
            return aMaxSize - bMaxSize;
        }
    });
    return atlasList;
}

export default sort_atlas_area;