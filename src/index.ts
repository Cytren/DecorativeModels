
import {PropertyType} from "./model/property-type";
import {ProcessMode} from "./model/options";

import {model} from "./decorator/model";
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {manager} from "./manager/manager";

function validate(model: Object): boolean {
    return manager.validate(model);
}

export {
    PropertyType, ProcessMode,
    model,
    type, length, validate
}