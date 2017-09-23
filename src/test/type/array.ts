
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a string array property", () => {
        class StringArrayModel {
            @type("[string]") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new StringArrayModel();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a string property", () => {
            let model = new StringArrayModel();
            model.property = "STRING";

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a number property", () => {
            let model = new StringArrayModel();
            model.property = 123;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an boolean property", () => {
            let model = new StringArrayModel();
            model.property = true;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with a empty array property", () => {
            let model = new StringArrayModel();
            model.property = [];

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with a string array property", () => {
            let model = new StringArrayModel();
            model.property = ["STRING", "STRING"];

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with a boolean array property", () => {
            let model = new StringArrayModel();
            model.property = [true, false];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a mixed string / boolean array property", () => {
            let model = new StringArrayModel();
            model.property = ["STRING", true];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an set property", () => {
            let model = new StringArrayModel();
            model.property = new Set();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an map property", () => {
            let model = new StringArrayModel();
            model.property = new Map();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an object property", () => {
            let model = new StringArrayModel();
            model.property = {};

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}