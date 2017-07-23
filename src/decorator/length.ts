
import {manager} from "../manager/manager";

export function length(min: number, max: number): PropertyDecorator {
    return manager
        .register("length")
        .validate((propertyName, propertyValue) => {
            let value = <string> propertyValue;

            if (value.length < min) {
                throw new Error(`The property ${propertyName} must contain at least ${min} characters`);
            }

            if (value.length > max) {
                throw new Error(`The property ${propertyName} must contain no more than ${max} characters`);
            }
        })
        .create();
}