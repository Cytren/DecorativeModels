
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string set property", () => {
        class StringSetModel {
            @type("<string>") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringSetModel();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a string property", () => {
            let model = new StringSetModel();
            model.property = "STRING";

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a number property", () => {
            let model = new StringSetModel();
            model.property = 123;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an boolean property", () => {
            let model = new StringSetModel();
            model.property = true;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an array property", () => {
            let model = new StringSetModel();
            model.property = [];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with an empty set property", () => {
            let model = new StringSetModel();
            model.property = new Set();

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with a string set property", () => {
            let model = new StringSetModel();
            model.property = new Set(["STRING", "STRING"]);

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with a boolean set property", () => {
            let model = new StringSetModel();
            model.property = new Set([true, false]);

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a mixed string / boolean set property", () => {
            let model = new StringSetModel();
            model.property = new Set(["STRING", true]);

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an map property", () => {
            let model = new StringSetModel();
            model.property = new Map();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an object property", () => {
            let model = new StringSetModel();
            model.property = {};

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}