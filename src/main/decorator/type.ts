
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";

export function type(type: string): PropertyDecorator {
    return manager
        .register("type")
        .priority(0)
        .validate((propertyName, propertyValue, modelName) => {
            switch (type) {
                case "string":
                    return validate("string", "String", propertyValue);

                case "float" || "number":
                    return validate("number", "Float", propertyValue);

                case "integer":
                    let result = validate("number", "Integer", propertyValue);
                    if (result) { return result; }

                    let value = <number> propertyValue;
                    if (!Number.isInteger(value)) { return error("Integer"); }
                    break;

                case "boolean":
                    return validate("boolean", "Boolean", propertyValue);

                default:
                    return validateModel(type, propertyName, propertyValue, modelName);
            }
        })
        .create();
}

function error(type: string) {
    return `The property is the wrong type, expected ${type}`;
}

function validate(type: string, typeName: string, propertyValue: any) {
    return !(typeof propertyValue == type) ? error(typeName) : null;
}

function validateModel(type: string, propertyName: string, propertyValue: any, modelName: string) {
    let error: ValidateError = manager.validate(propertyValue, type);
    if (!error) { return; }

    if (typeof error == "string") {
        return new ValidateError(modelName, propertyName, `${propertyName}.${error}`);
    } else {
        error.modelName = modelName;
        error.propertyName = `${propertyName}.${error.propertyName}`;

        return error;
    }
}