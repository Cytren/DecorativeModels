
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function() {
    describe("Model with a boolean property", () => {
        class BooleanModel {
            @type("boolean") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new BooleanModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new BooleanModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a number property", () => {
            let model = new BooleanModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should validate with an boolean property", () => {
            let model = new BooleanModel();
            model.property = true;

            assert.equal(validate(model), true);
        });

        it("should NOT validate with an array property", () => {
            let model = new BooleanModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an set property", () => {
            let model = new BooleanModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new BooleanModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new BooleanModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}