
import {PropertyProcessor} from "./property-processor";
import {ModelOptions} from "../model/options";
import {ValidateError} from "./validate";
import {ModelProcessError} from "../model/process-error";

export class ModelProcessor {
    private propertyProcessors = new Map<string, PropertyProcessor>();
    private decoratedProperties = new Set<string>();
    private modelOptions?: ModelOptions;

    constructor(readonly modelName: string) {}

    private static getKey(decoratorName: string, propertyName: string): string {
        return `${decoratorName}-${propertyName}`;
    }

    hasDecorator(propertyName: string, decoratorName?: string): boolean {
        if (!decoratorName) {
            return this.decoratedProperties.has(propertyName);
        }

        return this.propertyProcessors.get(ModelProcessor.getKey(decoratorName, propertyName)) != null;
    }

    register(decoratorName: string, propertyName: string, processor: PropertyProcessor) {
        if ((decoratorName === "nullable" && this.hasDecorator(propertyName, "required")) ||
            (decoratorName === "required" && this.hasDecorator(propertyName, "nullable"))) {
            throw new Error(`The property on ${this.modelName}.${propertyName} cannot be nullable and required.`);
        }

        let key = ModelProcessor.getKey(decoratorName, propertyName);

        if (this.propertyProcessors.has(key)) {
            throw new Error(`The decorator ${decoratorName} is already defined on ${this.modelName}.${propertyName}`);
        }

        this.propertyProcessors.set(key, processor);
        this.decoratedProperties.add(propertyName);
    }

    validate(model: Object, globalOptions: ModelOptions): ValidateError {
        let options: ModelOptions;

        if (this.modelOptions != null) {
            options = this.modelOptions;
        } else {
            options = globalOptions;
        }

        if (!options.allowUndecorated) {
            for (let property in model) {
                if (!this.hasDecorator(property)) {
                    return {
                        modelName: this.modelName,
                        propertyName: property,
                        errorMessage: "Undecorated properties not allowed"
                    };
                }
            }
        }

        for (let property of Array.from(this.decoratedProperties)) {
            if (model[property] == null) {
                if (options.strictMode == undefined || options.strictMode) {
                    if (!this.hasDecorator(property, "nullable")) {
                        return {
                            modelName: this.modelName,
                            propertyName: property,
                            errorMessage: "Property was not defined"
                        };
                    }
                } else {
                    if (this.hasDecorator(property, "required")) {
                        return {
                            modelName: this.modelName,
                            propertyName: property,
                            errorMessage: "Property was not defined"
                        };
                    }
                }
            }
        }

        let orderedProperties = Array.from(this.propertyProcessors.values());
        orderedProperties.sort((a, b) => a.priority - b.priority);

        for (let propertyProcessor of orderedProperties) {
            let propertyName = propertyProcessor.propertyName;

            try {
                propertyProcessor.validate(propertyName, model[propertyName]);
            } catch (e) {
                if (e instanceof ModelProcessError) {
                    return {
                        modelName: this.modelName,
                        propertyName,
                        errorMessage: e.message
                    };
                }

                throw e;
            }
        }

        return null;
    }

    setOptions(options: ModelOptions) {
        this.modelOptions = options;
    }
}