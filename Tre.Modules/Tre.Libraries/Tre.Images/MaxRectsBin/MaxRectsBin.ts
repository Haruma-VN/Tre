"use strict";
export class MaxRectsBin {
    private binWidth: number;
    private binHeight: number;
    private freeRects: { x: number, y: number, width: number, height: number }[];
    private imagesInserted: number;

    constructor(binWidth: number, binHeight: number) {
        this.binWidth = binWidth;
        this.binHeight = binHeight;
        this.freeRects = [{ x: 1, y: 1, width: binWidth - 1, height: binHeight - 1 }];
        this.imagesInserted = 0;
    }

    insertRect(width: number, height: number): { x: number, y: number, width: number, height: number } | null {
        let bestScore = Infinity;
        let bestRectIndex = -1;
        let bestHeight = 0;

        for (let i = 0; i < this.freeRects.length; i++) {
            const r = this.freeRects[i];
            if (r.width >= width && r.height >= height) {
                const score = (r.width - width) * (r.height - height);
                if (score < bestScore || (score === bestScore && r.height < bestHeight)) {
                    bestScore = score;
                    bestRectIndex = i;
                    bestHeight = r.height;
                }
            }
        }

        if (bestRectIndex === -1) {
            return null;
        }

        const bestRect = this.freeRects[bestRectIndex];
        let newRect = { x: bestRect.x, y: bestRect.y, width: width, height: height };

        newRect.x += 5 * this.imagesInserted;
        newRect.width -= 5 * this.imagesInserted;

        this.imagesInserted++;

        this.freeRects.splice(bestRectIndex, 1);

        let newFreeRects = [];

        if (bestRect.x + width < this.binWidth) {
            newFreeRects.push({ x: bestRect.x + width, y: bestRect.y, width: bestRect.width - width, height: height });
        }

        if (bestRect.y + height < this.binHeight) {
            newFreeRects.push({ x: bestRect.x, y: bestRect.y + height, width: bestRect.width, height: bestRect.height - height });
        }

        if (bestRect.x + width < this.binWidth && bestRect.y + height < this.binHeight) {
            newFreeRects.push({ x: bestRect.x + width, y: bestRect.y + height, width: bestRect.width - width, height: bestRect.height - height });
        }

        this.freeRects = this.freeRects.concat(newFreeRects);

        return newRect;
    }
}