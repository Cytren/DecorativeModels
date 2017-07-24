
import {manager} from "../manager/manager";
import {ModelProcessError} from "../model/process-error";

export function range(min: number, max: number): PropertyDecorator {
    return manager
        .register("range")
        .validate((propertyName, propertyValue) => {
            let value = <number> propertyValue;

            if (value < min) {
                throw new ModelProcessError(`The value of ${propertyValue} is too small, expected ${min} - ${max}`);
            }

            if (value > max) {
                throw new ModelProcessError(`The value of ${propertyValue} is too large, expected ${min} - ${max}`);
            }
        })
        .create();
}