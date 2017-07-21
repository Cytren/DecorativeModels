
import Model from "../model/model";

type Processor = (propertyName: string, propertyValue: any, model: Model) => boolean;

export default Processor;