
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string property", () => {
        class StringModel {
            @type("string") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringModel();
            assert.equal(validate(model), false);
        });

        it("should validate with a string property", () => {
            let model = new StringModel();
            model.property = "STRING";

            assert.equal(validate(model), true);
        });

        it("should validate with a character property", () => {
            let model = new StringModel();
            model.property = "S";

            assert.equal(validate(model), true);
        });

        it("should NOT validate with an integer property", () => {
            let model = new StringModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a number property", () => {
            let model = new StringModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new StringModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an set property", () => {
            let model = new StringModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new StringModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new StringModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}