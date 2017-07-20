
import {PropertyType} from "../model/property-type";
import {register} from "../processor/registry";

export default function (type: PropertyType | string): PropertyDecorator {
    return (target, propertyName) => {
        register("type", (name, value) => {
            return false;
        });
    };
}