
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function() {
    describe("Model with a integer property", () => {
        class IntegerModel {
            @type("integer") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new IntegerModel();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a string property", () => {
            let model = new IntegerModel();
            model.property = "STRING";

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with an integer property", () => {
            let model = new IntegerModel();
            model.property = 123;

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with an float property", () => {
            let model = new IntegerModel();
            model.property = 123.45;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an boolean property", () => {
            let model = new IntegerModel();
            model.property = true;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an array property", () => {
            let model = new IntegerModel();
            model.property = [];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an set property", () => {
            let model = new IntegerModel();
            model.property = new Set();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an map property", () => {
            let model = new IntegerModel();
            model.property = new Map();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an object property", () => {
            let model = new IntegerModel();
            model.property = {};

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}