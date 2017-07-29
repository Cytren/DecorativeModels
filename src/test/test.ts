
import testModel from "./model/test-model";
import testType from "./decorator/test-type";
import testLength from "./decorator/test-length";
import testRange from "./decorator/test-range";
import testNullable from "./decorator/test-nullable";
import testRequired from "./decorator/test-required";

describe("[Model]", () => {
    testModel();
});

describe("[Type Decorator]", () => {
    testType();
});

describe("[Length Decorator]", () => {
    testLength();
});

describe("[Range Decorator]", () => {
    testRange();
});

describe("[Nullable Decorator]", () => {
    testNullable();
});

describe("[Required Decorator]", () => {
    testRequired();
});