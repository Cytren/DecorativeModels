
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
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with an array with count of 2", () => {
            let model = new CountModel();
            model.value = ["S", "T"];
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with an array with count of 5", () => {
            let model = new CountModel();
            model.value = ["S", "T", "R", "I", "N"];
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with an array with count of 6", () => {
            let model = new CountModel();
            model.value = ["S", "T", "R", "I", "N", "G"];
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with a set with count of 5", () => {
            let model = new CountModel();
            model.value = new Set(["S", "T", "R", "I", "N"]);
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with a set with count of 6", () => {
            let model = new CountModel();
            model.value = new Set(["S", "T", "R", "I", "N", "G"]);
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
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

            validate(model).then(error => assert.isNull(error)).catch(() => {});
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

            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}