
import {PropertyType} from "../model/property-type";
import {manager} from "../manager/manager";

export function type(type: PropertyType | string): PropertyDecorator {
    return manager
        .register("type")
        .priority(5)
        .validate((propertyName, propertyValue) => {
            console.log(`@type(${type}) ${propertyName} = ${propertyValue}`);
            return true;
        })
        .create();
}