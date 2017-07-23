
import {ModelProcessor} from "./model-processor";
import {PropertyProcessor, ValidateFunction} from "./property-processor";
import {DecoratorBuilder} from "./decorator-builder";

export class Manager {
    readonly modelProcessors = new Map<string, ModelProcessor>();

    register(decoratorName: string): DecoratorBuilder {
        return new DecoratorBuilder(decoratorName, this.modelProcessors);
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