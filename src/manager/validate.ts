
export class ValidateError {
    constructor(public modelName: string,
                public propertyName: string,
                readonly errorMessage: string) {}
}

export type ValidateResult = (error?: ValidateError) => void;
export type ValidateFunction = (propertyName: string, propertyValue: any, modelName: string) => void | ValidateError;