"use strict";
import localization from "../callback/localization.js";
import fs_js from "../library/fs/implement.js";

abstract class OverrideInheritence {
    public static [Symbol.hasInstance](instance: any): boolean {
        return false;
    }
}

export class RuntimeError extends Error {
    public constructor(error: string) {
        super(error);
        this.name = localization("runtime_error");
    }
}

export class EvaluateError extends Error {
    public constructor(error: string) {
        super(error);
        this.name = localization("evaluate_error");
    }
}

export class FrameRateIncreasementError extends Error {
    public constructor(error: string) {
        super(error);
        this.name = localization("frame_rate_increasement_error");
    }
}

export class MissingFileRequirement extends Error {
    public constructor(error: string) {
        super(error);
        this.name = localization("missing_files_requirement");
    }
}

export class ModuleNotFound extends Error {
    private _module: string;
    public constructor(error: string, module: string) {
        super(error);
        this.name = localization("module_not_found");
        this._module = module;
    }
    public get module(): string {
        return this._module;
    }
    public set module(new_module: string) {
        this._module = new_module;
    }
}

export class FunctionNumberCannotBeSmallerThanZero extends Error {
    private _entry_point: string = fs_js.functions_json_location;
    public constructor(error: string) {
        super(error);
        this.name = localization("function_number_cannot_be_smaller_than_zero");
    }
    public get entry_point(): string {
        return this._entry_point;
    }
    public set entry_point(str: string) {
        this._entry_point = str;
    }
}

export class MissingProperty extends Error {
    protected _property: string;
    protected _file_path_location: string;

    public constructor(error: string, property: string, file_path_location: string) {
        super(error);
        this.name = localization("missing_property");
        this._property = property;
        this._file_path_location = file_path_location;
    }

    public get property(): string {
        return this._property;
    }

    public set property(new_property: string) {
        if (
            typeof new_property === "string" &&
            new_property !== null &&
            new_property !== undefined &&
            new_property !== void 0
        ) {
            this._property = new_property;
        }
    }

    public get file_path_location(): string {
        return this._file_path_location;
    }

    public set file_path_location(new_file_path_location: string) {
        if (
            typeof new_file_path_location === "string" &&
            new_file_path_location !== null &&
            new_file_path_location !== undefined &&
            new_file_path_location !== void 0
        ) {
            this._file_path_location = new_file_path_location;
        }
    }
}

export class MissingPropertySpecializeFunctionJSON extends MissingProperty {
    private _function_name: string;
    constructor(error: string, property: string, file_path_location: string, function_name: string) {
        super(error, property, file_path_location);
        this._function_name = function_name;
    }

    public get function_name(): string {
        return this._function_name;
    }

    public set function_name(new_function_name: string) {
        if (
            typeof new_function_name === "string" &&
            new_function_name !== null &&
            new_function_name !== undefined &&
            new_function_name !== void 0
        ) {
            this._function_name = new_function_name;
        }
    }
}

export class EvaluateWithoutDefaultPoint extends Error {
    private _type_error: string;
    public constructor(message: string, type_error: string) {
        super(message);
        this.name = localization("no_entry_point");
        this._type_error = type_error;
    }
    public get type_error(): string {
        return this._type_error;
    }

    public set type_error(new_type_error: string) {
        if (
            typeof new_type_error === "string" &&
            new_type_error !== null &&
            new_type_error !== undefined &&
            new_type_error !== void 0
        ) {
            this._type_error = new_type_error;
        }
    }
}

export class PropertyHasNotBeenDefined extends MissingProperty {
    public constructor(message: string, property: string, file_path_location: string) {
        super(message, property, file_path_location);
        this.name = localization("property_is_not_defined");
    }
}

export class WrongDataType extends MissingProperty {
    private _type_expected: string;
    /**
     *
     * @param message
     * @param property
     * @param file_path_location
     * @param type_expected - Remember to implement this (expected_type example: boolean)
     */
    public constructor(message: string, property: string, file_path_location: string, type_expected: string) {
        super(message, property, file_path_location);
        this.name = localization("wrong_data_type");
        this._type_expected = type_expected;
    }
    public get type_expected(): string {
        return this._type_expected;
    }
    public set type_expected(new_type_expect: string) {
        this._type_expected = new_type_expect;
    }
}

export class DimensionError extends Error {
    protected _dimension_type_error: "width" | "height";
    protected _file_path_location: string;
    public constructor(message: string, file_path_location: string, dimension_type_error: "width" | "height") {
        super(message);
        this.name = localization("wrong_dimension");
        this._dimension_type_error = dimension_type_error;
        this._file_path_location = file_path_location;
    }
    public get dimension_type_error(): "width" | "height" {
        return this._dimension_type_error;
    }
    public set dimension_type_error(new_expected_dimension_type: "width" | "height") {
        this._dimension_type_error = new_expected_dimension_type;
    }
    public get file_path_location(): string {
        return this._file_path_location;
    }
    public set file_path_location(new_file_location: string) {
        this._file_path_location = new_file_location;
    }
}

export class MissingFile extends Error {
    protected _file_path_location: string;
    public constructor(message: string, file_path_location: string) {
        super(message);
        this.name = localization("missing_file");
        this._file_path_location = file_path_location;
    }

    public get file_location(): string {
        return this._file_path_location;
    }

    public set file_location(new_file_location: string) {
        this._file_path_location = new_file_location;
    }
}

export class MissingDirectory extends MissingFile {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("missing_directory");
    }
}

export class ResizeImageError extends Error {
    protected _file_path_location: string;
    protected _code: string;

    public constructor(message: string, file_path_location: string, code: string) {
        super(message);
        this.name = localization("resize_error");
        this._file_path_location = file_path_location;
        this._code = code;
    }

    public get code(): string {
        return this.code;
    }

    public set code(new_code: string) {
        this._code = new_code;
    }
}

export class UnknownFormat<T> extends ResizeImageError {
    private _format: T;
    public constructor(message: string, file_path_location: string, code: string, format: T) {
        super(message, file_path_location, code);
        this.name = localization("unknown_format");
        this._format = format;
    }
    public get format(): T {
        return this._format;
    }

    public set format(new_format: T) {
        this._format = new_format;
    }
}

export class JSONParseSyntaxError extends Error {
    protected _file_path_location: string;
    public constructor(message: string, file_path_location: string) {
        super(message);
        this.name = localization("unknown_format");
        this._file_path_location = file_path_location;
    }
    public get file_path_location(): string {
        return this._file_path_location;
    }

    public set file_path_location(new_file_location: string) {
        this._file_path_location = new_file_location;
    }
}

export class JSONParseTrailingCommasError extends JSONParseSyntaxError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("this_json_trailing_commas");
    }
}

export class JSONParseTypeError extends JSONParseSyntaxError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("this_json_has_type_error");
    }
}

export class JSONPatchOperationError extends Error {
    protected _operation: string;
    public constructor(message: string, operation: string) {
        super(message);
        this.name = localization("this_json_has_type_error");
        this._operation = operation;
    }

    public get operation(): string {
        return this._operation;
    }

    public set operation(new_operation: string) {
        this._operation = new_operation;
    }
}

export class WrongPropertyValue extends MissingProperty {
    protected _additional_message: string = "";
    public constructor(error: string, property: string, file_path_location: string, additional_message?: string) {
        super(error, property, file_path_location);
        this.name = localization("wrong_property_value");
        if (
            additional_message !== null &&
            additional_message !== undefined &&
            additional_message !== void 0 &&
            typeof additional_message === "string"
        ) {
            this._additional_message = additional_message;
        }
    }
    public get additional_message(): string {
        return this._additional_message;
    }
    public set additional_message(new_msg: string) {
        this._additional_message = new_msg;
    }
}

export class WrongFile extends MissingFile {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("wrong_file_type");
    }
}

export class BrokenFile extends WrongFile {
    public constructor(message: string, file_path_location: string, name: string) {
        super(message, file_path_location);
        this.name = name;
    }
}

export class InvalidRange extends Error {
    protected _file_path_location: string;
    public constructor(message: string, file_path_location: string) {
        super(message);
        this.name = localization("invalid_range");
        this._file_path_location = file_path_location;
    }
    public get file_path_location(): string {
        return this._file_path_location;
    }
    public set file_path_location(file_location: string) {
        this._file_path_location = file_location;
    }
}

export class DOMDocumentError extends InvalidRange {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("domdocument_error");
    }
}

export class ImageXMLError extends DOMDocumentError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("image_error");
    }
}

export class SpriteXMLError extends ImageXMLError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("sprite_error");
    }
}

export class ResourceDataTypeContainerStrictlyRequirement extends ImageXMLError {
    public constructor(message: string, file_path_location: string, name: string) {
        super(message, file_path_location);
        this.name = name;
    }
}

export class EncodingError extends ImageXMLError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("encoding_error");
    }
}

export class ReadPathFailed extends ImageXMLError {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("cannot_read_path");
    }
}

export class UnsupportedDataType extends ReadPathFailed {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("unsupported_data_type");
    }
}

export class UnsupportedFileType extends UnsupportedDataType {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("unsupported_file_type");
    }
}

export class CannotWriteFile extends MissingFile {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("cannot_write_file");
    }
}

export class CannotReadFileSystem extends MissingFile {
    public constructor(message: string, file_path_location: string, write_template: "directory" | "file" | "unknown") {
        super(message, file_path_location);
        switch (write_template) {
            case "directory": {
                this.name = localization("cannot_read_file").replace(/\{\}/g, localization("directory"));
                break;
            }
            case "file": {
                this.name = localization("cannot_read_file").replace(/\{\}/g, localization("file"));
                break;
            }
            default: {
                this.name = localization("cannot_read_file").replace(/\{\}/g, localization("file_or_directory"));
                break;
            }
        }
    }
}

export class ExtensionDoesNotMeetsRequirement extends MissingFile {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("cannot_read_file");
    }
}

export class JoinImageError extends MissingFile {
    public constructor(message: string, file_path_location: string) {
        super(message, file_path_location);
        this.name = localization("cannot_read_file");
    }
}

// try {
//     throw new PropertyHasNotBeenDefined("d", "d", "d");
// } catch (error: any) {
//     console.log(error.constructor === MissingProperty);
// }
