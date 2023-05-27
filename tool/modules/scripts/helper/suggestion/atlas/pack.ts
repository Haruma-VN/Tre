"use strict";
import { MaxRectsPacker } from "maxrects-packer";
import fs_js from "../../../../library/fs/implement.js";
import localization from "../../../../callback/localization.js";

async function evaluate_test(
    file_system_directory: string,
    padding: number
): Promise<
    Array<{
        width: number;
        height: number;
        atlas_count: number;
    }>
> {
    const create_evaluate_array: string[] = fs_js.one_reader(
        file_system_directory
    );
    const constexp_beautiful_atlas_size: number[] = [
        64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384,
    ];
    if (create_evaluate_array.length === 0) {
        throw new Error(localization("error_smart"));
    }
    const create_new_dimension_array: Array<
        Promise<{
            width: number;
            height: number;
        }>
    > = (await Promise.all(
        create_evaluate_array.map(async (evaluate_file: string) => {
            if (fs_js.js_check_extname(evaluate_file, ".png")) {
                return (await (
                    fs_js.get_async_dimension(
                        `${file_system_directory}/${evaluate_file}`
                    ) as Promise<{
                        width: number;
                        height: number;
                    }>
                ).then((result: { width: number; height: number }) => {
                    return {
                        filename: evaluate_file,
                        width: result.width,
                        height: result.height,
                    };
                })) as {
                    width: number;
                    height: number;
                    filename: string;
                };
            }
        })
    ).then((result) =>
        result.filter(
            (dimension) =>
                (dimension as {
                    width: number;
                    height: number;
                    filename: string;
                }) !== undefined &&
                dimension !== null &&
                dimension !== void 0
        )
    )) as Array<
        Promise<{
            width: number;
            height: number;
            filename: string;
        }>
    >;
    const max_number_in_dimension_array =
        await create_new_dimension_array.reduce(async (acc, current) => {
            const { maxWidth, maxHeight } = await acc;
            const { width, height } = await current;

            return {
                maxWidth: width > maxWidth ? width : maxWidth,
                maxHeight: height > maxHeight ? height : maxHeight,
            };
        }, Promise.resolve({ maxWidth: 0, maxHeight: 0 }));
    const max_number_compare: number = Math.max(
        max_number_in_dimension_array.maxHeight,
        max_number_in_dimension_array.maxHeight
    );
    const test_case_for_max_rects_bin: number[] = [];
    for (let i: number = 0; i < constexp_beautiful_atlas_size.length; ++i) {
        if (constexp_beautiful_atlas_size[i] > max_number_compare) {
            test_case_for_max_rects_bin.push(constexp_beautiful_atlas_size[i]);
        }
    }
    const options = {
        smart: true,
        pot: false,
        square: true,
        allowRotation: false,
    };
    //width
    const create_output_array: Array<{
        width: number;
        height: number;
        atlas_count: number;
    }> = [];
    for (let i: number = 0; i < test_case_for_max_rects_bin.length; i++) {
        //height
        for (let j: number = 0; j < test_case_for_max_rects_bin.length; j++) {
            let packer = await new MaxRectsPacker(
                await test_case_for_max_rects_bin[i],
                await test_case_for_max_rects_bin[j],
                padding,
                options
            );
            await packer.addArray((await create_new_dimension_array) as any);
            await create_output_array.push({
                width: await test_case_for_max_rects_bin[i],
                height: await test_case_for_max_rects_bin[j],
                atlas_count: packer.bins.length,
            });
        }
    }
    return create_output_array;
}

export default evaluate_test;
