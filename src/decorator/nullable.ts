
import {manager} from "../manager/manager";

export function nullable(target: Object, propertyName: string | symbol) {
    manager
        .register("nullable")
        .create();
}