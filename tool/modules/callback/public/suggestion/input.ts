"use strict";
import { RuntimeError } from "../../../implement/error.js";
import Void from "../../function_class.js";
import localization from "../../localization.js";

class input_set extends Void {
    //#region
    constructor(name: string, void_number: number) {
        super(name, void_number);
    }

    public create_input(width: number, height: number, atlas_count: number): string {
        const evaluate_display = `${localization("width")}: ${width} ~ ${localization(
            "height",
        )}: ${height} ~ ${localization("atlas_count")}: ${atlas_count}`;
        switch (this.void_number.toString().length) {
            case 1:
                return `      ${this.void_number}. ${evaluate_display}`;
            case 2:
                return `     ${this.void_number}. ${evaluate_display}`;
            case 3:
                return `    ${this.void_number}. ${evaluate_display}`;
            case 4:
                return `   ${this.void_number}. ${evaluate_display}`;
            case 5:
                return `  ${this.void_number}. ${evaluate_display}`;
            case 6:
                return ` ${this.void_number}. ${evaluate_display}`;
            default:
                return `${this.void_number}. ${evaluate_display}`;
        }
    }

    public static create_instant_void(
        mode: "notify" | "los" | "os",
        void_number: number,
        void_name: string,
    ): string | void {
        switch (mode) {
            case "notify":
                switch (void_number.toString().length) {
                    case 1:
                        return `      ${void_number}. ${void_name}`;
                    case 2:
                        return `     ${void_number}. ${void_name}`;
                    case 3:
                        return `    ${void_number}. ${void_name}`;
                    case 4:
                        return `   ${void_number}. ${void_name}`;
                    case 5:
                        return `  ${void_number}. ${void_name}`;
                    case 6:
                        return ` ${void_number}. ${void_name}`;
                    default:
                        return `${void_number}. ${void_name}`;
                }
            case "os":
                return `${void_number}. ${void_name}`;
            case "los":
                return;
            default:
                throw new RuntimeError(`${localization("no_void_to_evaluate")}`) as never;
        }
    }

    //#endregion
}

export default input_set;
