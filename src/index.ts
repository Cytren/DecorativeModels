
import {PropertyType} from "./model/property-type";
import {ModelOptions, ProcessMode} from "./model/options";

import {model} from "./decorator/model";
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {range} from "./decorator/range";
import {manager} from "./manager/manager";

function options(options: ModelOptions) {
    manager.setGlobalOptions(options);
}

function validate(model: Object): boolean {
    return manager.validate(model);
}

export {
    PropertyType, ProcessMode,
    model, options, validate,
    type, length, range
}