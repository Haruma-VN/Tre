"use strict";
export const arguments_list: Array<string> = process.argv;

export enum args {
    /**
     * @param argument_0 - NodeJS Location if not build exe
     * @param argument_1 - main.js location if not build exe
     */
    argument_0 = process.argv[0] as any,
    argument_1 = process.argv[1] as any,
    main_js = argument_1,
    argument_length = arguments_list.length,
    current_workplace = process.cwd() as any,
}
