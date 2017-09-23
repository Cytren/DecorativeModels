
import {assert} from "chai";
import {validate, type, nullable} from "../../main/index";

export default function() {
    describe("Model with a non-nullable property", () => {
        class NullableModelOne {
            @type("any") property: any;
        }

        it("should NOT validate with a null property", () => {
            let model = new NullableModelOne();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with an assigned property", () => {
            let model = new NullableModelOne();
            model.property = "STRING";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });
    });

    describe("Model with a nullable property", () => {
        class NullableModelTwo {
            @type("any") @nullable property: any;
        }

        it("should validate with a null property", () => {
            let model = new NullableModelTwo();
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with an assigned property", () => {
            let model = new NullableModelTwo();
            model.property = "STRING";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });
    });
}