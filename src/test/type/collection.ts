
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a complex collection structure", () => {
        class ComplexCollectionModel {
            @type("(string -> (<integer> -> [character]))") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new ComplexCollectionModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new ComplexCollectionModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an integer property", () => {
            let model = new ComplexCollectionModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an float property", () => {
            let model = new ComplexCollectionModel();
            model.property = 123.45;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new ComplexCollectionModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new ComplexCollectionModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT not validate with a set property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should validate with appropriate collection property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Map([
                ["STRING", new Map([
                    [new Set([ 123, 456 ]), ["a", "b"]]
                ])]
            ]);

            assert.equal(validate(model), true);
        });

        it("should NOT validate with non-appropriate collection property", () => {
            let model = new ComplexCollectionModel();
            model.property = new Map([
                ["STRING", new Map([
                    [new Set([ 123, 456 ]), ["a", "b", "str"]]
                ])]
            ]);

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new ComplexCollectionModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}