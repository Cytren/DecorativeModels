
import {assert} from "chai";
import {validate, type, range} from "../../main/index";

export default function() {
    describe("Model with a range 2 - 5 property", () => {
        class RangeModel {
            @type("float")
            @range(2, 5)
            value: number;
        }

        it("should NOT validate with a value of 1", () => {
            let model = new RangeModel();
            model.value = 1;
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with a value of 2", () => {
            let model = new RangeModel();
            model.value = 2;
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with a value of 5", () => {
            let model = new RangeModel();
            model.value = 5;
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with a value of 6", () => {
            let model = new RangeModel();
            model.value = 6;
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}