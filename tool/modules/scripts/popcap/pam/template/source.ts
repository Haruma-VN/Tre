"use strict";
/**
 *
 * @param source_number - Pass an number as index
 * @param library_name - Sprite name
 * @param matrix - Animation resize
 * @returns source
 */
function template_source(
    source_number: number,
    library_name: string,
    matrix: number
): string {
    return `<DOMSymbolItem xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="source/source_${source_number}" symbolType="graphic" xmlns="http://ns.adobe.com/xfl/2008/">
    <timeline>
        <DOMTimeline name="source_${source_number}">
            <layers>
                <DOMLayer>
                    <frames>
                        <DOMFrame index="0">
                            <elements>
                                <DOMBitmapInstance libraryItemName="media/${library_name}">
                                    <matrix>
                                        <Matrix a="${matrix}" d="${matrix}"/>
                                    </matrix>
                                </DOMBitmapInstance>
                            </elements>
                        </DOMFrame>
                    </frames>
                </DOMLayer>
            </layers>
        </DOMTimeline>
    </timeline>
</DOMSymbolItem>`;
}

export default template_source;
