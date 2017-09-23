
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
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });

        it("should validate with an assigned property", () => {
            let model = new RequiredModelOne();
            model.property = "STRING";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });
    });

    describe("Model with a required property", () => {
        @model({ strictMode: false })
        class RequiredModelTwo {
            @type("any") @required property: any;
        }

        it("should NOT validate with a null property", () => {
            let model = new RequiredModelTwo();
            validate(model).then(error => assert.isNotNull(error)).catch(() => {});
        });

        it("should validate with an assigned property", () => {
            let model = new RequiredModelTwo();
            model.property = "STRING";
            validate(model).then(error => assert.isNull(error)).catch(() => {});
        });
    });
}