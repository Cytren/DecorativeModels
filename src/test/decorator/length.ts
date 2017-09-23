
import {assert} from "chai";
import {validate, type, length} from "../../main/index";

export default function() {
    describe("Model with a length 2 - 5 property", () => {
        class LengthModel {
            @type("string")
            @length(2, 5)
            value: string;
        }

        it("should NOT validate with a length of 1", () => {
            let model = new LengthModel();
            model.value = "S";
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with a length of 2", () => {
            let model = new LengthModel();
            model.value = "ST";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with a length of 5", () => {
            let model = new LengthModel();
            model.value = "STRIN";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should NOT validate with a length of 6", () => {
            let model = new LengthModel();
            model.value = "STRING";
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });
    });
}