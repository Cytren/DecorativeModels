
import {manager} from "../manager/manager";

export function length(min: number, max: number): PropertyDecorator {
    return manager
        .register("length")
        .priority(5)
        .validate((propertyName, propertyValue) => {
            return true;
        })
        .create();
}