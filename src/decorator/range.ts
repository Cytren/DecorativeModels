
import {manager} from "../manager/manager";

export function range(min: number, max: number): PropertyDecorator {
    return manager
        .register("range")
        .validate((propertyName, propertyValue) => {
            let value = <number> propertyValue;

            if (value < min) {
                return `The value of ${propertyValue} is too small, expected ${min} - ${max}`;
            }

            if (value > max) {
                return `The value of ${propertyValue} is too large, expected ${min} - ${max}`;
            }
        })
        .create();
}