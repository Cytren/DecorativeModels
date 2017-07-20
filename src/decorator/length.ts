
import {register} from "../processor/registry";

export default function (min: number, max: number): PropertyDecorator {
    return (target, propertyName) => {
        register("length", (name, value) => {
            return false;
        });
    };
}