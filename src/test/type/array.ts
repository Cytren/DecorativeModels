
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string array property", () => {
        class StringArrayModel {
            @type("[string]") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringArrayModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new StringArrayModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an integer property", () => {
            let model = new StringArrayModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an float property", () => {
            let model = new StringArrayModel();
            model.property = 123.45;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new StringArrayModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should validate with a empty array property", () => {
            let model = new StringArrayModel();
            model.property = [];

            assert.equal(validate(model), true);
        });

        it("should validate with a string array property", () => {
            let model = new StringArrayModel();
            model.property = ["STRING", "STRING"];

            assert.equal(validate(model), true);
        });

        it("should NOT validate with a boolean array property", () => {
            let model = new StringArrayModel();
            model.property = [true, false];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with a mixed string / boolean array property", () => {
            let model = new StringArrayModel();
            model.property = ["STRING", true];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an set property", () => {
            let model = new StringArrayModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new StringArrayModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new StringArrayModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}