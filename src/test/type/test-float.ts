
import {assert} from "chai";
import {validate, type} from "../../main/index";

describe("Model with a float property", () => {
    class FloatModel {
        @type("float") property: any;
    }

    it("should NOT validate with an undefined property", () => {
        let model = new FloatModel();
        assert.equal(validate(model), false);
    });

    it("should NOT validate with a string property", () => {
        let model = new FloatModel();
        model.property = "STRING";

        assert.equal(validate(model), false);
    });

    it("should NOT validate with an integer property", () => {
        let model = new FloatModel();
        model.property = 123;

        assert.equal(validate(model), true);
    });

    it("should validate with an float property", () => {
        let model = new FloatModel();
        model.property = 123.45;

        assert.equal(validate(model), true);
    });

    it("should NOT validate with an boolean property", () => {
        let model = new FloatModel();
        model.property = true;

        assert.equal(validate(model), false);
    });

    it("should NOT validate with an array property", () => {
        let model = new FloatModel();
        model.property = [];

        assert.equal(validate(model), false);
    });

    it("should NOT validate with an set property", () => {
        let model = new FloatModel();
        model.property = new Set();

        assert.equal(validate(model), false);
    });

    it("should NOT validate with an map property", () => {
        let model = new FloatModel();
        model.property = new Map();

        assert.equal(validate(model), false);
    });

    it("should NOT validate with an object property", () => {
        let model = new FloatModel();
        model.property = {};

        assert.equal(validate(model), false);
    });
});