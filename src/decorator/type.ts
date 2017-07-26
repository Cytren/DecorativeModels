
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";

export function type(type: string): PropertyDecorator {
    return manager
        .register("type")
        .priority(0)
        .validate((propertyName, propertyValue, modelName) => {
            let errorMessage: string;

            switch (type) {
                case "string":
                    errorMessage = validate("string", "String", propertyValue);
                    break;

                case "float" || "number":
                    errorMessage = validate("number", "Float", propertyValue);
                    break;

                case "integer":
                    errorMessage = validate("number", "Integer", propertyValue);
                    let value = <number> propertyValue;

                    if (!Number.isInteger(value)) { errorMessage = error("Integer"); }
                    break;

                case "boolean":
                    errorMessage = validate("boolean", "Boolean", propertyValue);
                    break;

                default:
                    return validateModel(type, propertyName, propertyValue, modelName);
            }

            if (errorMessage) {
                return new ValidateError(modelName, propertyName, errorMessage);
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
    let modelError: ValidateError = manager.validate(propertyValue, type);

    if (modelError) {
        modelError.modelName = modelName;
        modelError.propertyName = propertyName + "." + modelError.propertyName;

        return modelError;
    }
}