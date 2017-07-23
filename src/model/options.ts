
export enum ProcessMode {
    Strict, // only typed properties on the models are allowed
    Ignore  // untyped properties on models will be ignored
}

export interface ModelOptions {
    processMode?: ProcessMode;
}