
import {assert} from "chai";
import {validate, type, range} from "../../main/index";

describe("[Range Decorator]", () => {
    describe("Model with a range 2 - 5 property", () => {
        class RangeModel {
            @type("float")
            @range(2, 5)
            value: number;
        }

        it("should NOT validate with a value of 1", () => {
            let model = new RangeModel();
            model.value = 1;
            assert.equal(validate(model), false);
        });

        it("should validate with a value of 2", () => {
            let model = new RangeModel();
            model.value = 2;
            assert.equal(validate(model), true);
        });

        it("should validate with a value of 5", () => {
            let model = new RangeModel();
            model.value = 5;
            assert.equal(validate(model), true);
        });

        it("should NOT validate with a value of 6", () => {
            let model = new RangeModel();
            model.value = 6;
            assert.equal(validate(model), false);
        });
    });
});