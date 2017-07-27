
import {assert} from "chai";
import {validate, type, nullable} from "../../main/index";

describe("Model with a nullable property", () => {
    class NullableModel {
        @type("any") @nullable property: any;
    }

    it("should validate with a null property", () => {
        let model = new NullableModel();
        assert.equal(validate(model), true);
    });

    it("should validate with an assigned property", () => {
        let model = new NullableModel();
        model.property = "STRING";
        assert.equal(validate(model), true);
    });
});