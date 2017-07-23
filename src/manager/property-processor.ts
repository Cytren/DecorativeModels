
export type ValidateFunction = (propertyName: string, propertyValue: any) => boolean;

export interface PropertyProcessor {
    decoratorName: string;
    propertyName: string;
    priority: number;
    validate: ValidateFunction;
}