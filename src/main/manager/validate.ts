
export class ValidateError {
    constructor(public modelName: string,
                public propertyName: string,
                readonly errorMessage: string) {}
}

export type ValidateFunction = (propertyName: string, propertyValue: any, modelName: string) => void | string | ValidateError;
