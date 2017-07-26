
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";

export function length(min: number, max: number): PropertyDecorator {
    return manager
        .register("length")
        .validate((propertyName, propertyValue, modelName) => {
            let value = <string> propertyValue;

            if (value.length < min) {
                return new ValidateError(modelName, propertyName,
                    `Length of ${value.length} is too short, expected ${min} - ${max}`);
            }

            if (value.length > max) {
                return new ValidateError(modelName, propertyName,
                    `Length of ${value.length} is too long, expected ${min} - ${max}`);
            }
        })
        .create();
}