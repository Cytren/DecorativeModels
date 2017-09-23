
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a complex collection structure", () => {
        class ComplexCollectionModel {
            @type("(string -> (<integer> -> [character]))") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new ComplexCollectionModel();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with a string property", () => {
            let model = new ComplexCollectionModel();
            model.property = "STRING";

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an integer property", () => {
            let model = new ComplexCollectionModel();
            model.property = 123;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an float property", () => {
            let model = new ComplexCollectionModel();
            model.property = 123.45;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an boolean property", () => {
            let model = new ComplexCollectionModel();
            model.property = true;

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an array property", () => {
            let model = new ComplexCollectionModel();
            model.property = [];

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT not validate with a set property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Set();

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with appropriate collection property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Map([
                ["STRING", new Map([
                    [new Set([ 123, 456 ]), ["a", "b"]]
                ])]
            ]);

            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with non-appropriate collection property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Map([
                ["STRING", new Map([
                    [new Set([ 123, 456 ]), ["a", "b", "str"]]
                ])]
            ]);

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should NOT validate with an object property", () => {
            let model = new ComplexCollectionModel();
            model.property = {};

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}