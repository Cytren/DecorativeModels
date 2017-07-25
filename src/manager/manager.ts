
import {ModelProcessor} from "./model-processor";
import {DecoratorBuilder} from "./decorator-builder";
import {ModelOptions} from "../model/options";
import {ValidateError} from "./validate";

export class Manager {
    private globalOptions: ModelOptions = {
        strictMode: true,
        allowUndecorated: false
    };

    readonly modelProcessors = new Map<string, ModelProcessor>();

    getModelProcessor(modelOrName: string | Object, createIfNull = false): ModelProcessor {
        let modelName: string;

        if (typeof modelOrName == "string") {
            modelName = <string> modelOrName;
        } else {
            modelName = (<Object> modelOrName).constructor.name;
        }

        let modelProcessor = this.modelProcessors.get(modelName);
        if (!modelProcessor) {
            if (createIfNull) {
                modelProcessor = new ModelProcessor(modelName);
            } else {
                throw new Error(`The model ${modelName} does not exist`);
            }
        }

        return modelProcessor;
    }

    register(decoratorName: string): DecoratorBuilder {
        return new DecoratorBuilder(decoratorName, this.modelProcessors);
    }

    validate(model: Object, modelName?: string): ValidateError {
        let modelProcessor = modelName ? this.getModelProcessor(modelName) :
            this.getModelProcessor(model);

        return modelProcessor.validate(model, this.globalOptions);
    }

    setOptions(modelName: string, options: ModelOptions) {
        this.getModelProcessor(modelName).setOptions(options);
    }

    setGlobalOptions(options: ModelOptions) {
        this.globalOptions = options;
    }
}

export let manager = new Manager();