
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
                    validate("string", "String", propertyValue);
                    break;

                case "float" || "number":
                    validate("number", "Float", propertyValue);
                    break;

                case "integer":
                    validate("number", "Integer", propertyValue);
                    let value = <number> propertyValue;

                    if (!Number.isInteger(value)) { error("Integer"); }
                    break;

                case "boolean":
                    validate("boolean", "Boolean", propertyValue);
                    break;

                default:
                    throw new Error(`The type ${typeString} was not found`);
            }
        })
        .create();
}

function validate(type: string, typeName: string, propertyValue: any) {
    if (!(typeof propertyValue == type)) { error(typeName); }
}

function error(type: string) {
    throw new Error(`The property is the wrong type, expected ${type}`);
}