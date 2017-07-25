
import {manager} from "../manager/manager";
import {ModelProcessError} from "../error/model-process-error";

export function length(min: number, max: number): PropertyDecorator {
    return manager
        .register("length")
        .validate((propertyName, propertyValue) => {
            let value = <string> propertyValue;

            if (value.length < min) {
                throw new ModelProcessError(`Length of ${value.length} is too short, expected ${min} - ${max}`);
            }

            if (value.length > max) {
                throw new ModelProcessError(`Length of ${value.length} is too long, expected ${min} - ${max}`);
            }
        })
        .create();
}