"use strict";
export default class Void {
    constructor(private name: string, private void_number: number, private filter: Array<string>, private allow: boolean) { }

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
        return console.log(`${error}`);
    }

    public static_filter(
    ): Array<string> {
        return this.filter;
    }

    public static_allowance(
    ): boolean {
        return this.allow;
    }
    //#endregion
}