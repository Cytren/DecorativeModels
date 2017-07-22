
import {register} from "../manager/manager";

export default function (min: number, max: number): PropertyDecorator {
    return (model, propertyName) => {
        register(model, "length", propertyName.toString(), (name, value) => {
            console.log(`@length(${min}, ${max}) ${model.constructor.name}.${propertyName}`);
            return false;
        });
    };
}