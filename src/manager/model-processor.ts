
import {PropertyProcessor} from "./property-processor";
import {ModelOptions} from "../model/options";
import {ValidateError} from "./validate";

export class ModelProcessor {
    private propertyProcessors = new Map<string, PropertyProcessor>();
    private modelOptions?: ModelOptions;

    constructor(readonly modelName: string) {}

    private static getKey(decoratorName: string, propertyName: string): string {
        return `${decoratorName}-${propertyName}`;
    }

    register(decoratorName: string, propertyName: string, processor: PropertyProcessor) {
        let key = ModelProcessor.getKey(decoratorName, propertyName);

        if (this.propertyProcessors.has(key)) {
            throw new Error(`The decorator ${decoratorName} is already defined on ${this.modelName}.${propertyName}`);
        }

        this.propertyProcessors.set(key, processor);
    }

    validate(model: Object): ValidateError {

        for (let propertyProcessor of Array.from(this.propertyProcessors.values())) {
            let propertyName = propertyProcessor.propertyName;

            try {
                propertyProcessor.validate(propertyName, model[propertyName]);
            } catch (e) {
                return {
                    modelName: this.modelName,
                    propertyName,
                    errorMessage: e.message
                };
            }
        }

        return null;
    }

    setOptions(options: ModelOptions) {
        this.modelOptions = options;
    }
}