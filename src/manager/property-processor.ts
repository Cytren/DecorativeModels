
export type Validator = (propertyName: string, propertyValue: any, model: Object) => boolean;

export interface PropertyProcessor {
    decoratorName: string;
    propertyName: string;
    priority: number;
    validate: Validator;
}