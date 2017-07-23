
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

function validate(model: Object, result?: ValidateResult) {
    let error = manager.validate(model);

    if (!result) {
        return error == null;
    } else {
        result(error);
    }
}

export {
    PropertyType, ProcessMode,
    model, options, validate,
    type, length, range
}