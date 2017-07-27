
import {assert, expect} from "chai";
import {validate, type} from "../main/index";

describe("Model", () => {
    class Model {
        @type("integer") id: number;
        @type("string") name: string;
    }

    it("should NOT validate an empty model instance", () => {
        let model = new Model();
        assert(!validate(model));
    });

    it("should validate a populated model instance", () => {
        let model = new Model();
        model.id = 123456789;
        model.name = "NAME";

        assert(validate(model));
    });

    it("should NOT validate an empty object instance", () => {
        let model = {};
        assert(!validate(model, "Model"));
    });

    it("should validate a populated object instance", () => {
        let model = {
            id: 123456789,
            name: "NAME"
        };

        assert(validate(model, "Model"));
    });

    it("should NOT validate a populated object instance without an explicit type", () => {
        let model = {
            id: 123456789,
            name: "NAME"
        };

        expect(() => {
            validate(model)
        }).to.throw("The model Object does not exist");
    });
});