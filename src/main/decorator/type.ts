
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";

export function type(type: string): PropertyDecorator {
    return manager
        .register("type")
        .priority(0)
        .validate((propertyName, propertyValue, modelName) =>
            run(type, propertyName, propertyValue, modelName))
        .create();
}

function run(type: string, propertyName: string, propertyValue: any, modelName: string) {
    switch (type) {
        case "any":
            return;

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
            if (type.startsWith("[") && type.endsWith("]")) {
                return validateArray(type, propertyName, propertyValue, modelName);
            } else if (type.startsWith("<") && type.endsWith(">")) {
                return validateSet(type, propertyName, propertyValue, modelName);
            }

            return validateModel(type, propertyName, propertyValue, modelName);
    }
}

function error(type: string) {
    return `The property is the wrong type, expected ${type}`;
}

function validate(type: string, typeName: string, propertyValue: any) {
    return !(typeof propertyValue == type) ? error(typeName) : null;
}

function validateArray(type: string, propertyName: string, propertyValue: any, modelName: string) {
    if (!Array.isArray(propertyValue)) { return error(type); }
    let subType = type.substring(1, type.length - 1);

    for (let value of propertyValue) {
        let result = run(subType, propertyName, value, modelName);
        if (result) { return result; }
    }

    return;
}

function validateSet(type: string, propertyName: string, propertyValue: any, modelName: string) {
    if (!(propertyValue instanceof Set)) { return error(type); }
    let subType = type.substring(1, type.length - 1);

    for (let value of Array.from(propertyValue.values())) {
        let result = run(subType, propertyName, value, modelName);
        if (result) { return result; }
    }

    return;
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