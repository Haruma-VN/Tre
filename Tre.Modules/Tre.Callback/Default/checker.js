"use strict";
var js_checker;
(function (js_checker) {
    function is_object(object_type_checker) {
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
    js_checker.is_object = is_object;
    function is_array(array_type_checker) {
        if (Array.isArray(array_type_checker)) {
            return true;
        }
        return false;
    }
    js_checker.is_array = is_array;
    function is_string(string_type_checker) {
        if (is_object(string_type_checker) || is_array(string_type_checker)) {
            return false;
        }
        if (string_type_checker instanceof String) {
            return true;
        }
        return false;
    }
    js_checker.is_string = is_string;
    function is_nan(nan_type_checker) {
        if (isNaN(nan_type_checker)) {
            return true;
        }
        return false;
    }
    js_checker.is_nan = is_nan;
    function is_undefined(undefined_type_checker) {
        if (undefined_type_checker === undefined) {
            return true;
        }
        return false;
    }
    js_checker.is_undefined = is_undefined;
    function is_null(null_type_checker) {
        if (null_type_checker === null) {
            return true;
        }
        return false;
    }
    js_checker.is_null = is_null;
    function is_void_0(void_0_type_checker) {
        if (void_0_type_checker === void 0) {
            return true;
        }
        return false;
    }
    js_checker.is_void_0 = is_void_0;
    function strict_type_checker(type_checker) {
        if (!is_undefined && !is_null(type_checker) && !is_void_0(type_checker)) {
            return true;
        }
        return false;
    }
    js_checker.strict_type_checker = strict_type_checker;
    function is_number(number_type_checker) {
        if (is_nan(number_type_checker)) {
            return false;
        }
        if (number_type_checker instanceof Number && typeof (number_type_checker) === "number") {
            return true;
        }
        return false;
    }
    js_checker.is_number = is_number;
    function is_evaluate_data(evaluate_data, ban_list) {
        if (ban_list.includes(evaluate_data)) {
            return false;
        }
        return true;
    }
    js_checker.is_evaluate_data = is_evaluate_data;
})(js_checker || (js_checker = {}));
export default js_checker;
