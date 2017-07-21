
import Processor from "./processor";

interface PropertyProcessor {
    decoratorName: string;
    propertyName: string;
    priority: number;
    process: Processor;
}

export default PropertyProcessor;