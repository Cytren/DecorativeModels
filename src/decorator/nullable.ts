
import {manager} from "../manager/manager";

export function nullable(): PropertyDecorator {
    return manager
        .register("nullable")
        .create();
}