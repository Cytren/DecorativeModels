
import {ModelOptions} from "./model/options";
import {ValidateResult} from "./manager/validate";

import {model} from "./model/model";
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {range} from "./decorator/range";
import {nullable} from "./decorator/nullable";
import {required} from "./decorator/required";
import {match} from "./decorator/match";
import {manager} from "./manager/manager";

import "./extension/string";

function options(options: ModelOptions) {
    manager.setGlobalOptions(options);
}

function validate(model: Object): boolean;
function validate(model: Object, modelName: string): boolean;
function validate(model: Object, result: ValidateResult);
function validate(model: Object, modelName: string, result: ValidateResult);

function validate(models: Object[]): boolean;
function validate(models: Object[], modelName: string): boolean;
function validate(models: Object[], result: ValidateResult);
function validate(models: Object[], modelName: string, result: ValidateResult);

function validate(modelOrArray: Object | Object[],
                  modelNameOrResult?: string | ValidateResult,
                  resultOrNull?: ValidateResult): boolean | void {
    let models: Object[];
    let modelName: string;
    let validateResult: ValidateResult;

    if (Array.isArray(modelOrArray)) {
        models = modelOrArray;
    } else {
        models = [modelOrArray];
    }

    if (modelNameOrResult) {
        if (typeof modelNameOrResult == "string") {
            modelName = <string> modelNameOrResult;
        } else {
            validateResult = <ValidateResult> modelNameOrResult;
        }
    }

    if (resultOrNull) {
        if (validateResult && resultOrNull) {
            throw new Error("Result is already defined.");
        }

        validateResult = resultOrNull;
    }

    for (let model of models) {
        let error = manager.validate(model, modelName);

        if (error != null) {
            if (!validateResult) {
                return false;
            } else {
                validateResult(error);
                return;
            }
        }
    }

    if (!validateResult) {
        return true;
    } else {
        validateResult(null);
    }
}

export {
    model, options, validate,
    type, length, range,
    nullable, required, match
}