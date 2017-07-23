
import {ModelProcessor} from "./model-processor";
import {DecoratorBuilder} from "./decorator-builder";
import {ModelOptions} from "../model/options";

export class Manager {
    readonly modelProcessors = new Map<string, ModelProcessor>();

    private getModelProcessor(model: Object): ModelProcessor {
        let modelName = model.constructor.name;
        let modelProcessor = this.modelProcessors.get(model.constructor.name);

        if (!modelProcessor) {
            throw new Error(`The model ${modelName} does not exist`);
        }

        return modelProcessor;
    }

    register(decoratorName: string): DecoratorBuilder {
        return new DecoratorBuilder(decoratorName, this.modelProcessors);
    }

    validate(model: Object): boolean {
        return this.getModelProcessor(model).validate(model);
    }

    setOptions(model: Object, options: ModelOptions) {
        this.getModelProcessor(model).setOptions(options);
    }
}

export let manager = new Manager();