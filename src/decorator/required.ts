
import {manager} from "../manager/manager";

export function required(target: Object, propertyName: string | symbol) {
    manager
        .register("required")
        .create();
}