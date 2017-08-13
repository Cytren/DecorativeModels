
import {assert} from "chai";
import {validate, type} from "../../main/index";

export default function () {
    describe("Model with a character property", () => {
        class CharacterModel {
            @type("character") property: any;
        }

        it("should NOT validate with an undefined property", () => {
            let model = new CharacterModel();
            assert.equal(validate(model), false);
        });

        it("should NOT validate with a string property", () => {
            let model = new CharacterModel();
            model.property = "STRING";

            assert.equal(validate(model), false);
        });

        it("should validate with a character property", () => {
            let model = new CharacterModel();
            model.property = "S";

            assert.equal(validate(model), true);
        });

        it("should NOT validate with a number property", () => {
            let model = new CharacterModel();
            model.property = 123;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an boolean property", () => {
            let model = new CharacterModel();
            model.property = true;

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an array property", () => {
            let model = new CharacterModel();
            model.property = [];

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an set property", () => {
            let model = new CharacterModel();
            model.property = new Set();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an map property", () => {
            let model = new CharacterModel();
            model.property = new Map();

            assert.equal(validate(model), false);
        });

        it("should NOT validate with an object property", () => {
            let model = new CharacterModel();
            model.property = {};

            assert.equal(validate(model), false);
        });
    });
}