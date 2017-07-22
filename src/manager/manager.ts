
import Validator from "./validator";
import ModelProcessor from "./model-processor";
import PropertyProcessor from "./property-processor";

export class Manager {
    readonly modelProcessors = new Map<string, ModelProcessor>();

    register(model: Object, decoratorName: string, propertyName: string, validate: Validator, priority: number) {
        let modelName = model.constructor.name;
        let modelProcessor = this.modelProcessors.get(modelName);

        if (!modelProcessor) {
            modelProcessor = new ModelProcessor(modelName);
            this.modelProcessors.set(modelName, modelProcessor);
        }

        let propertyProcessor: PropertyProcessor = { decoratorName, propertyName, priority, validate };
        modelProcessor.register(decoratorName, propertyName, propertyProcessor);
    }

    validate(model: Object): boolean {
        let modelName = model.constructor.name;
        let modelProcessor = this.modelProcessors.get(model.constructor.name);

        if (!modelProcessor) {
            throw new Error(`The model ${modelName} does not exist`);
        }

        return modelProcessor.validate(model);
    }
}

let registry = new Manager();

export function register(model: Object, decoratorName: string, propertyName: string,
                         validate: Validator, priority: number = 10) {
    registry.register(model, decoratorName, propertyName, validate, priority);
}

export function validate(model: Object): boolean {
    return registry.validate(model);
}