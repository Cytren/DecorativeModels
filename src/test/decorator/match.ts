
import {assert} from "chai";
import {validate, type, match} from "../../main/index";

export default function() {
    describe("Model with a match [a-z]* regex property", () => {
        class MatchRegexModel {
            @type("string")
            @match(/[a-z]*/)
            value: string;
        }

        it("should validate with an empty string", () => {
            let model = new MatchRegexModel();
            model.value = "";
            assert.equal(validate(model), true);
        });

        it("should validate with string 'test'", () => {
            let model = new MatchRegexModel();
            model.value = "test";
            assert.equal(validate(model), true);
        });

        it("should NOT validate with string 'TEST'", () => {
            let model = new MatchRegexModel();
            model.value = "TEST";
            assert.equal(validate(model), false);
        });

        it("should NOT validate with string '123'", () => {
            let model = new MatchRegexModel();
            model.value = "123";
            assert.equal(validate(model), false);
        });
    });

    describe("Model with a match strings property", () => {
        class MatchStringsModel {
            @type("string")
            @match("test", "TEST", "123")
            value: string;
        }

        it("should NOT validate with an empty string", () => {
            let model = new MatchStringsModel();
            model.value = "";
            assert.equal(validate(model), false);
        });

        it("should validate with string 'test'", () => {
            let model = new MatchStringsModel();
            model.value = "test";
            assert.equal(validate(model), true);
        });

        it("should validate with string 'TEST'", () => {
            let model = new MatchStringsModel();
            model.value = "TEST";
            assert.equal(validate(model), true);
        });

        it("should validate with string '123'", () => {
            let model = new MatchStringsModel();
            model.value = "123";
            assert.equal(validate(model), true);
        });

        it("should NOT validate with string 'testing'", () => {
            let model = new MatchStringsModel();
            model.value = "testing";
            assert.equal(validate(model), false);
        });
    });
}