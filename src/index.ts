
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {manager} from "./manager/manager";

function validate(model: Object): boolean {
    return manager.validate(model);
}

export {
    type, length, validate
};