
import {manager} from "../manager/manager";

export function length(min: number, max: number): PropertyDecorator {
    return manager
        .register("length")
        .validate((propertyName, propertyValue) => {
            let value = <string> propertyValue;

            if (value.length < min) {
                return `Length of ${value.length} is too short, expected ${min} - ${max}`;
            }

            if (value.length > max) {
                return `Length of ${value.length} is too long, expected ${min} - ${max}`;
            }
        })
        .create();
}