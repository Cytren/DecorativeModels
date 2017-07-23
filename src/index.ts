
import {PropertyType} from "./model/property-type";
import {ModelOptions, ProcessMode} from "./model/options";
import {ValidateResult} from "./manager/validate";

import {model} from "./model/model";
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {range} from "./decorator/range";
import {manager} from "./manager/manager";

function options(options: ModelOptions) {
    manager.setGlobalOptions(options);
}

function validate(model: Object): boolean;
function validate(model: Object, result: ValidateResult);
function validate(models: Object[]): boolean;
function validate(models: Object[], result: ValidateResult);

function validate(modelOrArray: Object[], resultOrNull?: ValidateResult) {
    let models: Object[];

    if (Array.isArray(modelOrArray)) {
        models = modelOrArray;
    } else {
        models = [modelOrArray];
    }

    for (let model of models) {
        let error = manager.validate(model);

        if (error != null) {
            if (!resultOrNull) {
                return false;
            } else {
                resultOrNull(error);
                return;
            }
        }
    }

    if (!resultOrNull) {
        return true;
    } else {
        resultOrNull(null);
    }
}

export {
    PropertyType, ProcessMode,
    model, options, validate,
    type, length, range
}