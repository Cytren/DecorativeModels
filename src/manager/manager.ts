
import {ModelProcessor} from "./model-processor";
import {DecoratorBuilder} from "./decorator-builder";
import {ModelOptions} from "../model/options";

export class Manager {
    readonly modelProcessors = new Map<string, ModelProcessor>();
    private globalOptions: ModelOptions = {};

    private getModelProcessor(modelOrName: string | Object): ModelProcessor {
        let modelName: string;

        if (typeof modelOrName == "string") {
            modelName = <string> modelOrName;
        } else {
            modelName = (<Object> modelOrName).constructor.name;
        }

        let modelProcessor = this.modelProcessors.get(modelName);
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

    setOptions(modelName: string, options: ModelOptions) {
        this.getModelProcessor(modelName).setOptions(options);
    }

    setGlobalOptions(options: ModelOptions) {
        this.globalOptions = options;
    }
}

export let manager = new Manager();