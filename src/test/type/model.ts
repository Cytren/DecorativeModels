
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
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a string property", () => {
            let model = new ParentModel();
            model.property = "STRING";

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a number property", () => {
            let model = new ParentModel();
            model.property = 123;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an boolean property", () => {
            let model = new ParentModel();
            model.property = true;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an array property", () => {
            let model = new ParentModel();
            model.property = [];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an set property", () => {
            let model = new ParentModel();
            model.property = new Set();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an map property", () => {
            let model = new ParentModel();
            model.property = new Map();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an empty object property", () => {
            let model = new ParentModel();
            model.property = {};

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an invalid object property", () => {
            let model = new ParentModel();
            model.property = {
                wrongName: 123
            };

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with a conforming object property", () => {
            let model = new ParentModel();
            model.property = {
                property: 123
            };

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });
    });
}