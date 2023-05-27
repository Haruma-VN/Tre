"use strict";
import localization from "./localization.js";
import { Console } from "./console.js";
import { FunctionNumberCannotBeSmallerThanZero, MissingPropertySpecializeFunctionJSON } from "../implement/error.js";
import fs_js from "../library/fs/implement.js";

export default class Void {
    static count_void: number = 0;

    constructor(
        protected name: string,
        protected void_number: number,
        private filter?: Array<string>,
        private allow?: boolean,
    ) {
        Void.count_void++;
        if (this.void_number < 0) {
            throw new FunctionNumberCannotBeSmallerThanZero(
                `${name} ${localization("function_num_cannot_smaller_than_zero")}`,
            );
        }
    }

    //#region Class Display
    public display(): string {
        switch (this.void_number.toString().length) {
            case 1:
                return `      ${this.void_number}. ${this.name}`;
            case 2:
                return `     ${this.void_number}. ${this.name}`;
            case 3:
                return `    ${this.void_number}. ${this.name}`;
            case 4:
                return `   ${this.void_number}. ${this.name}`;
            case 5:
                return `  ${this.void_number}. ${this.name}`;
            case 6:
                return ` ${this.void_number}. ${this.name}`;
            default:
                return `${this.void_number}. ${this.name}`;
        }
    }

    public void_number_readline_argument(): number {
        return this.void_number;
    }

    public change_void_display_number(new_void_display_number: number): void {
        this.void_number = new_void_display_number;
    }

    public display_text_only(): string {
        return this.name;
    }

    protected error_void_display(error: string) {
        return Console.WriteLine(`${error}`);
    }

    public static_filter(): Array<string> {
        if (this.filter !== undefined && this.filter !== null && this.filter !== void 0) {
            return this.filter;
        } else {
            throw new MissingPropertySpecializeFunctionJSON(
                `${this.name} ${localization("not_having_property_filter")}`,
                "filter",
                fs_js.functions_json_location,
                this.name,
            );
        }
    }

    public static_allowance(): boolean {
        if (this.allow !== undefined && this.allow !== null && this.allow !== void 0) {
            return this.allow;
        } else {
            throw new MissingPropertySpecializeFunctionJSON(
                `${this.name} ${localization("not_having_property_allow")}`,
                "allow",
                fs_js.functions_json_location,
                this.name,
            );
        }
    }
    //#endregion
}
