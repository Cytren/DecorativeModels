
export interface ValidateError {
    modelName: string;
    propertyName: string;
    errorMessage: string;
}

export type ValidateResult = (error?: ValidateError) => void;
export type ValidateFunction = (propertyName: string, propertyValue: any) => void;