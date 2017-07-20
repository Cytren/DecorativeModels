
import Processor from "./processor";

let processors = new Map<string, Processor[]>();

export function register(name: string, processor: Processor) {
    let processors = this.processors.get(name);

    if (processors == null) {
        processors = [];
        this.processors.set(name, processors);
    }

    processors.forEach((other) => {
        if (other.name == processor.name) {
            throw new Error(`The decorator ${processor.name} is already defined on ${name}`);
        }
    });

    processors.concat(processor);
}