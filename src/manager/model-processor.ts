
import {PropertyProcessor} from "./property-processor";

export class ModelProcessor {
    private propertyProcessors = new Map<string, PropertyProcessor>();

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

    validate(model: Object): boolean {
        this.propertyProcessors.forEach((propertyProcessor) => {
            let propertyName = propertyProcessor.propertyName;
            let result = propertyProcessor.validate(propertyName, model[propertyName]);

            if (result) { return false; }
        });

        return true;
    }
}