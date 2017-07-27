
import {assert} from "chai";
import {validate, type, nullable} from "../../main/index";

describe("[Nullable Decorator]", () => {
    describe("Model with a non-nullable property", () => {
        class NullableModelOne {
            @type("any") property: any;
        }

        it("should NOT validate with a null property", () => {
            let model = new NullableModelOne();
            assert.equal(validate(model), false);
        });

        it("should validate with an assigned property", () => {
            let model = new NullableModelOne();
            model.property = "STRING";
            assert.equal(validate(model), true);
        });
    });

    describe("Model with a nullable property", () => {
        class NullableModelTwo {
            @type("any") @nullable property: any;
        }

        it("should validate with a null property", () => {
            let model = new NullableModelTwo();
            assert.equal(validate(model), true);
        });

        it("should validate with an assigned property", () => {
            let model = new NullableModelTwo();
            model.property = "STRING";
            assert.equal(validate(model), true);
        });
    });
});