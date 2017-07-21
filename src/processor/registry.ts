
import Model from "../model/model";
import Processor from "./processor";
import ModelProcessor from "./model-processor";
import PropertyProcessor from "./property-processor";

export class Registry {
    readonly modelProcessors = new Map<string, ModelProcessor>();

    register(model: Model, decoratorName: string, propertyName: string, process: Processor, priority: number) {
        let modelName = model.constructor.name;
        let modelProcessor = this.modelProcessors.get(modelName);

        if (!modelProcessor) {
            modelProcessor = new ModelProcessor(modelName);
            this.modelProcessors.set(modelName, modelProcessor);
        }

        let propertyProcessor: PropertyProcessor = { decoratorName, propertyName, priority, process };
        modelProcessor.register(decoratorName, propertyName, propertyProcessor);
    }

    process(model: Model) {
        let modelName = model.constructor.name;
        let modelProcessor = this.modelProcessors.get(model.constructor.name);

        if (!modelProcessor) {
            throw new Error(`The model ${modelName} does not exist`);
        }

        modelProcessor.process(model);
    }
}

let registry = new Registry();

export function register(model: Model, decoratorName: string, propertyName: string,
                         process: Processor, priority: number = 10) {
    registry.register(model, decoratorName, propertyName, process, priority);
}

export function process(model: Model) {
    registry.process(model);
}