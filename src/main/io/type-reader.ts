
export enum PrimitiveType {
    Any, String, Float, Boolean, Integer, Character
}

export type ModelType = string;
export type EntityType = PrimitiveType | ModelType | CollectionType;

export interface CollectionType {}

export class ArrayType implements CollectionType {
    constructor (public valueType: EntityType) {}
}

export class SetType implements CollectionType {
    constructor (public valueType: EntityType) {}
}

export class MapType implements CollectionType {
    constructor (public keyType: EntityType, public valueType: EntityType) {}
}

export function read(type: string): EntityType {
    return readType(0, type)[1];
}

function assertString(index: number, length: number, input: string, expected: string) {
    let actual = input.substring(index, index + length);

    if (actual != expected) {
        throw new Error(`Found ${actual}, expected ${expected}`);
    }
}

function assertCharacter(index: number, input: string, expected: string) {
    assertString(index, 1, input, expected);
}

function readType(index: number, input: string): [number, EntityType] {
    let character = input[index];

    if (character == "[") {
        return readArray(index, input);
    } else if (character == "<") {
        return readSet(index, input);
    } else if (character == "(") {
        return readMap(index, input);
    }

    let readType = "";
    for (let i = index; i < input.length; i++) {
        let character = input[i];

        if (character.isAlphanumeric()) {
            readType += character;
        } else {
            break;
        }
    }

    let type: EntityType = readType;

    switch (readType) {
        case "any": type = PrimitiveType.Any; break;
        case "string": type = PrimitiveType.String; break;
        case "float": type = PrimitiveType.Float; break;
        case "boolean": type = PrimitiveType.Boolean; break;
        case "integer": type = PrimitiveType.Integer; break;
        case "character": type = PrimitiveType.Character; break;
    }

    return [index + readType.length, type];
}

function readArray(index: number, input: string): [number, ArrayType] {
    assertCharacter(index, input, "[");
    index++;

    let valueResult = readType(index, input);
    index = valueResult[0];

    assertCharacter(index, input, "]");
    index++;

    return [index, new ArrayType(valueResult[1])];
}

function readSet(index: number, input: string): [number, SetType] {
    assertCharacter(index, input, "<");
    index++;

    let valueResult = readType(index, input);
    index = valueResult[0];

    assertCharacter(index, input, ">");
    index++;

    return [index, new SetType(valueResult[1])];
}

function readMap(index: number, input: string): [number, MapType] {
    assertCharacter(index, input, "(");
    index++;

    let keyResult = readType(index, input);
    index = keyResult[0];

    assertString(index, 4, input, " -> ");
    index += 4;

    let valueResult = readType(index, input);
    index = valueResult[0];

    assertCharacter(index, input, ")");
    index++;

    return [index, new MapType(keyResult[1], valueResult[1])];
}