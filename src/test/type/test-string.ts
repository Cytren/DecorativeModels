
import {assert} from "chai";
import {validate, type} from "../../main/index";

describe("Model with a string property", () => {
    class StringModel {
        @type("string") stringProperty: any;
    }

    it("should validate with a string property", () => {
        let model = new StringModel();
        model.stringProperty = "STRING";

        assert.equal(validate(model), true);
    });

    it("should NOT validate with an undefined property", () => {
        let model = new StringModel();
        assert.equal(validate(model), false);
    });

    it("should NOT validate with an number property", () => {
        let model = {
            stringProperty: 123
        };

        assert.equal(validate(model, "StringModel"), false);
    });

    it("should NOT validate with an boolean property", () => {
        let model = {
            stringProperty: true
        };

        assert.equal(validate(model, "StringModel"), false);
    });

    it("should NOT validate with an array property", () => {
        let model = {
            stringProperty: []
        };

        assert.equal(validate(model, "StringModel"), false);
    });

    it("should NOT validate with an set property", () => {
        let model = {
            stringProperty: new Set()
        };

        assert.equal(validate(model, "StringModel"), false);
    });

    it("should NOT validate with an map property", () => {
        let model = {
            stringProperty: new Map()
        };

        assert.equal(validate(model, "StringModel"), false);
    });

    it("should NOT validate with an object property", () => {
        let model = {
            stringProperty: {}
        };

        assert.equal(validate(model, "StringModel"), false);
    });
});