
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string set property", () => {
        class StringSetModel {
            @type("<string>") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringSetModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new StringSetModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a number property", () => {
            let model = new StringSetModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new StringSetModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new StringSetModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should validate with an empty set property", () => {
            let model = new StringSetModel();
            model.property = new Set();

            assert.equal(validate(model), true);
        });

        it("should validate with a string set property", () => {
            let model = new StringSetModel();
            model.property = new Set(["STRING", "STRING"]);

            assert.equal(validate(model), true);
        });

        it("should NOT validate with a boolean set property", () => {
            let model = new StringSetModel();
            model.property = new Set([true, false]);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a mixed string / boolean set property", () => {
            let model = new StringSetModel();
            model.property = new Set(["STRING", true]);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new StringSetModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new StringSetModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}