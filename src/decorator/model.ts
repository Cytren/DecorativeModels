
import {ModelOptions} from "../model/options";
import {manager} from "../manager/manager";

export function model(options: ModelOptions): ClassDecorator {
    return model => {
        manager.setOptions(model.name, options)
    };
}