
import {PropertyType} from "../model/property-type";

export default function (type: PropertyType | string): PropertyDecorator {
    return (target: Object, name: string) => {
        console.log(`${name} - ${type}`);
    };
}