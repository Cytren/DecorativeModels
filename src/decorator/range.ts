
import {manager} from "../manager/manager";

export function range(min: number, max: number): PropertyDecorator {
    return manager
        .register("range")
        .validate((propertyName, propertyValue) => {
            let value = <number> propertyValue;

            if (value < min) {
                throw new Error(`The property ${propertyName} must be no smaller than ${min}`);
            }

            if (value > max) {
                throw new Error(`The property ${propertyName} must be no larger than ${max}`);
            }
        })
        .create();
}