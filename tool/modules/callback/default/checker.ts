"use strict";

namespace js_checker {
    export function is_object(
        object_type_checker: any
    ): object_type_checker is object {
        if (Array.isArray(object_type_checker)) {
            return false;
        }
        if (object_type_checker instanceof String) {
            return false;
        }
        if (object_type_checker instanceof Function) {
            return false;
        }
        if (object_type_checker instanceof Number) {
            return false;
        }
        if (object_type_checker instanceof Object) {
            return true;
        }
        return false;
    }

    export function is_array(
        array_type_checker: any
    ): array_type_checker is Array<any> {
        if (Array.isArray(array_type_checker)) {
            return true;
        }
        return false;
    }

    export function is_string(
        string_type_checker: any
    ): string_type_checker is string {
        if (is_object(string_type_checker) || is_array(string_type_checker)) {
            return false;
        }

        if (string_type_checker instanceof String) {
            return true;
        }

        return false;
    }

    export function is_nan(nan_type_checker: any): boolean {
        if (isNaN(nan_type_checker)) {
            return true;
        }
        return false;
    }

    export function is_undefined(
        undefined_type_checker: any
    ): undefined_type_checker is undefined {
        if (undefined_type_checker === undefined) {
            return true;
        }
        return false;
    }

    export function is_null(null_type_checker: any): null_type_checker is null {
        if (null_type_checker === null) {
            return true;
        }
        return false;
    }

    export function is_void_0(
        void_0_type_checker: any
    ): void_0_type_checker is void {
        if (void_0_type_checker === void 0) {
            return true;
        }
        return false;
    }

    export function strict_type_checker(type_checker: any): boolean {
        if (
            !is_undefined &&
            !is_null(type_checker) &&
            !is_void_0(type_checker)
        ) {
            return true;
        }

        return false;
    }

    export function is_number(number_type_checker: any): boolean {
        if (is_nan(number_type_checker)) {
            return false;
        }
        if (
            number_type_checker instanceof Number &&
            typeof number_type_checker === "number"
        ) {
            return true;
        }

        return false;
    }

    export function is_evaluate_data(
        evaluate_data: string,
        ban_list: Array<string>
    ): boolean {
        if (ban_list.includes(evaluate_data)) {
            return false;
        }
        return true;
    }
}
export default js_checker;
