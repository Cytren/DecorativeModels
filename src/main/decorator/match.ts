
import {manager} from "../manager/manager";

export function match(pattern: RegExp): PropertyDecorator;
export function match(...strings: string[]): PropertyDecorator;

export function match(... args: any[]): PropertyDecorator {
    return manager
        .register("length")
        .validate((propertyName, propertyValue) => {

            if (args.length == 1 && args[0] instanceof RegExp) {
                return matchPattern(propertyValue, <RegExp> args[0]);
            }

            return matchStrings(propertyValue, <string[]> args);
        })
        .create();
}

function matchPattern(propertyValue: any, pattern: RegExp): string {
    let completePattern = new RegExp(`^${pattern.source}$`);

    if (!completePattern.test(propertyValue)) {
        return `Does not match pattern ${pattern}`;
    }
}

function matchStrings(propertyValue: any, strings: string[]): string {
    for (let value of strings) {
        if (value == propertyValue) {
            return;
        }
    }

    return `Does not match any of the patterns`;
}