
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function() {
    describe("Model with a any property", () => {
        class AnyModel {
            @type("any") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new AnyModel();
            assert.equal(validate(model), false);
        });

        it("should validate with a string property", () => {
            let model = new AnyModel();
            model.property = "STRING";

            assert.equal(validate(model), true);
        });

        it("should validate with an integer property", () => {
            let model = new AnyModel();
            model.property = 123;

            assert.equal(validate(model), true);
        });

        it("should validate with an float property", () => {
            let model = new AnyModel();
            model.property = 123.45;

            assert.equal(validate(model), true);
        });

        it("should validate with an boolean property", () => {
            let model = new AnyModel();
            model.property = true;

            assert.equal(validate(model), true);
        });

        it("should validate with an array property", () => {
            let model = new AnyModel();
            model.property = [];

            assert.equal(validate(model), true);
        });

        it("should validate with an set property", () => {
            let model = new AnyModel();
            model.property = new Set();

            assert.equal(validate(model), true);
        });

        it("should validate with an map property", () => {
            let model = new AnyModel();
            model.property = new Map();

            assert.equal(validate(model), true);
        });

        it("should validate with an object property", () => {
            let model = new AnyModel();
            model.property = {};

            assert.equal(validate(model), true);
        });
    });
}