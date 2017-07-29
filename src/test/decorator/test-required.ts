
import {assert} from "chai";
import {model, validate, type, required} from "../../main/index";

export default function() {
    describe("Model with a non-required property", () => {
        @model({ strictMode: false })
        class RequiredModelOne {
            @type("any") property: any;
        }

        it("should validate with a null property", () => {
            let model = new RequiredModelOne();
            assert.equal(validate(model), true);
        });

        it("should validate with an assigned property", () => {
            let model = new RequiredModelOne();
            model.property = "STRING";
            assert.equal(validate(model), true);
        });
    });

    describe("Model with a required property", () => {
        @model({ strictMode: false })
        class RequiredModelTwo {
            @type("any") @required property: any;
        }

        it("should NOT validate with a null property", () => {
            let model = new RequiredModelTwo();
            assert.equal(validate(model), false);
        });

        it("should validate with an assigned property", () => {
            let model = new RequiredModelTwo();
            model.property = "STRING";
            assert.equal(validate(model), true);
        });
    });
}