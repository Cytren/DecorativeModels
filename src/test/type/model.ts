
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function() {
    describe("Model with a model property", () => {
        class ParentModel {
            @type("ChildModel") property: any;
        }

        class ChildModel {
            @type("any") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new ParentModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new ParentModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an integer property", () => {
            let model = new ParentModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an float property", () => {
            let model = new ParentModel();
            model.property = 123.45;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new ParentModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new ParentModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an set property", () => {
            let model = new ParentModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new ParentModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an empty object property", () => {
            let model = new ParentModel();
            model.property = {};

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an invalid object property", () => {
            let model = new ParentModel();
            model.property = {
                wrongName: 123
            };

            assert.equal(validate(model), false);
        });

        it("should validate with a conforming object property", () => {
            let model = new ParentModel();
            model.property = {
                property: 123
            };

            assert.equal(validate(model), true);
        });
    });
}