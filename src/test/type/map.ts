
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string -> integer map property", () => {
        class StringIntegerMapModel {
            @type("(string -> integer)") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringIntegerMapModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new StringIntegerMapModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a number property", () => {
            let model = new StringIntegerMapModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new StringIntegerMapModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new StringIntegerMapModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT not validate with a set property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should validate with an empty map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map();

            assert.equal(validate(model), true);
        });

        it("should validate with a string -> integer map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map([
                ["ONE", 123], ["TWO", 456]
            ]);

            assert.equal(validate(model), true);
        });

        it("should NOT validate with a boolean -> integer map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map([
                [true, 123], [false, 456]
            ]);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string -> boolean map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map([
                ["ONE", true], ["TWO", false]
            ]);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a mixed string / boolean -> integer map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map();
            model.property.set("ONE", 123);
            model.property.set(false, 456);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a mixed string -> integer / boolean map property", () => {
            let model = new StringIntegerMapModel();
            model.property = new Map();
            model.property.set("ONE", 123);
            model.property.set("TWO", true);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new StringIntegerMapModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}