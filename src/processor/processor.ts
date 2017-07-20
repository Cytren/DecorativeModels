
import Model from "../model/model";

type Processor = (name: string, value: any, model: Model) => boolean;

export default Processor;