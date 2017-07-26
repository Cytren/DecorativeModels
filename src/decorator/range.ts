
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";

export function range(min: number, max: number): PropertyDecorator {
    return manager
        .register("range")
        .validate((propertyName, propertyValue, modelName) => {
            let value = <number> propertyValue;

            if (value < min) {
                return new ValidateError(modelName, propertyName,
                    `The value of ${propertyValue} is too small, expected ${min} - ${max}`);
            }

            if (value > max) {
                return new ValidateError(modelName, propertyName,
                    `The value of ${propertyValue} is too large, expected ${min} - ${max}`);
            }
        })
        .create();
}