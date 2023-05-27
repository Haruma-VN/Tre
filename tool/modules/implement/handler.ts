"use strict";
import fs_js from "../library/fs/implement.js";
import * as ImplementError from "./error.js";
import { Console } from "../callback/console.js";
import localization from "../callback/localization.js";
import { fgred_string } from "../library/color/color.js";

function print_error<Generic_T extends Error, Generic_U extends string>(error: unknown) {
    switch ((error as Generic_T).constructor) {
        case ImplementError.BrokenFile: {
            const name: string = (error as ImplementError.BrokenFile).name;
            const file_location: string = (error as ImplementError.BrokenFile).file_location;
            const message: string = (error as ImplementError.BrokenFile).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_load(file_location);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.DOMDocumentError: {
            const name: string = (error as ImplementError.DOMDocumentError).name;
            const file_location: string = (error as ImplementError.DOMDocumentError).file_path_location;
            const message: string = (error as ImplementError.DOMDocumentError).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_load(file_location);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.DimensionError: {
            const name: string = (error as ImplementError.DimensionError).name;
            const file_location: string = (error as ImplementError.DimensionError).file_path_location;
            const message: string = (error as ImplementError.DimensionError).message;
            const property_error: string = (error as ImplementError.DimensionError).dimension_type_error;
            fs_js.execution_exception_type(name);
            fs_js.execution_load(file_location);
            fs_js.execution_notify("failed", property_error);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.EncodingError: {
            const name: string = (error as ImplementError.EncodingError).name;
            const file_location: string = (error as ImplementError.EncodingError).file_path_location;
            const message: string = (error as ImplementError.EncodingError).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_load(file_location);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.EvaluateError: {
            const name: string = (error as ImplementError.EvaluateError).name;
            const message: string = (error as ImplementError.EvaluateError).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.EvaluateWithoutDefaultPoint: {
            const name: string = (error as ImplementError.EvaluateWithoutDefaultPoint).name;
            const message: string = (error as ImplementError.EvaluateWithoutDefaultPoint).message;
            const type_error: string = (error as ImplementError.EvaluateWithoutDefaultPoint).type_error;
            fs_js.execution_exception_type(name);
            fs_js.execution_notify("failed", type_error);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.FrameRateIncreasementError: {
            const name: string = (error as ImplementError.FrameRateIncreasementError).name;
            const message: string = (error as ImplementError.FrameRateIncreasementError).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.FunctionNumberCannotBeSmallerThanZero: {
            const name: string = (error as ImplementError.FunctionNumberCannotBeSmallerThanZero).name;
            const message: string = (error as ImplementError.FunctionNumberCannotBeSmallerThanZero).message;
            fs_js.execution_exception_type(name);
            fs_js.execution_error(message);
            fs_js.execution_notify(
                "failed",
                (error as ImplementError.FunctionNumberCannotBeSmallerThanZero).entry_point,
            );
            break;
        }
        case ImplementError.ImageXMLError: {
            const name: string = (error as ImplementError.ImageXMLError).name;
            const message: string = (error as ImplementError.ImageXMLError).message;
            const location: string = (error as ImplementError.ImageXMLError).file_path_location;
            fs_js.execution_exception_type(name);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.WrongDataType: {
            const name: string = (error as ImplementError.WrongDataType).name;
            const message: string = (error as ImplementError.WrongDataType).message;
            const location: string = (error as ImplementError.WrongDataType).file_path_location;
            const expected_data_type: string = (error as ImplementError.WrongDataType).type_expected;
            fs_js.execution_exception_type(name);
            Console.WriteLine(
                fgred_string(
                    `◉ ${localization("execution_expected")}: ${localization("expected_variable_type").replace(
                        /\{\}/g,
                        expected_data_type,
                    )}`,
                ),
            );
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.MissingProperty: {
            const name: string = (error as ImplementError.MissingProperty).name;
            const message: string = (error as ImplementError.MissingProperty).message;
            const location: string = (error as ImplementError.MissingProperty).file_path_location;
            const property: string = (error as ImplementError.MissingProperty).property;
            fs_js.execution_exception_type(`${name} ${localization("and_property_is")} "${property}"`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.PropertyHasNotBeenDefined: {
            const name: string = (error as ImplementError.PropertyHasNotBeenDefined).name;
            const message: string = (error as ImplementError.PropertyHasNotBeenDefined).message;
            const location: string = (error as ImplementError.PropertyHasNotBeenDefined).file_path_location;
            const property: string = (error as ImplementError.PropertyHasNotBeenDefined).property;
            fs_js.execution_exception_type(`${name} ${localization("and_property_is")} "${property}"`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.MissingPropertySpecializeFunctionJSON: {
            const name: string = (error as ImplementError.MissingPropertySpecializeFunctionJSON).name;
            const message: string = (error as ImplementError.MissingPropertySpecializeFunctionJSON).message;
            const location: string = (error as ImplementError.MissingPropertySpecializeFunctionJSON).file_path_location;
            const property: string = (error as ImplementError.MissingPropertySpecializeFunctionJSON).property;
            const function_name: string = (error as ImplementError.MissingPropertySpecializeFunctionJSON).function_name;
            fs_js.execution_exception_type(
                `${name} ${localization("from_function")} ${function_name}  ${localization(
                    "and_property_is",
                )} "${property}"`,
            );
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.RuntimeError: {
            const name: string = (error as ImplementError.RuntimeError).name;
            const message: string = (error as ImplementError.RuntimeError).message;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.RuntimeError: {
            const name: string = (error as ImplementError.RuntimeError).name;
            const message: string = (error as ImplementError.RuntimeError).message;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.FrameRateIncreasementError: {
            const name: string = (error as ImplementError.FrameRateIncreasementError).name;
            const message: string = (error as ImplementError.FrameRateIncreasementError).message;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.MissingFileRequirement: {
            const name: string = (error as ImplementError.MissingFileRequirement).name;
            const message: string = (error as ImplementError.MissingFileRequirement).message;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.MissingFile: {
            const name: string = (error as ImplementError.MissingFile).name;
            const message: string = (error as ImplementError.MissingFile).message;
            const location: string = (error as ImplementError.MissingFile).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.WrongFile: {
            const name: string = (error as ImplementError.WrongFile).name;
            const message: string = (error as ImplementError.WrongFile).message;
            const location: string = (error as ImplementError.WrongFile).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.BrokenFile: {
            const name: string = (error as ImplementError.BrokenFile).name;
            const message: string = (error as ImplementError.BrokenFile).message;
            const location: string = (error as ImplementError.BrokenFile).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.MissingDirectory: {
            const name: string = (error as ImplementError.MissingDirectory).name;
            const message: string = (error as ImplementError.MissingDirectory).message;
            const location: string = (error as ImplementError.MissingDirectory).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.InvalidRange: {
            const name: string = (error as ImplementError.InvalidRange).name;
            const message: string = (error as ImplementError.InvalidRange).message;
            const location: string = (error as ImplementError.InvalidRange).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.DOMDocumentError: {
            const name: string = (error as ImplementError.DOMDocumentError).name;
            const message: string = (error as ImplementError.DOMDocumentError).message;
            const location: string = (error as ImplementError.DOMDocumentError).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ImageXMLError: {
            const name: string = (error as ImplementError.ImageXMLError).name;
            const message: string = (error as ImplementError.ImageXMLError).message;
            const location: string = (error as ImplementError.ImageXMLError).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.SpriteXMLError: {
            const name: string = (error as ImplementError.SpriteXMLError).name;
            const message: string = (error as ImplementError.SpriteXMLError).message;
            const location: string = (error as ImplementError.SpriteXMLError).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ResourceDataTypeContainerStrictlyRequirement: {
            const name: string = (error as ImplementError.ResourceDataTypeContainerStrictlyRequirement).name;
            const message: string = (error as ImplementError.ResourceDataTypeContainerStrictlyRequirement).message;
            const location: string = (error as ImplementError.ResourceDataTypeContainerStrictlyRequirement)
                .file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ReadPathFailed: {
            const name: string = (error as ImplementError.ReadPathFailed).name;
            const message: string = (error as ImplementError.ReadPathFailed).message;
            const location: string = (error as ImplementError.ReadPathFailed).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ResizeImageError: {
            const name: string = (error as ImplementError.ResizeImageError).name;
            const message: string = (error as ImplementError.ResizeImageError).message;
            const location: string = (error as ImplementError.MissingDirectory).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.UnknownFormat: {
            const name: string = (error as ImplementError.UnknownFormat<Generic_U>).name;
            const message: string = (error as ImplementError.UnknownFormat<Generic_U>).message;
            const format: Generic_U = (error as ImplementError.UnknownFormat<Generic_U>).format;
            const location: string = (error as ImplementError.MissingDirectory).file_location;
            fs_js.execution_exception_type(`${name} ${localization("and_unknown_format_is").replace(/\{\}/g, format)}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.JSONParseSyntaxError: {
            const name: string = (error as ImplementError.JSONParseSyntaxError).name;
            const message: string = (error as ImplementError.JSONParseSyntaxError).message;
            const location: string = (error as ImplementError.JSONParseSyntaxError).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.JSONParseTrailingCommasError: {
            const name: string = (error as ImplementError.JSONParseTrailingCommasError).name;
            const message: string = (error as ImplementError.JSONParseTrailingCommasError).message;
            const location: string = (error as ImplementError.JSONParseTrailingCommasError).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.JSONPatchOperationError: {
            const name: string = (error as ImplementError.JSONPatchOperationError).name;
            const message: string = (error as ImplementError.JSONPatchOperationError).message;
            const operation: string = (error as ImplementError.JSONPatchOperationError).operation;
            fs_js.execution_exception_type(
                `${name} ${localization("and_the_operation_is").replace(/\{\}/g, operation)}`,
            );
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.WrongPropertyValue: {
            const name: string = (error as ImplementError.WrongPropertyValue).name;
            const message: string = (error as ImplementError.WrongPropertyValue).message;
            const location: string = (error as ImplementError.WrongPropertyValue).file_path_location;
            const additional_message: string = (error as ImplementError.WrongPropertyValue).additional_message;
            const property: string = (error as ImplementError.WrongPropertyValue).property;
            fs_js.execution_exception_type(
                `${name} ${localization("and_the_wrong_property_is").replace(/\{\}/g, property)}`,
            );
            Console.WriteLine(fgred_string(`◉ ${localization("execution_reminder")}: ${additional_message}`));
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ModuleNotFound: {
            const name: string = (error as ImplementError.ModuleNotFound).name;
            const message: string = (error as ImplementError.ModuleNotFound).message;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            break;
        }
        case ImplementError.UnsupportedDataType: {
            const name: string = (error as ImplementError.UnsupportedDataType).name;
            const message: string = (error as ImplementError.UnsupportedDataType).message;
            const location: string = (error as ImplementError.UnsupportedDataType).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.UnsupportedFileType: {
            const name: string = (error as ImplementError.UnsupportedFileType).name;
            const message: string = (error as ImplementError.UnsupportedFileType).message;
            const location: string = (error as ImplementError.UnsupportedFileType).file_path_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.CannotWriteFile: {
            const name: string = (error as ImplementError.CannotWriteFile).name;
            const message: string = (error as ImplementError.CannotWriteFile).message;
            const location: string = (error as ImplementError.CannotWriteFile).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.CannotReadFileSystem: {
            const name: string = (error as ImplementError.CannotReadFileSystem).name;
            const message: string = (error as ImplementError.CannotReadFileSystem).message;
            const location: string = (error as ImplementError.CannotReadFileSystem).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.ExtensionDoesNotMeetsRequirement: {
            const name: string = (error as ImplementError.ExtensionDoesNotMeetsRequirement).name;
            const message: string = (error as ImplementError.ExtensionDoesNotMeetsRequirement).message;
            const location: string = (error as ImplementError.ExtensionDoesNotMeetsRequirement).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        case ImplementError.JoinImageError: {
            const name: string = (error as ImplementError.JoinImageError).name;
            const message: string = (error as ImplementError.JoinImageError).message;
            const location: string = (error as ImplementError.JoinImageError).file_location;
            fs_js.execution_exception_type(`${name}`);
            fs_js.execution_error(message);
            fs_js.execution_load(location);
            break;
        }
        default: {
            Console.WriteLine(fgred_string(`◉ ${localization("execution_failed")}: ${(error as any).toString()}`));
        }
    }
}

export default print_error;
