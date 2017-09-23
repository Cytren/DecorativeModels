
import {ModelOptions} from "./model/options";
import {ValidateError} from "./manager/validate";

import {model} from "./model/model";
import {type} from "./decorator/type";
import {length} from "./decorator/length";
import {range} from "./decorator/range";
import {nullable} from "./decorator/nullable";
import {required} from "./decorator/required";
import {match} from "./decorator/match";
import {count} from "./decorator/count";
import {manager} from "./manager/manager";

import "./extension/string";

function options(options: ModelOptions) {
    manager.setGlobalOptions(options);
}

function validate(modelOrArray: Object | Object[], modelType?: Function): Promise<ValidateError> {
    return new Promise((resolve) => {

        let models: Object[];
        let modelName: string;

        if (Array.isArray(modelOrArray)) {
            models = modelOrArray;
        } else {
            models = [modelOrArray];
        }

        if (modelType) {
            modelName = modelType.name;
        }

        for (let model of models) {
            let error = manager.validate(model, modelName);

            if (error != null) {
                resolve(error);
                return;
            }
        }

        resolve(null);
    });
}

export {
    model, options, validate,
    type, length, range,
    nullable, required, match,
    count
}
