
import {PropertyProcessor, ValidateFunction} from "./property-processor";
import {ModelProcessor} from "./model-processor";

export type ValidateWrapper = (propertyName: string, propertyValue: string) => boolean;

export class DecoratorBuilder {
    private priorityValue = 10;
    private validateValue: ValidateFunction;

    constructor(readonly decoratorName: string,
                readonly modelProcessors: Map<string, ModelProcessor>) {
    }

    priority(priority): DecoratorBuilder {
        this.priorityValue = priority;
        return this;
    }

    validate(validate: ValidateWrapper): DecoratorBuilder {
        this.validateValue = validate;
        return this;
    }

    create(): PropertyDecorator {
        return (model, propertyName) => {
            let modelName = model.constructor.name;
            let decoratorName = this.decoratorName;
            let priority = this.priorityValue;
            let validate = this.validateValue;

            let modelProcessor = this.modelProcessors.get(modelName);

            if (!modelProcessor) {
                modelProcessor = new ModelProcessor(modelName);
                this.modelProcessors.set(modelName, modelProcessor);
            }

            let propertyProcessor: PropertyProcessor = {
                decoratorName,
                propertyName: propertyName.toString(),
                priority,
                validate
            };

            modelProcessor.register(decoratorName, propertyName.toString(), propertyProcessor);
        }
    }
}