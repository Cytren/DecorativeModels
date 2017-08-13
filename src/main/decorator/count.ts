
import {manager} from "../manager/manager";

export function count(min: number, max: number): PropertyDecorator {
    return manager
        .register("count")
        .validate((propertyName, propertyValue) => {

            if (propertyValue instanceof Set || propertyValue instanceof Map) {
                let value = <Set<any> | Map<any, any>> propertyValue;
                return validateCount(value.size, min, max);
            }

            let value = <Array<any>> propertyValue;
            return validateCount(value.length, min, max);
        })
        .create();
}

function validateCount(count: number, min: number, max: number) {
    if (count < min) {
        return `Count of ${count} is too small, expected ${min} - ${max}`;
    }

    if (count > max) {
        return `Count of ${count} is too large, expected ${min} - ${max}`;
    }
}