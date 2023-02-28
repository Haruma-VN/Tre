"use strict";
namespace js_checker {

    export function is_object(object_type_checker: any): boolean {
        if (Array.isArray(object_type_checker)) {
            return false;
        }
        if (object_type_checker instanceof String) {
            return false;
        }
        if (object_type_checker instanceof Function) {
            return false;
        }
        if(object_type_checker instanceof Number){
            return false;
        }
        if(object_type_checker instanceof Object){
            return true;
        }
        return false
    }

    export function is_array(array_type_checker: any): boolean {
        if (Array.isArray(array_type_checker)) {
            return true;
        }
        return false;
    }

}
export default js_checker;