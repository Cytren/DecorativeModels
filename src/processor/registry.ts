
import Processor from "./processor";

interface Holder {
    name: string;
    priority: number;
    processor: Processor;
}

let holders = new Map<string, Holder[]>();

export function register(name: string, processor: Processor, priority: number = 10) {
    let holders = this.holders.get(name);

    if (holders == null) {
        holders = [];
        this.holders.set(name, holders);
    }

    holders.forEach((other) => {
        if (other.name == processor.name) {
            throw new Error(`The decorator ${processor.name} is already defined on ${name}`);
        }
    });

    holders.concat(processor);
}