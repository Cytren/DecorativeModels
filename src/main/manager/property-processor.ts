
import {ValidateFunction} from "./validate";

export interface PropertyProcessor {
    decoratorName: string;
    propertyName: string;
    priority: number;
    validate: ValidateFunction;
}