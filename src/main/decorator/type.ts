
import {manager} from "../manager/manager";
import {ValidateError} from "../manager/validate";
import {read, EntityType, PrimitiveType, CollectionType, ArrayType, SetType, MapType} from "../io/type-reader";

export function type(type: string): PropertyDecorator {
    return manager
        .register("type")
        .priority(0)
        .validate((propertyName, propertyValue, modelName) =>
            run(read(type), propertyName, propertyValue, modelName))
        .create();
}

function run(type: EntityType, propertyName: string, propertyValue: any, modelName: string) {

    if (typeof type == "number") { // PrimitiveType
        let primitiveType = <number> type;

        switch (primitiveType) {
            case PrimitiveType.Any:
                return;

            case PrimitiveType.String:
                return validate("string", "String", propertyValue);

            case PrimitiveType.Float:
                return validate("number", "Float", propertyValue);

            case PrimitiveType.Boolean:
                return validate("boolean", "Boolean", propertyValue);

            case PrimitiveType.Integer:
                let integerResult = validate("number", "Integer", propertyValue);
                if (integerResult) { return integerResult; }

                let integerValue = <number> propertyValue;
                if (!Number.isInteger(integerValue)) { return error("Integer"); }
                return;

            case PrimitiveType.Character:
                let characterResult = validate("string", "Character", propertyValue);
                if (characterResult) { return characterResult; }

                let stringValue = <string> propertyValue;
                if (stringValue.length != 1) { return error("Character"); }
                return;
        }

    } else if (typeof type == "string") { // ModelType
        return validateModel(<string> type, propertyName, propertyValue, modelName);

    } else { // CollectionType
        return validateCollection(<CollectionType> type, propertyName, propertyValue, modelName);
    }
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

function validateCollection(type: CollectionType, propertyName: string, propertyValue: any, modelName: string) {

    if (type instanceof ArrayType) {
        return validateArray(<ArrayType> type, propertyName, propertyValue, modelName);
    } else if (type instanceof SetType) {
        return validateSet(<SetType> type, propertyName, propertyValue, modelName);
    } else if (type instanceof MapType) {
        return validateMap(<MapType> type, propertyName, propertyValue, modelName);
    }

    return Error("Invalid collection type");
}

function validateArray(type: ArrayType, propertyName: string, propertyValue: any, modelName: string) {
    if (!Array.isArray(propertyValue)) { return error("Array"); }

    for (let value of propertyValue) {
        let result = run(type.valueType, propertyName, value, modelName);
        if (result) { return result; }
    }
}

function validateSet(type: SetType, propertyName: string, propertyValue: any, modelName: string) {
    if (!(propertyValue instanceof Set)) { return error("Set"); }

    for (let value of Array.from(propertyValue.values())) {
        let result = run(type.valueType, propertyName, value, modelName);
        if (result) { return result; }
    }
}

function validateMap(type: MapType, propertyName: string, propertyValue: any, modelName: string) {
    if (!(propertyValue instanceof Map)) { return error("Map"); }

    for (let value of Array.from(propertyValue.entries())) {
        let keyResult = run(type.keyType, propertyName, value[0], modelName);
        if (keyResult) { return keyResult; }

        let valueResult = run(type.valueType, propertyName, value[1], modelName);
        if (valueResult) { return valueResult; }
    }
}