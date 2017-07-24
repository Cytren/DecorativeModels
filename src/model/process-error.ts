
export class ModelProcessError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ModelProcessError.prototype);
    }
}