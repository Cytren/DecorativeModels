
import {manager} from "../manager/manager";

export function required(): PropertyDecorator {
    return manager
        .register("required")
        .create();
}