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
        return aArea - bArea;
    });
    return atlasList;
}

export default sort_atlas_area;
