
import {PropertyType} from "../model/property-type";
import {register} from "../manager/manager";

export default function (type: PropertyType | string): PropertyDecorator {
    return (model, propertyName) => {
        register(model, "type", propertyName.toString(), (name, value) => {
            console.log(`@type(${type}) ${model.constructor.name}.${propertyName}`);
            return false;
        });
    };
}