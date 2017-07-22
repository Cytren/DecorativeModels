
import {PropertyType} from "../model/property-type";
import {manager} from "../manager/manager";

export default function (type: PropertyType | string): PropertyDecorator {
    return (model, propertyName) => {
        manager.register(model, "type", propertyName.toString(), (name, value) => {
            console.log(`@type(${type}) ${model.constructor.name}.${propertyName}`);
            return false;
        });
    };
}