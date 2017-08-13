
import testModel from "./model/model";
import testType from "./decorator/type";
import testLength from "./decorator/length";
import testRange from "./decorator/range";
import testNullable from "./decorator/nullable";
import testRequired from "./decorator/required";
import testMatch from "./decorator/match";

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

describe("[Match Decorator]", () => {
    testMatch();
});