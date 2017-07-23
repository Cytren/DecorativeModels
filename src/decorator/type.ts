
import {PropertyType} from "../model/property-type";
import {manager} from "../manager/manager";

export function type(type: PropertyType | string): PropertyDecorator {
    return manager
        .register("type")
        .priority(0)
        .validate((propertyName, propertyValue) => {
            let typeString: string;

            if (typeof type == "number") {
                typeString = PropertyType[type].toLowerCase();
            } else {
                typeString = type;
            }

            switch (typeString) {
                case "string":
                    validate("string", "String", propertyName, propertyValue);
                    break;

                case "float" || "number":
                    validate("number", "Float", propertyName, propertyValue);
                    break;

                case "integer":
                    validate("number", "Integer", propertyName, propertyValue);
                    let value = <number> propertyValue;

                    if (!Number.isInteger(value)) { error(propertyName, "Integer"); }
                    break;

                case "boolean":
                    validate("boolean", "Boolean", propertyName, propertyValue);
                    break;

                default:
                    throw new Error(`The type ${typeString} was not found.`);
            }

            return true;
        })
        .create();
}

function validate(type: string, typeName: string, propertyName: string, propertyValue: any) {
    if (!(typeof propertyValue == type)) { error(propertyName, typeName); }
}

function error(propertyName: string, type: string) {
    throw new Error(`The property ${propertyName} was not type ${type}`);
}