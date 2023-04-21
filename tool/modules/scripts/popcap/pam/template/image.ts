"use strict";
/**
 *
 * @param image_number - Index
 * @param position - Position of PAM
 * @param transformationPoint - Transformation point
 * @returns
 */
function template_image(
    image_number: number,
    position: {
        a?: number;
        b?: number;
        c?: number;
        d?: number;
        tx: number;
        ty: number;
    },
    transformationPoint: {
        point_x: number;
        point_y: number;
    } = {
        point_x: -position.tx,
        point_y: -position.ty,
    }
) {
    if (
        position.a === null ||
        position.a === undefined ||
        position.a === void 0
    ) {
        position.a = 1;
    }
    if (
        position.b === null ||
        position.b === undefined ||
        position.b === void 0
    ) {
        position.b = 0;
    }
    if (
        position.c === null ||
        position.c === undefined ||
        position.c === void 0
    ) {
        position.c = 0;
    }
    if (
        position.d === null ||
        position.d === undefined ||
        position.d === void 0
    ) {
        position.d = 1;
    }
    const [pos_a, pos_b, pos_c, pos_d, tx, ty, transform_x, transform_y]: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ] = [
        position.a.toFixed(6),
        position.b.toFixed(6),
        position.c.toFixed(6),
        position.d.toFixed(6),
        position.tx.toFixed(6),
        position.ty.toFixed(6),
        transformationPoint.point_x.toFixed(6),
        transformationPoint.point_y.toFixed(6),
    ];
    return `<DOMSymbolItem xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" name="image/image_${image_number}" symbolType="graphic" xmlns="http://ns.adobe.com/xfl/2008/">
    <timeline>
        <DOMTimeline name="image_${image_number}">
            <layers>
                <DOMLayer>
                    <frames>
                        <DOMFrame index="0">
                            <elements>
                                <DOMSymbolInstance libraryItemName="source/source_${image_number}" symbolType="graphic" loop="loop">
                                    <matrix>
                                        <Matrix a="${pos_a}" b="${pos_b}" c="${pos_c}" d="${pos_d}" tx="${tx}" ty="${ty}"/>
                                    </matrix>
                                    <transformationPoint>
                                        <Point x="${transform_x}" y="${transform_y}"/>
                                    </transformationPoint>
                                </DOMSymbolInstance>
                            </elements>
                        </DOMFrame>
                    </frames>
                </DOMLayer>
            </layers>
        </DOMTimeline>
    </timeline>
</DOMSymbolItem>`;
}

export default template_image;
