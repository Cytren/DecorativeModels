
import {ModelProcessor} from "./model-processor";
import {PropertyProcessor, Validator} from "./property-processor";

export class Manager {
    readonly modelProcessors = new Map<string, ModelProcessor>();

    register(model: Object, decoratorName: string, propertyName: string,
             validate: Validator, priority: number = 10) {
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

export let manager = new Manager();