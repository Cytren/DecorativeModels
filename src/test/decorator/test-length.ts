
import {assert} from "chai";
import {validate, type, length} from "../../main/index";

describe("[Length Decorator]", () => {
    describe("Model with a length 2 - 5 property", () => {
        class LengthModel {
            @type("string")
            @length(2, 5)
            value: string;
        }

        it("should NOT validate with a length of 1", () => {
            let model = new LengthModel();
            model.value = "S";
            assert.equal(validate(model), false);
        });

        it("should validate with a length of 2", () => {
            let model = new LengthModel();
            model.value = "ST";
            assert.equal(validate(model), true);
        });

        it("should validate with a length of 5", () => {
            let model = new LengthModel();
            model.value = "STRIN";
            assert.equal(validate(model), true);
        });

        it("should NOT validate with a length of 6", () => {
            let model = new LengthModel();
            model.value = "STRING";
            assert.equal(validate(model), false);
        });
    });
});