
import Model from "../model/model";

interface Processor {
    name: string;
    priority: number;
    process(model: Model, name: string, value: any): boolean;
}

export default Processor;