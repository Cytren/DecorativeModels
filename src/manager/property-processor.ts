
import Validator from "./validator";

interface PropertyProcessor {
    decoratorName: string;
    propertyName: string;
    priority: number;
    validate: Validator;
}

export default PropertyProcessor;