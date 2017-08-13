
import {assert} from "chai";
import {validate, type, count} from "../../main/index";

export default function() {
    describe("Model with a count 2 - 5 property", () => {
        class CountModel {
            @type("any")
            @count(2, 5)
            value: any;
        }

        it("should NOT validate with an array with count of 1", () => {
            let model = new CountModel();
            model.value = ["S"];
            assert.equal(validate(model), false);
        });

        it("should validate with an array with count of 2", () => {
            let model = new CountModel();
            model.value = ["S", "T"];
            assert.equal(validate(model), true);
        });

        it("should validate with an array with count of 5", () => {
            let model = new CountModel();
            model.value = ["S", "T", "R", "I", "N"];
            assert.equal(validate(model), true);
        });

        it("should NOT validate with an array with count of 6", () => {
            let model = new CountModel();
            model.value = ["S", "T", "R", "I", "N", "G"];
            assert.equal(validate(model), false);
        });

        it("should validate with a set with count of 5", () => {
            let model = new CountModel();
            model.value = new Set(["S", "T", "R", "I", "N"]);
            assert.equal(validate(model), true);
        });

        it("should NOT validate with a set with count of 6", () => {
            let model = new CountModel();
            model.value = new Set(["S", "T", "R", "I", "N", "G"]);
            assert.equal(validate(model), false);
        });

        it("should validate with a map with count of 5", () => {
            let model = new CountModel();

            model.value = new Map([
                ["S", "S"],
                ["T", "T"],
                ["R", "R"],
                ["I", "I"],
                ["N", "N"]
            ]);

            assert.equal(validate(model), true);
        });

        it("should NOT validate with a map with count of 6", () => {
            let model = new CountModel();

            model.value = new Map([
                ["S", "S"],
                ["T", "T"],
                ["R", "R"],
                ["I", "I"],
                ["N", "N"],
                ["G", "G"]
            ]);

            assert.equal(validate(model), false);
        });
    });
}